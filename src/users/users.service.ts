import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDTO: CreateUserDTO): Promise<any> {
    let { email, password, ...userData } = createUserDTO;

    email = email.toLowerCase();

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException({
        message: 'E-mail já cadastrado!',
        error: 'CONFLITO',
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new this.userModel({
      ...userData,
      email,
      password: hashedPassword,
    });

    const savedUser = await createdUser.save();

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Usuario criado com sucesso!',
      data: savedUser,
    };
  }

  async findUserByEmail(email: string): Promise<any> {
    email = email.toLowerCase();
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (!existingUser) {
      throw new NotFoundException({
        message: `Não foi possível encontrar informações para o e-mail ${email}.`,
        error: 'NÃO ENCONTRADO',
      });
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Usuário encontrado com sucesso!',
      data: existingUser,
    };
  }

  async findAll(): Promise<any> {
    const users = await this.userModel.find().exec();

    if (users.length === 0) {
      throw new NotFoundException({
        message: 'Nenhum usuário encontrado.',
        error: 'NADA ENCONTRADO',
      });
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Usuários recuperados com sucesso!',
      data: users,
    };
  }

  async deleteUserByEmail(email: string): Promise<any> {
    email = email.toLowerCase();
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (!existingUser) {
      throw new NotFoundException({
        message: `O e-mail ${email} não existe em nosso banco de dados.`,
        error: 'NÃO ENCONTRADO',
      });
    }

    await existingUser.deleteOne({ email }).exec();

    return {
      statusCode: HttpStatus.OK,
      message: 'Usuário deletado com sucesso!',
    };
  }
}
