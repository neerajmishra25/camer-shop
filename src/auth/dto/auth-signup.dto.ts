import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
  @IsEmail()
  email: string;
  @MinLength(8)
  // @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$') -- validates for Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character: -- Commented as this is a simple app and for sake of simplicity of tester and developer
  password: string;
}
