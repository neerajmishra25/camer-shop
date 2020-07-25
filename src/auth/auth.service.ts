import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRespository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authSignUpDto: AuthSignUpDto,
  ): Promise<{ id: number; name: string; email: string; msg: string }> {
    return this.userRespository.signUp(authSignUpDto);
  }

  async signIn(authSignInDto: AuthSignInDto): Promise<{ accessToken: string }> {
    const email = await this.userRespository.validateUserPassword(
      authSignInDto,
    );
    if (!email) {
      throw new UnauthorizedException('Username or Password is incorrect.');
    }
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
