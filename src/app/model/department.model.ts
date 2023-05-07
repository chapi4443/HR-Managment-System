import { Company } from "./company.model";

export class Department {
    id!: number;
    name!: string;
    companyId!:number;
    company: Company;
}
