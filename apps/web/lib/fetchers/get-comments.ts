import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { apiFetchClient } from '../api-fetch-client';
import { CommentsResponseInput } from '@repo/schemas';

export async function getComments(
  reportId: number,
  cursor?: string | null,
): Promise<CommentsResponseInput | null> {
  const params = new URLSearchParams({
    limit: '5',
    ...(cursor ? { cursor } : {}),
  });

  const res = await apiFetchClient(
    `${SWR_KEYS.reportComments(reportId)}?${params.toString()}`,
    {
      method: 'GET',
    },
  );

  if (!res.ok) {
    console.error('COMMENTS ERROR:', res.status);
    return null;
  }

  return res.json();
}
