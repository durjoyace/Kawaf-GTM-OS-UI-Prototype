export interface PlaybookTemplate {
  id: string;
  name: string;
  industry: string;
  description: string;
  signalRules: {
    categories: string[];
    minConfidence: number;
    signalTypes: string[];
  };
  sequenceConfig: {
    channels: string[];
    steps: number;
    cadenceDays: number;
  };
}

export const playbookTemplates: PlaybookTemplate[] = [
  {
    id: "saas-expansion",
    name: "SaaS Expansion Signals",
    industry: "SaaS",
    description:
      "Detect product usage spikes, pricing page visits, and job postings to identify SaaS companies ready to expand.",
    signalRules: {
      categories: ["product-analytics", "external-news"],
      minConfidence: 60,
      signalTypes: ["Pricing Page Visit", "Repeat Visitor", "Job Posting"],
    },
    sequenceConfig: {
      channels: ["email", "linkedin"],
      steps: 4,
      cadenceDays: 3,
    },
  },
  {
    id: "fintech-funding",
    name: "Fintech Funding Tracker",
    industry: "Fintech",
    description:
      "Monitor Series A-C funding rounds and leadership changes in fintech companies to time outreach with budget availability.",
    signalRules: {
      categories: ["external-news", "firmographics"],
      minConfidence: 70,
      signalTypes: ["Funding / Leadership", "Job Posting"],
    },
    sequenceConfig: {
      channels: ["email", "linkedin"],
      steps: 3,
      cadenceDays: 5,
    },
  },
  {
    id: "healthcare-compliance",
    name: "Healthcare Compliance Buyer",
    industry: "Healthcare",
    description:
      "Identify healthcare organizations hiring compliance officers or exploring new regulatory tools.",
    signalRules: {
      categories: ["external-news", "crm-data"],
      minConfidence: 65,
      signalTypes: ["Job Posting", "Deep Engagement"],
    },
    sequenceConfig: {
      channels: ["email"],
      steps: 5,
      cadenceDays: 4,
    },
  },
  {
    id: "agency-growth",
    name: "Agency New Client Signals",
    industry: "Agency",
    description:
      "Track website visits, content downloads, and CRM activity to identify agencies looking for tools to scale.",
    signalRules: {
      categories: ["product-analytics", "marketing-engagement"],
      minConfidence: 55,
      signalTypes: ["Repeat Visitor", "Pricing Page Visit", "Deep Engagement"],
    },
    sequenceConfig: {
      channels: ["email", "linkedin", "slack"],
      steps: 6,
      cadenceDays: 2,
    },
  },
];
