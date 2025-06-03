export interface CreateOrderDto {
  user_id: number;
  user_name: string;
  user_phone: string;
  delivery_address: string;
  total_price: number;
  discount_code?: string;
  discount_amount?: number;
  orderDetails: {
    food_id: number;
    name: string;
    quantity: number;
    amount: number;
  }[];
}