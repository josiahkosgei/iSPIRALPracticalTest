export class CreatePaymentDto{
  order_id!: number;
  customer_id!: number;
  payment_amount!: number;
  payment_method!: string;
  currency!: string;
}
