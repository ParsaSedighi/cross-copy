import { Result } from '@/lib/tryCatch';

export type ActionResponse<T> = Promise<Result<T, { message: string }>>;
