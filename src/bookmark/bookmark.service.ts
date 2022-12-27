import { Injectable } from '@nestjs/common';
import { createBookmarkDto, editBookmarkDto } from './dto';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
    });
  }

  getBookMarkById(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId: userId,
        id: bookmarkId,
      },
    });
  }

  async createBookmark(userId: number, dto: createBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });

    return bookmark;
  }

  async editBookMarkById(
    userId: number,
    bookmarkId: number,
    dto: editBookmarkDto,
  ) {
    console.log('editBookMarkById', dto);
    //get bookmark by id
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    //check if user ows the bookmark
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to reosurces denied');
    }
    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookMarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    //check if user ows the bookmark
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to reosurces denied');
    }

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
