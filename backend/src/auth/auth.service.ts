// auth.service.ts
import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  user_role: 'MEMBER' | 'ADMIN';
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    phone?: string | null;
  };
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: user.user_id,
      email: user.email,
      role: user.user_role
    });

    return {
      token,
      user: {
        id: user.user_id,
        name: user.username,
        email: user.email,
        role: user.user_role,
        phone: null
      }
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { username, email, password, user_role } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique user ID based on count
    const userCount = await this.prisma.user.count();
    const userId = `U${String(userCount + 1).padStart(9, '0')}`;

    const user = await this.prisma.user.create({
      data: {
        user_id: userId,
        username,
        email,
        password: hashedPassword,
        user_role,
      }
    });

    const token = this.jwtService.sign({
      sub: user.user_id,
      email: user.email,
      role: user.user_role
    });

    return {
      token,
      user: {
        id: user.user_id,
        name: user.username,
        email: user.email,
        role: user.user_role,
        phone: null
      }
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId }
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.user_id,
      name: user.username,
      email: user.email,
      role: user.user_role,
      phone: null
    };
  }
}