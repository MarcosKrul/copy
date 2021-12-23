import { prismaClient } from "@database/index";
import { User } from "@prisma/client";

class ListUserService {
  public async execute(): Promise<User[]> {
    const users = await prismaClient.user.findMany({
      select: {
        password: false,
        email: true,
        id: true,
        name: true,
      },
    });

    return users as User[];
  }
}

export { ListUserService };
