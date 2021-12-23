import { prismaClient } from "@database/index";
import { AppError } from "@errors/AppError";
import { Post } from "@prisma/client";

class ListUserPostsService {
  public async execute(id: string): Promise<Post[]> {
    const hasUser = await prismaClient.user.findFirst({
      where: { id },
    });

    if (!hasUser)
      throw new AppError(404, "Não foi possível encontrar o autor do post.");

    const posts = await prismaClient.post.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        title: true,
        body: true,
        imageUrl: true,
      },
    });

    return posts as Post[];
  }
}

export { ListUserPostsService };
