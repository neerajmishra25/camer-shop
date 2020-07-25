import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthSignInDto } from './dto/auth-signin.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(
    authSignUpDto: AuthSignUpDto,
  ): Promise<{ id: number; name: string; email: string; msg: string }> {
    const { name, email, password } = authSignUpDto;
    const exists = await this.findOne({ email });
    if (exists) {
      throw new ConflictException('Email Already Exists');
    }
    const salt = await bcrypt.genSalt(12);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, salt);
    const newUser = await user.save();
    return { id: newUser.id, name, email, msg: 'User Added' };
  }

  async validateUserPassword(authSignInDto: AuthSignInDto): Promise<string> {
    const { email, password } = authSignInDto;
    const user = await this.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }
    return user.email;
  }
}
