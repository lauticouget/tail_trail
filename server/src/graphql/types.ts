import { Request, Response } from 'express';

export type GqlRequestContext = {
  req: Request;
  res: Response;
};
