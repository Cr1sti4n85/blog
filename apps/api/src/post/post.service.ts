import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  //inject prisma service
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.post.findMany();
  }
}
