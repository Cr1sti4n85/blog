import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { CreateCommentInput } from './dto/create-comment.input';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createCommentInput: CreateCommentInput) {
  //   return 'This action adds a new comment';
  // }

  // update(id: number, updateCommentInput: UpdateCommentInput) {
  //   return `This action updates a #${id} comment`;
  // }

  async findOneByPost({
    postId,
    take,
    skip,
  }: {
    postId: number;
    take?: number;
    skip?: number;
  }) {
    return await this.prisma.comment.findMany({
      where: { postId },

      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
      },
      take: take ?? DEFAULT_PAGE_SIZE,
      skip: skip ?? 0,
    });
  }

  async count(postId: number) {
    return await this.prisma.comment.count({
      where: { postId },
    });
  }

  async create(createCommentInput: CreateCommentInput, authorId: number) {
    return await this.prisma.comment.create({
      data: {
        content: createCommentInput.content,
        post: {
          connect: {
            id: createCommentInput.postId,
          },
        },
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
  }
}
