# Jona Butchery & Choma Zone

## Build
- Replace the home-page placeholder with a responsive, premium red-and-white butchery and choma website, using realistic food photography and a distinct visual identity.
- Add the requested sections: brand introduction, about, five services, customer benefits, food gallery, three-step ordering, prominent bulk-supply form, contact, and footer.
- Make phone and WhatsApp actions work, add mobile navigation and a persistent mobile WhatsApp action, and provide accessible reduced-motion-friendly interactions.
- Validate supply applications and save them to Lovable Cloud with pending status and submission time; provide a WhatsApp fallback with an encoded, prefilled application if saving fails. Add clear validation, submitting, success, and error states.
- Keep the location configurable and blank, without inventing an address or map coordinates.

## Technical details
- Use the existing TanStack Start home route, design tokens in `src/styles.css`, and the generated Cloud client/server integrations.
- Create a narrowly scoped `supply_applications` table with row-level security, explicit grants, and no public read access; accept only public inserts and validate payloads in a server function before saving.
- Add small tests for concrete application-validation rules and run them, then verify the home page and submission fallback in the preview.
