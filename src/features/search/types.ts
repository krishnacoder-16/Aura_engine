import { ReactNode } from "react";

export type ResultType = "product" | "warehouse" | "navigation";

export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: ResultType;
  icon: ReactNode;
  url: string;
}
