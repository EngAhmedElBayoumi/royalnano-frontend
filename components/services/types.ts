export type Service = {
  id: number;
  name: string;
  alias: string;
  description: string;
  image: string | null;
  created_at: string;
};

export type OTPFieldName = "num1" | "num2" | "num3" | "num4" | "num5" | "num6";