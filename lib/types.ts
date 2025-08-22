import { Result } from '@/lib/tryCatch';

export type PasteActionResponse<T> = Promise<Result<T, { message: string }>>;
