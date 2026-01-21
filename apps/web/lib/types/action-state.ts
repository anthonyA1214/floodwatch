export type ActionState = {
  errors?: {
    _form?: string[];
    [key: string]: string[] | undefined;
  } | null;
  status?: 'success' | 'error' | null;
  data?: Record<string, string>;
};
