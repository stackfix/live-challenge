export type TimePeriod = "day" | "week" | "month" | "year";

export type Requirement = {
  name: string;
  status: "met" | "unmet" | "partially-met";
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  productScoring: {
    stackfixScore: number;
    fitScore: number;
  };
  dealBreakers: Array<string>;
  pricing: {
    totalPrice: number;
    period: TimePeriod;
  };
  requirements: Array<Requirement>;
};
