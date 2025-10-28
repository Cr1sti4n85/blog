import { Resolver, Query, Context, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import type { GraphQLContext } from 'src/auth/types/context.interface';
// import { CreatePostInput } from './dto/create-post.input';
// import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Context() context: GraphQLContext,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    return this.postService.findAll({ skip, take });
  }

  @Query(() => Int, { name: 'postCount' })
  count() {
    return this.postService.countPosts();
  }

  @Query(() => Post, { name: 'singlePost' })
  findPostById(@Args('id', { type: () => Int }) id: number) {
    return this.postService.getPostById(id);
  }
}
