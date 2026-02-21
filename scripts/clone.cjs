#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

// ---------------------------------------------------------------------------
// Arg parser (no dependencies)
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        args[key] = true; // flag
      } else {
        args[key] = next;
        i++;
      }
    }
  }
  return args;
}

// ---------------------------------------------------------------------------
// Trade presets (duplicated from src/trade-presets.ts as plain JS)
// ---------------------------------------------------------------------------
const PRESETS = {
  handyman: {
    heroHeadline: "Reliable Handyman & Home Repair Services in {city}, {state}",
    heroSubheadline:
      "From drywall patches and fixture swaps to full punch-list work — fast, dependable repairs for homeowners who need it done right.",
    heroCta: "Get Your Free Quote",
    tagline: "Quality repairs and home improvements you can count on.",
    primaryColor: "#1e2a38",
    secondaryColor: "#e8a308",
    services: [
      {
        name: "General Repairs",
        description:
          "Drywall patches, door adjustments, caulking, and all the small fixes that keep your home in shape.",
        icon: "Wrench",
      },
      {
        name: "Furniture & Fixture Assembly",
        description:
          "Shelving, ceiling fans, TV mounts, and flat-pack assembly — installed level and secure.",
        icon: "Hammer",
      },
      {
        name: "Painting & Drywall",
        description:
          "Interior touch-ups, accent walls, and drywall repair with clean edges and no mess.",
        icon: "Paintbrush",
      },
      {
        name: "Plumbing Fixes",
        description:
          "Leaky faucets, running toilets, and fixture replacements handled same-day.",
        icon: "Droplets",
      },
      {
        name: "Electrical Help",
        description:
          "Outlet swaps, light fixture installs, and ceiling fan wiring done safely.",
        icon: "Lightbulb",
      },
      {
        name: "Flooring Installation",
        description:
          "Vinyl plank, laminate, and tile installs with clean transitions and tight seams.",
        icon: "Ruler",
      },
    ],
    stats: [
      { value: "500+", label: "Projects Completed" },
      { value: "5.0", label: "Google Rating" },
      { value: "50+", label: "5-Star Reviews" },
      { value: "Same Day", label: "Response Time" },
    ],
    testimonials: [
      {
        name: "Sarah T.",
        location: "{city}, {state}",
        rating: 5,
        text: "Called about a leaking faucet and they had it fixed the next morning. Clear communication and no mess left behind. Exactly the kind of handyman you want.",
        project: "General Repairs",
      },
      {
        name: "Mike R.",
        location: "{city}, {state}",
        rating: 5,
        text: "Handled our full rental punch list in one visit — outlets, trim, drywall patches, even a wobbly ceiling fan. Fast and fair pricing.",
        project: "Punch-List Work",
      },
      {
        name: "Jennifer L.",
        location: "{city}, {state}",
        rating: 5,
        text: "We needed flooring installed before move-in day and they delivered ahead of schedule. Professional work from start to finish.",
        project: "Flooring Installation",
      },
    ],
    howItWorks: [
      {
        title: "Call or Text",
        desc: "Tell us what you need and where you're located.",
      },
      {
        title: "Quick Plan",
        desc: "We confirm scope, timeline, and a clear estimate — no surprises.",
      },
      {
        title: "Get It Done",
        desc: "We show up on time, do clean work, and leave your home better than we found it.",
      },
    ],
    faq: [
      {
        question: "What areas do you serve?",
        answer:
          "We serve {city} and surrounding communities. Call or text to check if we cover your area.",
      },
      {
        question: "Do you provide free estimates?",
        answer:
          "Yes. Tell us about your project and we'll give you a clear, honest estimate before any work begins.",
      },
      {
        question: "How fast can you start?",
        answer:
          "Most projects are scheduled within a few days. For urgent repairs, we often offer same-day or next-day availability.",
      },
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes. We carry full insurance for your protection and peace of mind.",
      },
      {
        question: "What types of projects do you handle?",
        answer:
          "Everything from hanging a shelf to full punch-list work. If a project falls outside our scope, we'll tell you upfront and refer someone who can help.",
      },
    ],
    schema: {
      type: "HomeAndConstructionBusiness",
      priceRange: "$$",
    },
  },

  kitchen_remodeler: {
    heroHeadline: "Kitchen Remodeling & Custom Cabinetry in {city}, {state}",
    heroSubheadline:
      "Full-service kitchen remodels — from countertops and cabinetry to flooring and lighting. Designed around how you actually use your kitchen.",
    heroCta: "Book a Free Consultation",
    tagline: "Your dream kitchen, built to last.",
    primaryColor: "#2c3e50",
    secondaryColor: "#c0872e",
    services: [
      {
        name: "Full Kitchen Remodels",
        description:
          "Complete tear-out and rebuild — layout changes, new cabinets, countertops, flooring, and lighting in one project.",
        icon: "ChefHat",
      },
      {
        name: "Cabinet Refacing & Installation",
        description:
          "New doors, drawer fronts, and hardware that transform your kitchen without the cost of a full remodel.",
        icon: "DoorOpen",
      },
      {
        name: "Countertop Installation",
        description:
          "Granite, quartz, marble, and butcher block — precision-templated and installed with clean seams.",
        icon: "Ruler",
      },
      {
        name: "Backsplash & Tile Work",
        description:
          "Subway, mosaic, and natural stone backsplashes that tie the room together with clean grout lines.",
        icon: "LayoutGrid",
      },
      {
        name: "Kitchen Flooring",
        description:
          "Hardwood, tile, and luxury vinyl plank chosen for durability in high-traffic kitchen spaces.",
        icon: "Layers",
      },
      {
        name: "Lighting & Electrical Upgrades",
        description:
          "Under-cabinet LEDs, pendant fixtures, and outlet additions to modernize your kitchen's function and feel.",
        icon: "Lightbulb",
      },
    ],
    stats: [
      { value: "200+", label: "Kitchens Completed" },
      { value: "5.0", label: "Google Rating" },
      { value: "40+", label: "5-Star Reviews" },
      { value: "15+", label: "Years Experience" },
    ],
    testimonials: [
      {
        name: "Karen M.",
        location: "{city}, {state}",
        rating: 5,
        text: "They transformed our 1990s kitchen into something out of a magazine. The cabinet work was flawless and they finished on the date they promised. Worth every penny.",
        project: "Full Kitchen Remodel",
      },
      {
        name: "David P.",
        location: "{city}, {state}",
        rating: 5,
        text: "The design consultation alone was incredibly helpful — they showed us options we never considered. Our countertops and backsplash look like they belong in a showroom.",
        project: "Countertops & Backsplash",
      },
      {
        name: "Lisa & Tom W.",
        location: "{city}, {state}",
        rating: 5,
        text: "We only planned to reface our cabinets but they guided us through a full layout change that made our small kitchen feel twice as big. Couldn't be happier.",
        project: "Cabinet Refacing",
      },
    ],
    howItWorks: [
      {
        title: "Free Design Consultation",
        desc: "We visit your home, take measurements, and discuss your vision, budget, and timeline.",
      },
      {
        title: "Custom Design & Proposal",
        desc: "You receive a detailed plan with material selections, 3D renderings, and transparent pricing.",
      },
      {
        title: "Expert Build & Reveal",
        desc: "Our crew handles demolition through final walkthrough — on schedule and job-site clean daily.",
      },
    ],
    faq: [
      {
        question: "How long does a full kitchen remodel take?",
        answer:
          "Most kitchen remodels take 4–8 weeks depending on scope. Cabinet refacing and countertop-only projects can be done in 1–2 weeks. We lock in a timeline before work begins.",
      },
      {
        question: "Can I use my kitchen during the remodel?",
        answer:
          "We set up a temporary kitchen station so you can still prep meals. We also keep work areas sealed off to minimize dust and disruption.",
      },
      {
        question: "Do you provide free estimates?",
        answer:
          "Yes. We offer a free in-home design consultation where we measure, discuss your goals, and provide a detailed written proposal — no pressure, no obligation.",
      },
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes. We are fully licensed, bonded, and insured. We pull all required permits and schedule inspections so your remodel is up to code.",
      },
      {
        question: "What does a kitchen remodel cost?",
        answer:
          "Costs depend on scope — a cabinet reface might start at a few thousand, while a full gut remodel runs higher. We give you a clear, itemized quote so there are no surprises.",
      },
    ],
    schema: {
      type: "HomeAndConstructionBusiness",
      priceRange: "$$$",
    },
  },

  plumber: {
    heroHeadline: "24/7 Plumbing Services in {city}, {state}",
    heroSubheadline:
      "Burst pipes, clogged drains, water heater failures, and slab leaks — fast emergency response and lasting repairs from licensed plumbers.",
    heroCta: "Call Now — 24/7 Emergency Service",
    tagline: "Licensed plumbers. Fast response. Guaranteed work.",
    primaryColor: "#0d2137",
    secondaryColor: "#2589d0",
    services: [
      {
        name: "Emergency Plumbing",
        description:
          "Burst pipes, major leaks, and sewage backups handled 24/7 with fast dispatch and upfront pricing.",
        icon: "Siren",
      },
      {
        name: "Drain Cleaning",
        description:
          "Hydro-jetting and mechanical clearing for clogged sinks, tubs, showers, and main sewer lines.",
        icon: "Waves",
      },
      {
        name: "Water Heater Repair & Install",
        description:
          "Tank and tankless water heater diagnostics, repair, and full replacement — same-day when possible.",
        icon: "Flame",
      },
      {
        name: "Leak Detection & Repair",
        description:
          "Non-invasive slab leak detection and pinpoint repairs that protect your foundation and wallet.",
        icon: "Search",
      },
      {
        name: "Fixture Installation",
        description:
          "Faucets, toilets, garbage disposals, and shower valves installed to code with clean finishes.",
        icon: "Droplets",
      },
      {
        name: "Repiping & Gas Lines",
        description:
          "Whole-home repiping and gas line installs with proper permits and inspections for code compliance.",
        icon: "PipetteIcon",
      },
    ],
    stats: [
      { value: "2,000+", label: "Jobs Completed" },
      { value: "5.0", label: "Google Rating" },
      { value: "100+", label: "5-Star Reviews" },
      { value: "24/7", label: "Emergency Service" },
    ],
    testimonials: [
      {
        name: "James K.",
        location: "{city}, {state}",
        rating: 5,
        text: "Pipe burst under our kitchen at 11 PM. They answered the phone, showed up in under an hour, and had it fixed before midnight. Saved us from serious water damage.",
        project: "Emergency Plumbing",
      },
      {
        name: "Angela S.",
        location: "{city}, {state}",
        rating: 5,
        text: "Our water heater died on a Friday evening. They came out Saturday morning, diagnosed the issue, and had a new unit installed by lunch. Fair price, zero pressure.",
        project: "Water Heater Replacement",
      },
      {
        name: "Robert & Maria C.",
        location: "{city}, {state}",
        rating: 5,
        text: "Slow drains in every bathroom turned out to be a root intrusion in the main line. They cleared it with hydro-jetting and showed us the camera footage. Thorough and honest.",
        project: "Drain Cleaning",
      },
    ],
    howItWorks: [
      {
        title: "Call Anytime — 24/7",
        desc: "Describe the issue and get an honest assessment over the phone. Emergency dispatch available around the clock.",
      },
      {
        title: "Upfront Diagnosis & Price",
        desc: "We inspect the problem on-site, explain your options, and quote a flat rate before any work starts.",
      },
      {
        title: "Fix It Right the First Time",
        desc: "Licensed plumbers complete the repair, test everything, and clean up. All work is guaranteed.",
      },
    ],
    faq: [
      {
        question: "Do you offer 24/7 emergency service?",
        answer:
          "Yes. We answer the phone around the clock — nights, weekends, and holidays. For burst pipes, sewage backups, and no-water emergencies, we dispatch immediately.",
      },
      {
        question: "How much does a plumber cost?",
        answer:
          "We provide upfront, flat-rate pricing before work begins. No hourly surprises. Service call fees are waived when you approve the repair.",
      },
      {
        question: "Are your plumbers licensed and insured?",
        answer:
          "Yes. Every technician is a licensed, background-checked, and insured plumber. We pull all required permits for code compliance.",
      },
      {
        question: "How fast can you get here?",
        answer:
          "For emergencies, we typically arrive within 60 minutes. Scheduled appointments are available same-day or next-day for most services.",
      },
      {
        question: "Do you guarantee your work?",
        answer:
          "Yes. All repairs come with a written warranty. If anything we fixed fails within the warranty period, we come back and make it right at no cost.",
      },
    ],
    schema: {
      type: "Plumber",
      priceRange: "$$",
    },
  },

  electrician: {
    heroHeadline:
      "Licensed Electrician in {city}, {state} — Same-Day Service",
    heroSubheadline:
      "Panel upgrades, outlet installs, lighting design, and emergency repairs — safe, code-compliant electrical work from licensed pros.",
    heroCta: "Get Your Free Estimate",
    tagline: "Safe wiring. Licensed electricians. Done right to code.",
    primaryColor: "#1a1a2e",
    secondaryColor: "#e2b714",
    services: [
      {
        name: "Electrical Panel Upgrades",
        description:
          "100-to-200 amp panel upgrades, breaker replacements, and sub-panel installs to support modern power demands.",
        icon: "Zap",
      },
      {
        name: "Outlet & Switch Installation",
        description:
          "GFCI outlets, USB outlets, dimmer switches, and dedicated circuits for appliances — installed to code.",
        icon: "PlugZap",
      },
      {
        name: "Lighting Installation",
        description:
          "Recessed lighting, chandeliers, under-cabinet LEDs, and landscape lighting with clean wiring and proper switching.",
        icon: "Lightbulb",
      },
      {
        name: "Ceiling Fan Wiring",
        description:
          "New ceiling fan installs, rewiring existing fixtures, and adding wall switches for fan/light control.",
        icon: "Fan",
      },
      {
        name: "Emergency Electrical Repair",
        description:
          "Tripped breakers, sparking outlets, power outages, and burning smells — fast diagnosis and safe repair.",
        icon: "Siren",
      },
      {
        name: "EV Charger Installation",
        description:
          "Level 2 home EV charger installs with dedicated 240V circuits, permits, and utility coordination.",
        icon: "BatteryCharging",
      },
    ],
    stats: [
      { value: "1,000+", label: "Jobs Completed" },
      { value: "5.0", label: "Google Rating" },
      { value: "75+", label: "5-Star Reviews" },
      { value: "Same Day", label: "Service Available" },
    ],
    testimonials: [
      {
        name: "Chris D.",
        location: "{city}, {state}",
        rating: 5,
        text: "Needed a full panel upgrade for our older home — 100 to 200 amps. They pulled the permit, scheduled the inspection, and passed on the first try. Extremely professional.",
        project: "Panel Upgrade",
      },
      {
        name: "Amanda G.",
        location: "{city}, {state}",
        rating: 5,
        text: "Had recessed lights installed in our living room and kitchen. They were clean, fast, and the lighting layout they suggested looks amazing. Highly recommend.",
        project: "Lighting Installation",
      },
      {
        name: "Paul & Nina H.",
        location: "{city}, {state}",
        rating: 5,
        text: "Outlet started sparking on a Sunday night. They came out first thing Monday, found a wiring issue behind the wall, and fixed it before it became dangerous. Grateful for the quick response.",
        project: "Emergency Repair",
      },
    ],
    howItWorks: [
      {
        title: "Call for a Free Estimate",
        desc: "Describe the job and we'll give you a clear price range on the phone — or schedule a free on-site estimate.",
      },
      {
        title: "Permits & Scheduling",
        desc: "We handle all permits and inspections. You get a confirmed date and a scope-of-work document before we start.",
      },
      {
        title: "Safe, Inspected Work",
        desc: "Licensed electricians complete the job to code, test every circuit, and clean up. Inspections passed, warranty included.",
      },
    ],
    faq: [
      {
        question: "Are your electricians licensed?",
        answer:
          "Yes. Every electrician on our team holds a valid state license and carries full liability insurance. We pull all required permits and schedule inspections.",
      },
      {
        question: "Do you offer same-day or emergency service?",
        answer:
          "Yes. For safety hazards like sparking outlets, burning smells, or complete power loss, we offer same-day emergency dispatch. Scheduled work is usually available within 1–2 days.",
      },
      {
        question: "How much does it cost to upgrade an electrical panel?",
        answer:
          "Panel upgrades vary based on amperage and home wiring condition. We provide a free on-site estimate with a flat-rate quote — no hourly billing, no hidden fees.",
      },
      {
        question: "Can you install an EV charger at my home?",
        answer:
          "Yes. We install Level 2 EV chargers with dedicated 240V circuits. We handle the permit, utility coordination, and final inspection so it's done right.",
      },
      {
        question: "Do you guarantee your work?",
        answer:
          "All work comes with a written warranty and passes local electrical inspection. If anything fails within the warranty period, we fix it at no charge.",
      },
    ],
    schema: {
      type: "Electrician",
      priceRange: "$$",
    },
  },
};

