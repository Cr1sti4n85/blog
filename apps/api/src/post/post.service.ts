import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

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

  async create({
    authorId,
    createPostInput,
  }: {
    createPostInput: CreatePostInput;
    authorId: number;
  }) {
    return await this.prisma.post.create({
      data: {
        ...createPostInput,
        author: {
          connect: {
            id: authorId,
          },
        },
        tags: {
          connectOrCreate: createPostInput.tags.map((tag) => ({
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })),
        },
      },
    });
  }

  async update({
    userId,
    updatePostInput,
  }: {
    userId: number;
    updatePostInput: UpdatePostInput;
  }) {
    const authorIdMatch = await this.prisma.post.findUnique({
      where: {
        id: updatePostInput.postId,
        authorId: userId,
      },
    });

    if (!authorIdMatch) throw new ForbiddenException();

    if (!updatePostInput.tags) throw new BadRequestException();

    return await this.prisma.post.update({
      where: {
        id: updatePostInput.postId,
      },
      data: {
        ...updatePostInput,
        tags: {
          set: [], //this removes all prevous relationships
          connectOrCreate: updatePostInput.tags.map((tag) => ({
            //this sets the relations from scratch
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })),
        },
      },
      include: {
        author: true,
        tags: true,
      },
    });
  }
}
