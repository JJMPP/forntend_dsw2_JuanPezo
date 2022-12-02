import { Department } from "./department";
import { User } from "./user";

export class Incidence {
    id: number;
    cause: string;
    comment: string;
    status: number;
    registrationDate: Date;
    incidenceDate: Date;
    department: Department;
    user: User
}
