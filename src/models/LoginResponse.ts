import { User } from "@prisma/client";

type LoginResponse = {
  user: Omit<User, "password">;
  token: string;
};

export { LoginResponse };
