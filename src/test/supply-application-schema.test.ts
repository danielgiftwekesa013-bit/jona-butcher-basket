import { describe, expect, it } from "vitest";

import {
  buildWhatsAppUrl,
  formatSupplyApplicationMessage,
  supplyApplicationSchema,
  supplyApplicationSubmissionSchema,
} from "@/lib/supply-application-schema";

const validApplication = {
  businessName: "Choma House",
  contactName: "Amina Njeri",
  phone: "+254 705 518001",
  email: "",
  organizationType: "Restaurant",
  supplyType: "Beef",
  estimatedQuantity: "20 kg weekly",
  supplyFrequency: "Weekly",
  deliveryLocation: "Nairobi",
  message: "Please call before delivery.",
} as const;

describe("supply application validation", () => {
  it("accepts valid required supply information without an optional email", () => {
    expect(supplyApplicationSchema.safeParse(validApplication).success).toBe(true);
  });

  it("rejects a phone number that is shorter than seven characters", () => {
    expect(supplyApplicationSchema.safeParse({ ...validApplication, phone: "123456" }).success).toBe(false);
  });

  it("rejects an email address that is not valid", () => {
    expect(supplyApplicationSchema.safeParse({ ...validApplication, email: "not-an-email" }).success).toBe(
      false,
    );
  });

  it("requires a valid unique-submission key for database submissions", () => {
    expect(
      supplyApplicationSubmissionSchema.safeParse({
        ...validApplication,
        submissionKey: "00000000-0000-4000-8000-000000000001",
      }).success,
    ).toBe(true);
    expect(supplyApplicationSubmissionSchema.safeParse({ ...validApplication, submissionKey: "not-a-uuid" }).success).toBe(
      false,
    );
  });

  it("encodes the complete application for Jona’s WhatsApp number", () => {
    const url = buildWhatsAppUrl(formatSupplyApplicationMessage(validApplication));

    expect(url.startsWith("https://wa.me/254705518001?text=")).toBe(true);
    expect(decodeURIComponent(url)).toContain("Business / institution: Choma House");
    expect(decodeURIComponent(url)).toContain("Supply frequency: Weekly");
  });
});