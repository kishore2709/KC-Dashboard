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
  const result = fetch(myRequest, { signal: abortSignal })
    .then(response => {
      // console.log(response);
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 404) throw new Error('Need logout');
      console.log('err');
      return 'err';
      // return Promise.reject(new Error('err status != 200'));
      // console.log('Something went wrong on api server!');
    })
    .then(response => response)
    .catch(error => {
      console.log(`Stm went wronggggg${error}`);
      // console.log(error.message);
      // if (error.message == 'Need logout') throw new Error('Goout');
    });
  return result;
}
