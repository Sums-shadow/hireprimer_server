import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe invalide');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email ou mot de passe invalide');
    }

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(email, hashedPassword);
    return user;
  }
}
