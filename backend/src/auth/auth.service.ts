import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../entities/user.entity';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: EntityRepository<User>,
    private jwtService: JwtService,
    private em: EntityManager,
  ) {}

  async register(username: string, password: string) {
    if (!username || !password) {
      throw new BadRequestException({
        status: 400,
        message: 'Username and password are required',
        error: 'Bad Request',
      });
    }

    const existingUser = await this.userRepository.findOne({ username });
    if (existingUser) {
      throw new ConflictException({
        status: 409,
        message: 'Username already exists',
        error: 'Conflict',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.uid = crypto.randomUUID();
    user.username = username;
    user.password = hashedPassword;
    user.latestLogin = new Date();
    await this.em.persistAndFlush(user);

    return {
      status: 201,
      message: 'User registered successfully',
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({ username, deletedAt: null });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.uid };
    const access_token = this.jwtService.sign(payload);
    user.latestLogin = new Date();
    await this.em.persistAndFlush(user);
  
    return {
      status: 200,
      data: {
        access_token,
        uid: user.uid,
        username: user.username,
      },
    };
  }

  async softDeleteUser(uid: string) {
    const user = await this.userRepository.findOne({ uid });
    if (!user) {
      throw new NotFoundException({
        status: 404,
        message: 'User not found',
        error: 'Not Found',
      });
    }
    user.deletedAt = new Date();
    await this.em.persistAndFlush(user);
    return {
      status: 200,
      message: 'User deleted successfully',
    };
  }
}