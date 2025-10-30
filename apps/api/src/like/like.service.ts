import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost({
    userId,
    postId,
  }: {
    userId: number;
    postId: number;
  }): Promise<boolean> {
    try {
      return !!(await this.prisma.like.create({
        data: {
          userId,
          postId,
        },
      }));
    } catch {
      throw new BadRequestException('Esta acción ya fue realizada');
    }
  }

  async unlikePost({ postId, userId }: { postId: number; userId: number }) {
    try {
      await this.prisma.like.delete({
        where: {
          likeUserPost: {
            userId,
            postId,
          },
        },
      });
      return true;
    } catch {
      throw new BadRequestException('Like not found');
    }
  }

  async getPostLikesCount(postId: number) {
    return await this.prisma.like.count({
      where: {
        postId,
      },
    });
  }

  async userLikedPost({ postId, userId }: { postId: number; userId: number }) {
    const like = await this.prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });
    return !!like;
  }
}
