import { Request, Response } from 'express';

export interface GraphQLContext {
  req: Request;
  res: Response;
  user?: any;
}

export interface AuthenticatedGraphQLContext extends GraphQLContext {
  req: Request & { user: { id: number } };
}
