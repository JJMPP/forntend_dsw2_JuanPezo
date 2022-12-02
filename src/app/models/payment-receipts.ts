import { Department } from "./department";
import { Tower } from "./tower";
import { TypeService } from "./type-service";
import { User } from "./user";

export class PaymentReceipts {
    id: number;
    amount: number;
    month: number;
    periodDate: string;
    registrationDate: Date;
    paymentDate: Date;
    expirationDate: Date;
    status: number;
    userPaymentDate: Date;
    typeService: TypeService;
    department: Department;
    user: User;
}
