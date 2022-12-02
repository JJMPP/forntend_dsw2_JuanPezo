import { Department } from "./department";
import { User } from "./user";

export class Mascot {
    id: number;
    name: string;
    sex: string;
    race: string;
    status: number;
    joinDate: Date;
    user: User;
    department: Department;
}
