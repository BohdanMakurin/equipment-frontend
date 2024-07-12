export interface CompanyAdmin {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
}

export interface Company {
    companyId: string,
    admin: CompanyAdmin,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string
}

export interface Profile {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    company: Company[],
    createdAt: string,
    updatedAt: string
  }