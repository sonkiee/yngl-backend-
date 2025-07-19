import {} from "drizzle-orm";
import { NewUser } from "../users/user.schema";
import { userService } from "../users/user.service";
import jwt from "jsonwebtoken";

export class AuthService {
  async create(userData: NewUser) {
    const existing = await userService.findByUsername(userData.username);

    if (existing) {
      throw new Error("User already exists");
    }

    const user = await userService.create(userData);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    return { user, token };
  }
}

export const authService = new AuthService();
