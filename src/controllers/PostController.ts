import { Request, Response } from "express";

import { AppError } from "@errors/AppError";
import {
  CreatePostService,
  ListPostsService,
  ListUserPostsService,
} from "@services/post";

class PostController {
  public async read(_: Request, res: Response): Promise<Response> {
    try {
      const listPostService = new ListPostsService();

      const posts = await listPostService.execute();

      return res.status(200).json({
        success: true,
        message: "Operação finalizada com sucesso.",
        content: posts,
      });
    } catch (e) {
      return res.status(AppError.getErrorStatusCode(e)).json({
        success: false,
        message: AppError.getErrorMessage(e),
      });
    }
  }

  public async readByUser(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id: id } = req.params;

      if (req.user.id !== id)
        return res.status(401).json({
          success: false,
          message:
            "Você não possui permissão para acessar os posts de outro usuário.",
        });

      const listUserPostsService = new ListUserPostsService();

      const posts = await listUserPostsService.execute(id);

      return res.status(200).json({
        success: true,
        message: "Operação finalizada com sucesso.",
        content: posts,
      });
    } catch (e) {
      return res.status(AppError.getErrorStatusCode(e)).json({
        success: false,
        message: AppError.getErrorMessage(e),
      });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, body, imageUrl, userId } = req.body;

      const createPostService = new CreatePostService();

      const post = await createPostService.execute({
        title,
        body,
        imageUrl,
        userId,
      });

      return res.status(200).json({
        success: true,
        message: "Operação finalizada com sucesso.",
        content: post,
      });
    } catch (e) {
      return res.status(AppError.getErrorStatusCode(e)).json({
        success: false,
        message: AppError.getErrorMessage(e),
      });
    }
  }
}

export { PostController };
