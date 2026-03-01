export interface ComparisonRow {
  feature: string;
  category: string;
  kawaf: string | boolean;
  competitor: string | boolean;
}

export const comparisonData: ComparisonRow[] = [
  // Pricing & Access
  { feature: "Monthly Cost", category: "Pricing", kawaf: "From $99/mo", competitor: "$15,000/mo" },
  { feature: "Free Tier", category: "Pricing", kawaf: true, competitor: false },
  { feature: "Self-Serve Signup", category: "Pricing", kawaf: true, competitor: false },
  { feature: "No Long-Term Contract", category: "Pricing", kawaf: true, competitor: false },

  // Signal Detection
  { feature: "AI-Powered Signal Scoring", category: "Signals", kawaf: true, competitor: "Manual review" },
  { feature: "Website Visitor Tracking", category: "Signals", kawaf: true, competitor: true },
  { feature: "Job Posting Signals", category: "Signals", kawaf: true, competitor: "Manual" },
  { feature: "Funding & News Signals", category: "Signals", kawaf: true, competitor: "Manual" },
  { feature: "Real-Time Processing", category: "Signals", kawaf: "Every 5 min", competitor: "Weekly reports" },
  { feature: "Custom ICP Configuration", category: "Signals", kawaf: true, competitor: "Analyst-defined" },

  // Outreach & Action
  { feature: "AI-Drafted Outreach", category: "Outreach", kawaf: true, competitor: "Human copywriters" },
  { feature: "One-Click Send", category: "Outreach", kawaf: true, competitor: false },
  { feature: "Multi-Channel Sequences", category: "Outreach", kawaf: true, competitor: true },
  { feature: "Personalization Engine", category: "Outreach", kawaf: "AI-powered", competitor: "Manual" },

  // Integrations
  { feature: "CRM Integrations", category: "Integrations", kawaf: "HubSpot, Salesforce, +more", competitor: "HubSpot, Salesforce" },
  { feature: "API Access", category: "Integrations", kawaf: true, competitor: false },
  { feature: "Workflow Automation", category: "Integrations", kawaf: "Visual builder", competitor: false },

  // Analytics
  { feature: "Signal Attribution", category: "Analytics", kawaf: true, competitor: "Basic" },
  { feature: "Revenue Attribution", category: "Analytics", kawaf: true, competitor: true },
  { feature: "Real-Time Dashboard", category: "Analytics", kawaf: true, competitor: "Weekly PDF" },

  // Support
  { feature: "Time to First Signal", category: "Setup", kawaf: "5 minutes", competitor: "2-4 weeks" },
  { feature: "Onboarding", category: "Setup", kawaf: "Self-serve wizard", competitor: "Dedicated analyst" },
  { feature: "Playbook Templates", category: "Setup", kawaf: true, competitor: false },
];

export const competitorInfo = {
  name: "Smoke Signals AI",
  tagline: "GTM Agency",
  priceRange: "$15,000/mo",
  model: "Done-for-you agency model with human analysts",
};
