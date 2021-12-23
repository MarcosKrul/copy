import { Request, Response } from "express";

import { AppError } from "@errors/AppError";
import { CreatePostService, ListPostsService } from "@services/post";

class PostController {
  public async read(_: Request, res: Response): Promise<Response> {
    try {
      const listPostService = new ListPostsService();

      const posts = await listPostService.execute();

      return res.status(200).json({
        success: true,
        message: "Operação finalizada com sucesso.",
        data: posts,
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
        data: post,
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
