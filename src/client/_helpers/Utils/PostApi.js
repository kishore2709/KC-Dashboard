import { history } from '_helpers';
import { authHeader } from '../auth-header';

export async function PostApi(url, json, abortSignal) {
  const myRequest = new Request(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(json),
  });
  const rawResponse = await fetch(myRequest, { signal: abortSignal });
  const res = await rawResponse.json();
  if (rawResponse.status === 200) return res;
  if (rawResponse.status === 401) {
    // Unauthorized
    history.push('/login');
  }
  return res;
}
