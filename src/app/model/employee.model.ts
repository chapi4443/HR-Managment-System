import { Company } from "./company.model";
import { Department } from "./department.model";

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  salary: number;
  phone: string;
  hiredDate: Date;
  address: number;
  departmentId: number;
  department?: Department;
}
