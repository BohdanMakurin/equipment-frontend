export interface CompanyAdmin {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
}

export interface CompanyEditRequest {
  name: string;
  description: string;
}

export interface Company {
  companyId: number;
  admin: CompanyAdmin;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  employees: User[];
}

export interface CreateCompanyRequest {
  adminId: number,
  name: string,
  description: string
}

export interface Profile {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: string,
  company: Company,
  equipment: Equipment[],
  createdAt: string,
  updatedAt: string
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  company: Company;
}
export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  companyId: number;
}

export interface EditUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  companyId: number;
}

export interface AddCategory{
  name: string;
}

export interface CreateCategoryRequest{
  name: string;
  adminId: number;
}

export interface Category{
  categoryId: number;
  name: string;
  admin: User;
}

export interface CreateEquipmentRequest{
  name: string;
  description: string;
  serialNumber: string;
  categoryId: number;
  companyId: number;
}

export interface Equipment{
  equipmentId: number;
  name: string;
  description: string;
  serialNumber: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  user: User;
  qrCode: string;
  company: Company;
  location: string;
}

export interface EquipmentEditRequest{
  name: string;
  description: string;
  serialNumber: string;
  categoryId: string;
  userId: string;
  companyId: string;
  location: string;
}