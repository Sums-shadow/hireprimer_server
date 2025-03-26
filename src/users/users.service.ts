import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // 🔍 Trouver un utilisateur par email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  // ➕ Créer un nouvel utilisateur
  async create(email: string, hashedPassword: string): Promise<User> {
    const createdUser = new this.userModel({ email, password: hashedPassword });
    return createdUser.save();
  }
}
