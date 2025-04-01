import { SetMetadata } from '@nestjs/common';

export const NO_TOKEN_REQUIRED = 'noTokenRequired';

export const NoTokenRequired = () => SetMetadata(NO_TOKEN_REQUIRED, true);
