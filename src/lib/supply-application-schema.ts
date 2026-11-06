import { z } from "zod";

export const organizationTypes = [
  "School",
  "Hotel",
  "Restaurant",
  "Catering Company",
  "Hospital",
  "Retail Business",
  "Event Organizer",
  "Other",
] as const;

export const supplyTypes = ["Beef", "Goat Meat", "Chicken", "Mixed Meat", "Other"] as const;

export const supplyFrequencies = ["Daily", "Weekly", "Monthly", "One-time Order"] as const;

export const supplyApplicationSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Enter the business or institution name.")
    .max(160, "Keep the business name under 160 characters."),
  contactName: z
    .string()
    .trim()
    .min(2, "Enter the contact person's full name.")
    .max(120, "Keep the contact name under 120 characters."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(30, "Keep the phone number under 30 characters.")
    .regex(/^\+?[0-9()\s-]{7,30}$/, "Enter a valid phone number."),
  email: z.union([z.string().trim().max(255).email("Enter a valid email address."), z.literal("")]),
  organizationType: z.enum(organizationTypes, { errorMap: () => ({ message: "Choose an organization type." }) }),
  supplyType: z.enum(supplyTypes, { errorMap: () => ({ message: "Choose the meat you need." }) }),
  estimatedQuantity: z.string().trim().max(120, "Keep the quantity under 120 characters."),
  supplyFrequency: z.enum(supplyFrequencies, {
    errorMap: () => ({ message: "Choose how often you need supplies." }),
  }),
  deliveryLocation: z
    .string()
    .trim()
    .min(2, "Enter the delivery location.")
    .max(240, "Keep the delivery location under 240 characters."),
  message: z.string().trim().max(1200, "Keep your message under 1,200 characters."),
});

export type SupplyApplicationInput = z.infer<typeof supplyApplicationSchema>;

export function formatSupplyApplicationMessage(application: SupplyApplicationInput) {
  return [
    "Hello Jona Butchery & Choma Zone, I would like to apply for a regular meat supply.",
    "",
    `Business / institution: ${application.businessName}`,
    `Contact person: ${application.contactName}`,
    `Phone: ${application.phone}`,
    application.email ? `Email: ${application.email}` : "",
    `Organization type: ${application.organizationType}`,
    `Supply required: ${application.supplyType}`,
    application.estimatedQuantity ? `Estimated quantity: ${application.estimatedQuantity}` : "",
    `Supply frequency: ${application.supplyFrequency}`,
    `Delivery location: ${application.deliveryLocation}`,
    application.message ? `Additional requirements: ${application.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/254705518001?text=${encodeURIComponent(message)}`;
}