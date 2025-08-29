import { makeAutoObservable } from "mobx";

class UserStore {
  name = "";
  surname = "";
  age = "";
  password = "";
  email = "";
  gender = "Male";

  constructor() {
    makeAutoObservable(this);
  }

  changeData<K extends keyof UserStore>(field: K, value: UserStore[K]) {
    (this as any)[field] = value;
  }

  getData<K extends keyof UserStore>(field: K): UserStore[K] {
    return this[field];
  }

  removeAllData() {
    this.name = "";
    this.surname = "";
    this.age = "";
    this.password = "";
    this.email = "";
    this.gender = "Male";
  }
}


export default new UserStore();
