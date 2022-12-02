import { DepartmentTypes } from "./department-types";
import { Tower } from "./tower";
import { User } from "./user";

export class Department {
    id: number;
    name: string;
    number: number;
    floor: number;
    numberRooms: number;
    status: number;
    squareMeters: number;
    joinDate: string;
    tower: Tower;
    departmentTypes: DepartmentTypes;
    user: User;
}
