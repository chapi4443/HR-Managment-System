import { Employee } from "./employee.model";

export class Salary {
  id!: number;
  amount: number;
  bonus: number;
  employeeId!: number;
  employee?: Employee;
}
