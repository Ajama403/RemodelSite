import config from "../../MichailsWeb.json";

const site = {
  ...config,
  // Computed fields for backward compat
  phoneTel: config.phone,
  logo: config.logoUrl,
  baseCity: `${config.city}, ${config.state}`,
  process: config.howItWorks,
  primaryCtaLabel: config.heroCta,
};

export { site };
export default site;
