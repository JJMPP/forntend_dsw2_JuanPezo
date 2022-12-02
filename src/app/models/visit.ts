import { Department } from "./department";
import { Visitor } from "./visitor";

export class Visit {
    id: number;
    comments: string;
    entryDate: Date;
    estimatedDate: Date;
    exitDate: Date;
    status: number;
    visitor: Visitor;
    department: Department;
}
