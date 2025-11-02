import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';

@Injectable()
export class PostService {
  //inject prisma service
  constructor(private prisma: PrismaService) {}
  async findAll({
    skip = 0,
    take = DEFAULT_PAGE_SIZE,
  }: {
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.post.findMany({
      skip,
      take,
    });
  }

  async countPosts() {
    return await this.prisma.post.count();
  }

  async getPostById(id: number) {
    return await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        tags: true,
      },
    });
  }

  async findByUser({
    userId,
    skip = 0,
    take = DEFAULT_PAGE_SIZE,
  }: {
    userId: number;
    skip: number | undefined;
    take: number | undefined;
  }) {
    return await this.prisma.post.findMany({
      where: {
        author: {
          id: userId,
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        published: true,
        slug: true,
        title: true,
        thumbnail: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      skip,
      take,
    });
  }

  async userPostCount(userId: number) {
    return this.prisma.post.count({
      where: {
        authorId: userId,
      },
    });
  }
}
