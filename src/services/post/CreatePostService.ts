import { prismaClient } from "@database/index";
import { AppError } from "@errors/AppError";
import { CreatePostRequest } from "@models/CreatePostRequest";
import { Post } from "@prisma/client";

class CreatePostService {
  public async execute({
    body,
    imageUrl,
    title,
    userId,
  }: CreatePostRequest): Promise<Post> {
    if (!title) throw new AppError(400, "O título é necessário.");

    if (!body) throw new AppError(400, "O conteúdo do post é necessário.");

    if (!imageUrl)
      throw new AppError(400, "A imagem principal do post é necessário.");

    if (!userId)
      throw new AppError(400, "É necessário informar o autor do post.");

    const hasUser = await prismaClient.user.findFirst({
      where: { id: userId },
    });

    if (!hasUser)
      throw new AppError(404, "Não foi possível encontrar o autor do post.");

    const saved = await prismaClient.post.create({
      data: {
        body,
        imageUrl,
        title,
        userId,
      },
    });

    return saved;
  }
}

export { CreatePostService };
