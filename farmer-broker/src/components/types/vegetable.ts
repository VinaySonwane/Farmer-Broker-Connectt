// src/types/vegetable.ts
export interface Vegetable {
  _id: string;
  vegetableName: string;
  expectedPrice: number;
  quantity: number;
  imageUrl: string;
  createdAt: string;
  unit: string;
  status: "active" | "sold" | "cancelled";
}
