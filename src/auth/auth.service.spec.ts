import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // 📌 Enregistrer un nouvel utilisateur
  async register(
    email: string,
    password: string,
  ): Promise<{ message: string }> {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email déjà utilisé.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await this.usersService.create(email, hashedPassword);

    return { message: 'Inscription réussie' };
  }
}
