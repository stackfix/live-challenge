type TimePeriod = "day" | "week" | "month" | "year";

type Requirement = {
  name: string;
  status: "met" | "unmet" | "partially-met";
};

type StackFixRating ={
  name: string;
  score: number;
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
  ratings: Array<StackFixRating>;
};
