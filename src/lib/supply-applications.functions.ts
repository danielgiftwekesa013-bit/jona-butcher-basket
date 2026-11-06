import { createServerFn } from "@tanstack/react-start";

import { supplyApplicationSubmissionSchema } from "@/lib/supply-application-schema";

export const submitSupplyApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const parsed = supplyApplicationSubmissionSchema.safeParse(input);
    if (!parsed.success) throw new Error("Please check the application fields and try again.");
    return parsed.data;
  })
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    const url = process.env["SUPABASE_URL"];
    if (!key || !url) throw new Error("Online applications are temporarily unavailable.");

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { error } = await supabase.from("supply_applications").insert({
      business_name: data.businessName,
      contact_name: data.contactName,
      phone: data.phone,
      email: data.email || null,
      organization_type: data.organizationType,
      supply_type: data.supplyType,
      estimated_quantity: data.estimatedQuantity || null,
      supply_frequency: data.supplyFrequency,
      delivery_location: data.deliveryLocation,
      message: data.message || null,
      submission_key: data.submissionKey,
    });

    if (error) {
      if (error.code === "23505") {
        return { success: true as const, duplicate: true };
      }
      throw new Error("We couldn’t save your application. You can send it through WhatsApp instead.");
    }

    return { success: true as const, duplicate: false };
  });