const TRADE_CATEGORIES = {
  handyman: "Home Improvement",
  kitchen_remodeler: "Kitchen Remodeling",
  plumber: "Plumbing",
  electrician: "Electrical",
};

const VALID_TRADES = Object.keys(PRESETS);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Recursively replace {city} and {state} in all strings within an object. */
function replacePlaceholders(obj, city, state) {
  if (typeof obj === "string") {
    return obj.replace(/\{city\}/g, city).replace(/\{state\}/g, state);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => replacePlaceholders(item, city, state));
  }
  if (obj !== null && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = replacePlaceholders(v, city, state);
    }
    return out;
  }
  return obj;
}

/** Format a 10- or 11-digit phone string as (XXX) XXX-XXXX */
function formatPhone(raw) {
  const digits = raw.replace(/\D/g, "");
  const d = digits.length === 11 && digits[0] === "1" ? digits.slice(1) : digits;
  if (d.length !== 10) return raw;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** Generate a URL-safe slug from a string. */
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ---------------------------------------------------------------------------
// Build the full MichailsWeb.json config
// ---------------------------------------------------------------------------
function buildConfig(args) {
  const preset = PRESETS[args.trade];
  const city = args.city;
  const state = args.state;
  const name = args.name;
  const phone = args.phone;
  const email = args.email;

  // Replace placeholders in preset data
  const presetData = replacePlaceholders(preset, city, state);

  const phoneDisplay = formatPhone(phone);
  const businessSlug = args.slug || slugify(`${name}-${city}`);
  const category = TRADE_CATEGORIES[args.trade];
  const serviceAreas = args.areas
    ? args.areas.split(",").map((a) => a.trim())
    : [`${city}, ${state}`];

  // Convert preset services to the format used by MichailsWeb.json
  const services = presetData.services.map((s) => ({
    title: s.name,
    desc: s.description,
    image: `https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80`,
  }));

  const logoFile = args.logo ? path.basename(args.logo) : null;
  const logoUrl = logoFile ? `/${logoFile}` : "/placeholder.svg";
  const logoAlt = `${name} logo`;

  const config = {
    businessName: name,
    businessSlug: businessSlug,
    trade: args.trade,
    phone: phone.replace(/\D/g, "").length === 10 ? `+1${phone.replace(/\D/g, "")}` : `+${phone.replace(/\D/g, "")}`,
    phoneDisplay: phoneDisplay,
    email: email,
    address: args.address || "",
    city: city,
    state: state,
    zip: args.zip || "",
    logoUrl: logoUrl,
    logoAlt: logoAlt,
    heroImage: "/hero-kitchen-remodel.jpg",
    bbbLogoUrl: "",
    primaryColor: presetData.primaryColor,
    secondaryColor: presetData.secondaryColor,
    heroHeadline: presetData.heroHeadline,
    heroSubheadline: presetData.heroSubheadline,
    heroCta: presetData.heroCta,
    googleRating: args.rating || "5.0",
    reviewCount: args.reviews || "0",
    yearFounded: "",
    licenseNumber: "",
    accreditationLabel: "",
    category: category,
    hours: "Fast response times",
    url: "",

    stats: presetData.stats,
    services: services,
    serviceAreas: serviceAreas,
    serviceNeighborhoods: [],

    about: {
      headline: `Local. Reliable. Trusted ${category.toLowerCase()} pros.`,
      body: [
        `${name} provides professional ${category.toLowerCase()} services for homeowners in ${city}, ${state} and surrounding areas.`,
        `Quality work, clear communication, and fair pricing on every job.`,
        `Call or text anytime for a free estimate.`,
      ],
      images: [],
    },

    trust: [
      `Serving ${city}, ${state} and surrounding areas`,
      "Fast response by call/text",
      "Clean, respectful work in your home",
      "Licensed and insured",
    ],

    howItWorks: presetData.howItWorks,

    gallery: [],

    testimonials: presetData.testimonials,

    faq: presetData.faq,

    contact: {
      headline: "Need help with a home project?",
      sub: "Call or text now — we'll tell you the fastest next step.",
      button: `Call/Text ${phoneDisplay}`,
    },

    social: {
      facebook: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      twitter: "",
    },

    schema: presetData.schema,

    seo: {
      siteTitle: `${name} | ${category} in ${city}, ${state}`,
      metaDescription: `${name} provides professional ${category.toLowerCase()} services in ${city}, ${state}. Call ${phoneDisplay} for a free estimate.`,
      ogImage: "",
      keywords: [
        `${args.trade} ${city} ${state}`,
        `${category.toLowerCase()} ${city}`,
        `${args.trade} near me`,
        `${city} ${args.trade}`,
        `${category.toLowerCase()} ${city} ${state}`,
      ],
    },
  };

  return { config, businessSlug };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const args = parseArgs(process.argv);
  const dryRun = args["dry-run"] === true;

  // 1. Validate required args
  const required = ["name", "phone", "email", "city", "state", "trade"];
  const missing = required.filter((k) => !args[k]);
  if (missing.length > 0) {
    console.error(`Missing required args: ${missing.map((k) => "--" + k).join(", ")}`);
    console.error(
      "\nUsage: node scripts/clone.js --name <name> --phone <phone> --email <email> --city <city> --state <state> --trade <trade> [options]"
    );
    console.error(`\nValid trades: ${VALID_TRADES.join(", ")}`);
    process.exit(1);
  }

  if (!VALID_TRADES.includes(args.trade)) {
    console.error(`Invalid trade "${args.trade}". Must be one of: ${VALID_TRADES.join(", ")}`);
    process.exit(1);
  }

  // 2. Build config
  const { config, businessSlug } = buildConfig(args);

  // 3. Copy project directory
  const projectRoot = path.resolve(__dirname, "..");
  const clonesDir = path.join(os.homedir(), "agency", "clones");
  const cloneDir = path.join(clonesDir, businessSlug);

  if (!fs.existsSync(clonesDir)) {
    fs.mkdirSync(clonesDir, { recursive: true });
  }

  const excludeDirs = new Set(["node_modules", ".git", "dist", "scripts", ".claude"]);

  console.log(`Copying project to ${cloneDir} ...`);
  fs.cpSync(projectRoot, cloneDir, {
    recursive: true,
    filter: (src) => {
      const rel = path.relative(projectRoot, src);
      if (rel === "") return true; // root itself
      const topDir = rel.split(path.sep)[0];
      return !excludeDirs.has(topDir);
    },
  });

  // 4. Write config
  const configPath = path.join(cloneDir, "MichailsWeb.json");
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
  console.log(`Wrote ${configPath}`);

  // 5. Update index.html title
  const indexPath = path.join(cloneDir, "index.html");
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, "utf8");
    html = html.replace(/<title>Loading\.\.\.<\/title>/, `<title>${config.seo.siteTitle}</title>`);
    fs.writeFileSync(indexPath, html);
    console.log(`Updated title in ${indexPath}`);
  }

  // 6. Handle logo
  if (args.logo && fs.existsSync(args.logo)) {
    const logoFileName = path.basename(args.logo);
    const publicDir = path.join(cloneDir, "public");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
    fs.copyFileSync(args.logo, path.join(publicDir, logoFileName));
    console.log(`Copied logo to public/${logoFileName}`);
  }

  if (dryRun) {
    console.log("\n--- DRY RUN — skipping install, build, and deploy ---\n");
    printSummary(config, businessSlug, "(dry-run)");
    return;
  }

  // 7. npm install
  console.log("Running npm install ...");
  execSync("npm install", { cwd: cloneDir, stdio: "inherit" });

  // 8. npm run build
  console.log("Running npm run build ...");
  execSync("npm run build", { cwd: cloneDir, stdio: "inherit" });

  // 9. Vercel deploy
  console.log("Deploying to Vercel ...");
  let deployedUrl = "";
  try {
    const output = execSync(
      `vercel deploy --prod --yes ./dist --name ${businessSlug}`,
      { cwd: cloneDir, encoding: "utf8" }
    );
    deployedUrl = output.trim().split("\n").pop().trim();
  } catch (err) {
    console.error("Vercel deploy failed:", err.message);
    deployedUrl = "DEPLOY_FAILED";
  }

  // 10. Append to deployments.csv
  const deploymentsPath = path.join(clonesDir, "deployments.csv");
  const header = "slug,businessName,trade,city,state,phone,deployedUrl,dateDeployed";
  if (!fs.existsSync(deploymentsPath)) {
    fs.writeFileSync(deploymentsPath, header + "\n");
  }
  const row = [
    businessSlug,
    `"${config.businessName}"`,
    args.trade,
    `"${config.city}"`,
    config.state,
    config.phone,
    deployedUrl,
    new Date().toISOString(),
  ].join(",");
  fs.appendFileSync(deploymentsPath, row + "\n");
  console.log(`Appended to ${deploymentsPath}`);

  // 11. Print summary
  printSummary(config, businessSlug, deployedUrl);
}

function printSummary(config, slug, url) {
  console.log("\n=== Clone Summary ===");
  console.log(`  Business:  ${config.businessName}`);
  console.log(`  Slug:      ${slug}`);
  console.log(`  Trade:     ${config.trade}`);
  console.log(`  Location:  ${config.city}, ${config.state}`);
  console.log(`  Phone:     ${config.phoneDisplay}`);
  console.log(`  URL:       ${url}`);
  console.log("=====================\n");

  // Output deployed URL on its own line for batch-clone to parse
  if (url && url !== "(dry-run)" && url !== "DEPLOY_FAILED") {
    console.log(`DEPLOYED_URL:${url}`);
  }
}

main();
