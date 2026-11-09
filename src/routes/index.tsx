import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChefHat,
  Clock3,
  Flame,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  ShoppingBasket,
  Store,
  Truck,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  buildWhatsAppUrl,
  formatSupplyApplicationMessage,
  organizationTypes,
  supplyApplicationSchema,
  supplyFrequencies,
  supplyTypes,
  type SupplyApplicationInput,
} from "@/lib/supply-application-schema";
import { submitSupplyApplication } from "@/lib/supply-applications.functions";
import heroPhoto from "@/assets/jona-hero.jpg";
import cutsPhoto from "@/assets/jona-fresh-cuts.jpg";
import grillPhoto from "@/assets/jona-grill.jpg";
import platterPhoto from "@/assets/jona-platter.jpg";
import chickenPhoto from "@/assets/jona-chicken.jpg";

const phoneDisplay = "0705 518001";
const phoneDigits = "254705518001";
const initialApplication: SupplyApplicationInput = {
  businessName: "",
  contactName: "",
  phone: "",
  email: "",
  organizationType: "School",
  supplyType: "Beef",
  estimatedQuantity: "",
  supplyFrequency: "Weekly",
  deliveryLocation: "",
  message: "",
};

const navigationLinks = [
  { label: "Our story", href: "#about" },
  { label: "What we do", href: "#services" },
  { label: "The good stuff", href: "#gallery" },
  { label: "Bulk supply", href: "#supply" },
];

const services = [
  {
    number: "01",
    title: "Fresh off the counter",
    name: "Retail meat sales",
    description: "Quality beef, goat and chicken, ready for whatever is on your family’s menu.",
    icon: ShoppingBasket,
    cta: "Order fresh meat",
    href: `https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Jona Butchery & Choma Zone, I would like to order fresh meat.")}`,
  },
  {
    number: "02",
    title: "The regular supply",
    name: "Schools & institutions",
    description: "Dependable supply for schools, hospitals and institutions serving every day.",
    icon: Store,
    cta: "Apply for supply",
    href: "#supply",
  },
  {
    number: "03",
    title: "A table to remember",
    name: "Catering & events",
    description: "Get great meat sorted for weddings, parties, work events and family celebrations.",
    icon: UtensilsCrossed,
    cta: "Plan an event order",
    href: `https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Jona Butchery & Choma Zone, I would like to enquire about meat for an event.")}`,
  },
  {
    number: "04",
    title: "From our place to yours",
    name: "Home delivery",
    description: "Tell us what you need. We’ll help arrange convenient delivery to your door.",
    icon: Truck,
    cta: "Order on WhatsApp",
    href: `https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Jona Butchery & Choma Zone, I would like to order fresh meat for delivery.")}`,
  },
  {
    number: "05",
    title: "Handled with care",
    name: "Professional slaughter",
    description: "Professional slaughter arrangements for customers who need the service.",
    icon: ChefHat,
    cta: "Enquire with us",
    href: `https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Jona Butchery & Choma Zone, I would like to enquire about your professional slaughter services.")}`,
  },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Quality comes first",
    text: "We put quality and freshness at the heart of what we do.",
  },
  {
    icon: Clock3,
    title: "Supply you can count on",
    text: "Practical, dependable options for homes and regular bulk orders.",
  },
  {
    icon: Flame,
    title: "One place, more ways to serve",
    text: "Retail, delivery, catering supply and slaughter services—all together.",
  },
  {
    icon: MessageCircle,
    title: "A real person, one message away",
    text: "Get in touch directly for an order, a question or a supply request.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jona Butchery & Choma Zone | Fresh Meat, Wholesale Supply & Nyama Choma" },
      {
        name: "description",
        content:
          "Jona Butchery & Choma Zone is your home of fresh meat. We offer quality retail meat, bulk meat supply for schools and institutions, catering and event supply, home deliveries, and professional slaughter services. Call 0705 518001.",
      },
      {
        property: "og:title",
        content: "Jona Butchery & Choma Zone | Home of Fresh Meat",
      },
      {
        property: "og:description",
        content:
          "Fresh quality meat, reliable supply, catering and convenient delivery. Call Jona on 0705 518001.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JonaHomePage,
});

function JonaHomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main id="top" className="site-shell">
      <div className="topline">
        <span>Fresh, quality meat.</span>
        <span>Dependable supply. Genuine choma flavour.</span>
        <a href={`tel:+${phoneDigits}`}>Call us on {phoneDisplay}</a>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Jona Butchery & Choma Zone, home">
          <span className="brand-mark" aria-hidden="true">
            J<span>.</span>
          </span>
          <span className="brand-name">
            JONA <small>BUTCHERY & CHOMA ZONE</small>
          </span>
        </a>

        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {navigationLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <Button asChild size="sm" className="nav-cta">
            <a href={`tel:+${phoneDigits}`}>
              <Phone aria-hidden="true" /> Call Jona
            </a>
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu-trigger"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero-image"
          src={heroPhoto}
          alt="Nyama choma and fresh-sliced beef, beautifully grilled and ready to share"
          width={1920}
          height={1152}
          fetchPriority="high"
        />
        <div className="hero-scrim" />
        <div className="hero-content">
          <p className="eyebrow eyebrow-light">
            <span className="eyebrow-rule" /> HOME OF FRESH MEAT
          </p>
          <h1 id="hero-title">
            Freshness you can taste.
            <br />
            <span>Quality you can trust.</span>
          </h1>
          <p className="hero-copy">
            From the family table to a busy kitchen, find good meat and a dependable supply partner
            right here.
          </p>
          <div className="hero-actions">
            <Button asChild className="button-light" size="lg">
              <a
                href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Jona Butchery & Choma Zone, I would like to order fresh meat.")}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle aria-hidden="true" /> Order fresh meat
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="button-hero-outline">
              <a href="#supply">
                Request bulk supply <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
          <div className="hero-note">
            <span className="live-dot" aria-hidden="true" /> Retail <b>·</b> Wholesale <b>·</b>{" "}
            Catering <b>·</b> Home delivery
          </div>
        </div>
        <div className="hero-caption" aria-hidden="true">
          <span>GOOD MEAT.</span> GREAT MOMENTS.
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to our story">
          <ArrowDown aria-hidden="true" />
          <span>SCROLL TO DISCOVER</span>
        </a>
      </section>

      <section className="proof-strip" aria-label="Our service options">
        <p>MADE FOR EVERY TABLE</p>
        <span>THE FAMILY TABLE</span>
        <i aria-hidden="true" />
        <span>THE EVENT TABLE</span>
        <i aria-hidden="true" />
        <span>THE EVERYDAY SUPPLY</span>
      </section>

      <section className="about-section section-pad" id="about">
        <div className="about-media">
          <img src={cutsPhoto} alt="Fresh cuts of beef and chicken at the butcher counter" loading="lazy" width={960} height={1200} />
          <div className="media-index">
            <span>01</span>
            <span>OUR PROMISE</span>
          </div>
          <div className="round-stamp" aria-label="Fresh, quality meat">
            <span>FRESH • QUALITY • JONA •</span>
            <Flame aria-hidden="true" />
          </div>
        </div>
        <div className="about-copy">
          <p className="eyebrow"><span className="eyebrow-rule" /> A GOOD MEAL STARTS HERE</p>
          <h2>Quality meat.<br /><span>Unmatched service.</span></h2>
          <p className="body-large">
            Every great meal starts with good ingredients. We’re here to make quality meat and
            reliable supply easy to find—whether you’re planning dinner or feeding a crowd.
          </p>
          <p className="body-copy">
            Jona Butchery & Choma Zone serves individual households, institutions, businesses and
            event organisers. Tell us what you need and we’ll help you find the right way to order.
          </p>
          <a className="text-link" href="#services">Meet the ways we serve <ArrowRight aria-hidden="true" /></a>
          <div className="about-signoff">
            <span className="signoff-mark">J.</span>
            <div><strong>Jona Butchery & Choma Zone</strong><span>Home of Fresh Meat</span></div>
          </div>
        </div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> WHAT WE BRING TO THE TABLE</p>
            <h2>More than just<br /><span>a butchery.</span></h2>
          </div>
          <p className="heading-aside">A proper cut for dinner.<br />A steady supply for the whole kitchen.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon;
            const external = service.href.startsWith("https://");
            return (
              <article className="service-card" key={service.number}>
                <div className="service-card-head">
                  <span>{service.number} / 05</span><Icon aria-hidden="true" />
                </div>
                <p className="service-kicker">{service.title}</p>
                <h3>{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <a
                  className="service-link"
                  href={service.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                >
                  {service.cta} <ArrowUpRight aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="values-band section-pad" aria-labelledby="values-title">
        <div className="values-intro">
          <p className="eyebrow eyebrow-light"><span className="eyebrow-rule" /> THE JONA WAY</p>
          <h2 id="values-title">Why customers<br />choose Jona.</h2>
          <a className="values-link" href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noreferrer">
            Let’s talk meat <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="values-list">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <article className="value-item" key={reason.title}>
                <span className="value-number">0{index + 1}</span>
                <Icon aria-hidden="true" />
                <div><h3>{reason.title}</h3><p>{reason.text}</p></div>
                <Check aria-hidden="true" className="value-check" />
              </article>
            );
          })}
        </div>
      </section>

      <section className="gallery-section section-pad" id="gallery">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> A LITTLE SOMETHING TO LOOK FORWARD TO</p>
            <h2>Good meat.<br /><span>Great moments.</span></h2>
          </div>
          <p className="gallery-aside">From our butchery to your table.</p>
        </div>
        <div className="gallery-grid">
          <figure className="gallery-tile gallery-main">
            <img src={platterPhoto} alt="A nyama choma platter made for sharing" loading="lazy" width={1280} height={960} />
            <figcaption><span>01</span> THE SHARING PLATTER</figcaption>
          </figure>
          <figure className="gallery-tile gallery-tall">
            <img src={grillPhoto} alt="Goat and beef grilling over glowing charcoal" loading="lazy" width={1408} height={1008} />
            <figcaption><span>02</span> OVER THE COALS</figcaption>
          </figure>
          <figure className="gallery-tile gallery-small">
            <img src={chickenPhoto} alt="Chicken and beef choma fresh off the grill" loading="lazy" width={1280} height={960} />
            <figcaption><span>03</span> THE CHOMA MOMENT</figcaption>
          </figure>
          <div className="gallery-note">
            <span className="gallery-spark" aria-hidden="true">✳</span>
            <p>Good things happen<br />around a full table.</p>
            <span>JONA · HOME OF FRESH MEAT</span>
          </div>
        </div>
      </section>

      <section className="supply-section section-pad" id="supply">
        <div className="supply-intro">
          <p className="eyebrow eyebrow-light"><span className="eyebrow-rule" /> REGULAR SUPPLY, MADE SIMPLE</p>
          <h2>Need a reliable<br /><span>meat supplier?</span></h2>
          <p>
            Looking after a school, hotel, restaurant, catering company, institution or business?
            Tell us what your kitchen needs and our team will get in touch.
          </p>
          <div className="supply-reassurance">
            <CheckCircle2 aria-hidden="true" />
            <span>Share your requirements.<br />We’ll speak with you about next steps.</span>
          </div>
          <a href={`tel:+${phoneDigits}`} className="supply-call"><Phone aria-hidden="true" /> Prefer to talk? {phoneDisplay}</a>
        </div>
        <SupplyApplicationForm />
      </section>

      <section className="order-section section-pad" id="how-to-order">
        <div className="order-heading">
          <p className="eyebrow"><span className="eyebrow-rule" /> EASY AS ONE, TWO, THREE</p>
          <h2>Good meat.<br /><span>No runaround.</span></h2>
        </div>
        <ol className="order-steps">
          <li><span className="order-step-number">01</span><div><h3>Choose your meat</h3><p>Tell us what you’re planning and what you need.</p></div></li>
          <li><span className="order-step-number">02</span><div><h3>Call or WhatsApp</h3><p>We’re one message away at {phoneDisplay}.</p></div></li>
          <li><span className="order-step-number">03</span><div><h3>Get served</h3><p>Arrange collection, delivery or regular supply.</p></div></li>
        </ol>
        <Button asChild className="order-button" size="lg">
          <a href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Jona Butchery & Choma Zone, I would like to place an order.")}`} target="_blank" rel="noreferrer">
            Order now <ArrowRight aria-hidden="true" />
          </a>
        </Button>
      </section>

      <section className="contact-section" id="contact">
        <img src={heroPhoto} alt="" className="contact-image" loading="lazy" width={1920} height={1152} />
        <div className="contact-shade" />
        <div className="contact-copy">
          <p className="eyebrow eyebrow-light"><span className="eyebrow-rule" /> WE’RE JUST A MESSAGE AWAY</p>
          <h2>Let’s talk<br /><span>meat!</span></h2>
          <p>A fresh order, a catering question or a regular supply request—we’d love to hear from you.</p>
          <div className="contact-actions">
            <Button asChild className="button-light" size="lg"><a href={`tel:+${phoneDigits}`}><Phone aria-hidden="true" /> {phoneDisplay}</a></Button>
            <Button asChild variant="outline" className="button-hero-outline" size="lg">
              <a href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Jona Butchery & Choma Zone, I would like to make an enquiry.")}`} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> WhatsApp us</a>
            </Button>
          </div>
        </div>
        <div className="contact-side-note"><MapPin aria-hidden="true" /><span>Ask us about delivery<br />to your area.</span></div>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark" aria-hidden="true">J<span>.</span></span>
            <span className="brand-name">JONA <small>BUTCHERY & CHOMA ZONE</small></span>
          </a>
          <div className="footer-slogan"><span>HOME OF</span><strong>FRESH MEAT.</strong></div>
          <div className="footer-links">
            <p>ON THE MENU</p>
            <a href="#about">Our story</a>
            <a href="#services">What we do</a>
            <a href="#gallery">Food & choma</a>
            <a href="#supply">Bulk supply</a>
          </div>
          <div className="footer-contact">
            <p>SAY HELLO</p>
            <a href={`tel:+${phoneDigits}`}>{phoneDisplay}</a>
            <a href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noreferrer">WhatsApp Jona <ArrowUpRight aria-hidden="true" /></a>
            <span>Jona Butchery & Choma Zone<br />Kenya</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Jona Butchery & Choma Zone.</span>
          <a href="#top">GOOD MEAT. GREAT MOMENTS. <ArrowUpRight aria-hidden="true" /></a>
          <span>FRESH MEAT, ALWAYS.</span>
        </div>
      </footer>

      <a
        className="mobile-whatsapp"
        href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Jona Butchery & Choma Zone, I would like to make an enquiry.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Jona on WhatsApp"
      >
        <MessageCircle aria-hidden="true" /><span>Chat with Jona</span><ArrowUpRight aria-hidden="true" />
      </a>
    </main>
  );
}

