export interface CreateProductItemDTO {
  name: string;
  description: string;
  price: number;
  category: string;
  available?: boolean;
}
