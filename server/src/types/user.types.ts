export const validRoles = ["Admin", "User", "Guest", "Developer", "Banned", "V.I.P"];

export type RolesType = typeof validRoles[number];

export interface CreateUserData {
  name: string;
  surname: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  balance: number;
  role: RolesType;
}


export interface UserData {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  balance: number;
  role: RolesType;
}

export interface CheckAuthData {
  email: string;
  password: string;
}
