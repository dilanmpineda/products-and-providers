import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if(user && await bcrypt.compare(password, user.password)) {
      const {password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  // Principio de Responsabilidad única (SRP), Este método se va encargar únicamente de generar el JWT
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload), // Genera un token JWT firmado con el payload
    };
  }
}
