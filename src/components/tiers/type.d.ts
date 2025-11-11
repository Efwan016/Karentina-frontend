export type TBenefit = {
  id: number;
  name: string;
  catering_tier_id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type TTier = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  duration: number;
  photo: string;
  benefits: TBenefit[];
};
