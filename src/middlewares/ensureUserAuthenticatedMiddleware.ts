import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@errors/AppError";

const ensureUserAuthenticatedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { authorization: tokenHeader } = req.headers;

  if (!tokenHeader)
    return res.status(401).json({
      success: false,
      message:
        "Não foi possível realizar a autenticação do usuário pois o token não foi enviado.",
    });

  const parts = tokenHeader.split(" ");
  const [scheme, token] = parts;

  if (!parts || parts.length !== 2 || !/^Bearer$/i.test(scheme))
    return res.status(401).json({
      success: false,
      message:
        "Não foi possível realizar a autenticação do usuário pois o token não está no formato correto.",
    });

  try {
    const decoded = verify(token, process.env.JWT_SECRET || "");

    return next();
  } catch (err) {
    throw new AppError(
      401,
      "Não foi possível realizar a autenticação do usuário pois o token é inválido."
    );
  }
};

export { ensureUserAuthenticatedMiddleware };
