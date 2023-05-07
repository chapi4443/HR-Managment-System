import { Company } from "./company.model";

export class Employee {
    id!: number;
    name!: string;
    email!:string;
    salary!: number;
    phone!:string;
    address!: number;
    companyId!:number;
    company!: Company;
}