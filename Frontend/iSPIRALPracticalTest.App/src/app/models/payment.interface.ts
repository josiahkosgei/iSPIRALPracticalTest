export class Payment {
  constructor(initialData?: Partial<Payment>) {
    if (!initialData) {
        Object.assign(this, initialData);
    }
}
  payment_id!: number;
  customer_id!: number;
  order_id!: number;
  payment_date!: string;
  payment_amount!: number;
  payment_method!: string;
  payment_status!: string;
  currency!: string;
}
