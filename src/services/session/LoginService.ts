import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { prismaClient } from "@database/index";
import { AppError } from "@errors/AppError";
import { LoginRequest } from "@models/LoginRequest";
import { LoginResponse } from "@models/LoginResponse";
import { User } from "@prisma/client";

const generateToken = (user: Omit<User, "password">): string => {
  const token = sign(user, process.env.JWT_SECRET || "jwtsecret@default", {
    expiresIn: "3d",
  });

  return token;
};

class LoginService {
  public async execute({
    email,
    password,
  }: LoginRequest): Promise<LoginResponse> {
    const hasUser = await prismaClient.user.findFirst({
      where: { email },
    });

    if (!hasUser || !(await compare(password, hasUser.password)))
      throw new AppError(404, "Credenciais incorretas.");

    const { password: _, ...user } = hasUser;

    return {
      user,
      token: generateToken(user),
    };
  }
}

export { LoginService };
