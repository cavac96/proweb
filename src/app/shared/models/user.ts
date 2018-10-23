export class User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;

  constructor(name: string, role: string, email: string, password: string) {
    this.name = name;
    this.role = role;
    this.email = email;
    this.password = password;
  }
}
