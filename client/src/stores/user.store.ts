import { makeAutoObservable, runInAction, action } from "mobx";

export type Gender = "Male" | "Female" | "DontTalkAboutGender";

export interface IUser {
  uid: number;
  name: string;
  surname: string;
  age: number;
  email: string;
  gender: Gender;
  role: string;
}

class UserStore {
  name: string = "";
  surname: string = "";
  age: number | "" = "";
  email: string = "";
  password: string = "";
  gender: Gender = "Male";
  role: string = "User";

  users: IUser[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      changeData: action,
      removeAllData: action,
      fetchUsers: action.bound,
    });
  }

  changeData<K extends keyof UserStore>(field: K, value: UserStore[K]) {
    (this as any)[field] = value;
  }

  removeAllData() {
    this.name = "";
    this.surname = "";
    this.age = "";
    this.email = "";
    this.password = "";
    this.gender = "Male";
    this.role = "User";
  }

  async fetchUsers() {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const res = await fetch(`http://localhost:3000/get-all-users`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(await res.text());
      const result: IUser[] = await res.json();

      runInAction(() => {
        this.users = Array.isArray(result)
          ? result.map((user) => ({
            uid: user.uid,
            name: user.name,
            surname: user.surname,
            age: user.age,
            email: user.email,
            gender: user.gender,
            role: user.role,
          }))
          : [];
      });
    } catch (err: any) {
      console.error("Error when load users:", err);
      runInAction(() => {
        this.error = err.message || "Error when load users";
        this.users = [];
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export default new UserStore();
