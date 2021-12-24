import { hash } from "bcryptjs";
import EmailValidator from "email-validator";

import { prismaClient } from "@database/index";
import { AppError } from "@errors/AppError";
import { CreateUserRequest } from "@models/CreateUserRequest";
import { User } from "@prisma/client";

class CreateUserService {
  public async execute({
    email,
    password,
    name,
  }: CreateUserRequest): Promise<Omit<User, "password">> {
    if (!email || !EmailValidator.validate(email))
      throw new AppError(404, "É necessário informar um e-mail válido.");

    const hasUser = await prismaClient.user.findFirst({
      where: { email },
    });

    if (hasUser) throw new AppError(400, "O e-mail informado já existe.");

    const { password: _, ...saved } = await prismaClient.user.create({
      data: {
        email,
        password: await hash(password, 11),
        name,
      },
    });

    return saved;
  }
}

export { CreateUserService };
