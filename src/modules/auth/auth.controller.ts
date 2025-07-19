import { Request, Response } from "express";
import { authService } from "./auth.service";

export class AuthController {
  async create(request: Request, response: Response) {
    const { username } = request.body;
    try {
      const user = await authService.create(username);
      response.status(200).json(user);
    } catch (error) {
      response.status(400).json({ error: error });
      console.error(error);
    }
  }
}
