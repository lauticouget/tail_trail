import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ENDPOINT = 'IS_PUBLIC_ENDPOINT';
export const isPublicEndpoint = () =>
  SetMetadata(IS_PUBLIC_ENDPOINT, true);
