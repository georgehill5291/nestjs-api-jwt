import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(user: User, dto: EditUserDto) {
    // console.log('editUser', userId);
    const userResult = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: dto.email,
        fisrtName: dto.firstName,
        lastName: dto.lastName,
      },
    });
    delete userResult.hash;

    return userResult;
  }
}
