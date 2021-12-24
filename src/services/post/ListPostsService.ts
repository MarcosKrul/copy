import { prismaClient } from "@database/index";
import { ListPostsResponse } from "@models/ListPostsResponse";

class ListPostsService {
  public async execute(): Promise<ListPostsResponse[]> {
    const posts = await prismaClient.post.findMany({
      select: {
        body: true,
        id: true,
        imageUrl: true,
        title: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  }
}

export { ListPostsService };
