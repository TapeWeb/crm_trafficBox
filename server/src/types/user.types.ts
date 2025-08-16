export interface CreateUserData {
  name: string;
  surname: string;
  email: string;
  password: string;
  gender: string;
  age: number;
}

export interface CheckUserData {
  email: string;
  password: string;
}