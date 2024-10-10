import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  readonly name: string;

  @IsNotEmpty({ message: 'Sobrenome é obrigatório' })
  readonly lastname: string;

  @IsEmail({}, { message: 'Email é obrigatório' })
  readonly email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'É necessário no mínimo 6 caracteres' })
  readonly password: string;
}