function SupplyApplicationForm() {
  const submitApplication = useServerFn(submitSupplyApplication);
  const [values, setValues] = useState<SupplyApplicationInput>(initialApplication);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  function changeField(field: keyof SupplyApplicationInput, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
    if (formError) setFormError("");
    setWhatsAppUrl("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || submitted) return;

    const validation = supplyApplicationSchema.safeParse(values);
    if (!validation.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      document.getElementById(Object.keys(nextErrors)[0] ?? "supply-business-name")?.focus();
      setFormError("A couple of details need your attention before we can send this.");
      return;
    }

    setErrors({});
    setFormError("");
    setSubmitting(true);
    const whatsAppMessage = formatSupplyApplicationMessage(validation.data);
    setWhatsAppUrl(buildWhatsAppUrl(whatsAppMessage));
    try {
      await submitApplication({ data: { ...validation.data, submissionKey: crypto.randomUUID() } });
      setSubmitted(true);
    } catch {
      setFormError("We couldn’t send your application just now. Your details are ready to send securely on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="supply-form supply-success" role="status" aria-live="polite">
        <div className="success-symbol"><CheckCircle2 aria-hidden="true" /></div>
        <p className="form-eyebrow">APPLICATION RECEIVED</p>
        <h3>Thanks for getting in touch.</h3>
        <p>Your supply application is with the Jona team. We’ll follow up to discuss your requirements.</p>
        <Button type="button" variant="outline" onClick={() => { setSubmitted(false); setValues(initialApplication); }}>
          Send another application
        </Button>
      </div>
    );
  }

  return (
    <form className="supply-form" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <div><p className="form-eyebrow">SUPPLY ENQUIRY</p><h3>Tell us about your kitchen.</h3></div>
        <span className="required-note"><i aria-hidden="true" /> Required fields</span>
      </div>

      {formError && <p className="form-error-banner" role="alert">{formError}</p>}

      <div className="form-grid">
        <SupplyField id="supply-business-name" label="Business / institution name" error={errors["businessName"]} required>
          <Input id="supply-business-name" name="businessName" autoComplete="organization" maxLength={160} value={values.businessName} onChange={(event) => changeField("businessName", event.target.value)} aria-invalid={Boolean(errors["businessName"])} aria-describedby={errors["businessName"] ? "error-businessName" : undefined} />
        </SupplyField>
        <SupplyField id="supply-contact-name" label="Contact person’s full name" error={errors["contactName"]} required>
          <Input id="supply-contact-name" name="contactName" autoComplete="name" maxLength={120} value={values.contactName} onChange={(event) => changeField("contactName", event.target.value)} aria-invalid={Boolean(errors["contactName"])} aria-describedby={errors["contactName"] ? "error-contactName" : undefined} />
        </SupplyField>
        <SupplyField id="supply-phone" label="Phone number" error={errors["phone"]} required>
          <Input id="supply-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="e.g. 0705 518001" value={values.phone} onChange={(event) => changeField("phone", event.target.value)} aria-invalid={Boolean(errors["phone"])} aria-describedby={errors["phone"] ? "error-phone" : undefined} />
        </SupplyField>
        <SupplyField id="supply-email" label="Email address" error={errors["email"]} optional>
          <Input id="supply-email" name="email" type="email" autoComplete="email" maxLength={255} placeholder="Optional" value={values.email} onChange={(event) => changeField("email", event.target.value)} aria-invalid={Boolean(errors["email"])} aria-describedby={errors["email"] ? "error-email" : undefined} />
        </SupplyField>
        <SupplyField id="supply-organization" label="Type of organisation" error={errors["organizationType"]} required>
          <select id="supply-organization" name="organizationType" value={values.organizationType} onChange={(event) => changeField("organizationType", event.target.value)} aria-invalid={Boolean(errors["organizationType"])} aria-describedby={errors["organizationType"] ? "error-organizationType" : undefined}>
            {organizationTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </SupplyField>
        <SupplyField id="supply-type" label="Supply required" error={errors["supplyType"]} required>
          <select id="supply-type" name="supplyType" value={values.supplyType} onChange={(event) => changeField("supplyType", event.target.value)} aria-invalid={Boolean(errors["supplyType"])} aria-describedby={errors["supplyType"] ? "error-supplyType" : undefined}>
            {supplyTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </SupplyField>
        <SupplyField id="supply-quantity" label="Estimated quantity" error={errors["estimatedQuantity"]} optional>
          <Input id="supply-quantity" name="estimatedQuantity" maxLength={120} placeholder="e.g. 40 kg" value={values.estimatedQuantity} onChange={(event) => changeField("estimatedQuantity", event.target.value)} aria-invalid={Boolean(errors["estimatedQuantity"])} aria-describedby={errors["estimatedQuantity"] ? "error-estimatedQuantity" : undefined} />
        </SupplyField>
        <SupplyField id="supply-frequency" label="Supply frequency" error={errors["supplyFrequency"]} required>
          <select id="supply-frequency" name="supplyFrequency" value={values.supplyFrequency} onChange={(event) => changeField("supplyFrequency", event.target.value)} aria-invalid={Boolean(errors["supplyFrequency"])} aria-describedby={errors["supplyFrequency"] ? "error-supplyFrequency" : undefined}>
            {supplyFrequencies.map((frequency) => <option key={frequency} value={frequency}>{frequency}</option>)}
          </select>
        </SupplyField>
        <SupplyField id="supply-location" label="Delivery location" error={errors["deliveryLocation"]} required fullWidth>
          <Input id="supply-location" name="deliveryLocation" autoComplete="address-level2" maxLength={240} value={values.deliveryLocation} onChange={(event) => changeField("deliveryLocation", event.target.value)} aria-invalid={Boolean(errors["deliveryLocation"])} aria-describedby={errors["deliveryLocation"] ? "error-deliveryLocation" : undefined} />
        </SupplyField>
        <SupplyField id="supply-message" label="Additional requirements" error={errors["message"]} optional fullWidth>
          <Textarea id="supply-message" name="message" maxLength={1200} rows={3} placeholder="Anything else we should know?" value={values.message} onChange={(event) => changeField("message", event.target.value)} aria-invalid={Boolean(errors["message"])} aria-describedby={errors["message"] ? "error-message" : undefined} />
        </SupplyField>
      </div>

      <div className="form-submit-row">
        <Button type="submit" size="lg" className="submit-button" disabled={submitting}>
          {submitting ? <><span className="loading-indicator" aria-hidden="true" /> Sending your application…</> : <>Submit supply application <ArrowRight aria-hidden="true" /></>}
        </Button>
        <span className="form-privacy">Your details are only shared with the Jona team.</span>
      </div>

      {whatsAppUrl && !submitted && !submitting && (
        <a className="whatsapp-fallback" href={whatsAppUrl} target="_blank" rel="noreferrer">
          <MessageCircle aria-hidden="true" /> Send the prepared application on WhatsApp <ArrowUpRight aria-hidden="true" />
        </a>
      )}
    </form>
  );
}

function SupplyField({
  id,
  label,
  error,
  children,
  required = false,
  optional = false,
  fullWidth = false,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div className={`supply-field${fullWidth ? " field-full" : ""}`}>
      <label htmlFor={id}>{label}{required && <span className="field-required" aria-hidden="true">*</span>}{optional && <span className="field-optional">Optional</span>}</label>
      {children}
      {error && <span className="field-error" id={`error-${id.replace("supply-", "")}`} role="alert">{error}</span>}
    </div>
  );
}