export interface Authority {
  authority: string;
}
  
export interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
  authorities: Authority[];
  username: string;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
  
export interface Company {
  companyId: number;
  admin: Admin;
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
