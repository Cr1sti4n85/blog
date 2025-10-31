import { Resolver, Mutation, Context, Args, Int, Query } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import type { AuthenticatedGraphQLContext } from 'src/auth/types/context.interface';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async likePost(
    @Context() context: AuthenticatedGraphQLContext,
    @Args('postId', { type: () => Int }) postId: number,
  ) {
    const userId = context.req.user.id;
    return await this.likeService.likePost({ userId, postId });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async unlikePost(
    @Context() context: AuthenticatedGraphQLContext,
    @Args('postId', { type: () => Int }) postId: number,
  ) {
    const userId = context.req.user.id;
    return await this.likeService.unlikePost({ postId, userId });
  }

  @Query(() => Int)
  postLikesCount(@Args('postId', { type: () => Int }) postId: number) {
    return this.likeService.getPostLikesCount(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
  userLikePost(
    @Context() context: AuthenticatedGraphQLContext,
    @Args('postId', { type: () => Int }) postId: number,
  ) {
    const userId = context.req.user.id;
    return this.likeService.userLikePost({ postId, userId });
  }
}
