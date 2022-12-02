import { PaymentReceipts } from "./payment-receipts";

export class Payment {
    id: number;
    paymentDate: Date;
    paymentReceipt: PaymentReceipts;
}
