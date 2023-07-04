export interface Auth {
  email: string;
  password: string;
}

export interface NewUser extends Auth {
  name: string;
}
