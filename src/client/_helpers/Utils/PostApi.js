import { authHeader } from '../auth-header';

export async function PostApi(url, json) {
  const myRequest = new Request(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(json),
  });
  const result = fetch(myRequest)
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
      throw new Error(error);
      // console.log(error.message);
      // if (error.message == 'Need logout') throw new Error('Goout');
    });
  return result;
}

export async function PostApiForm(url, json) {
  let formBody = [];
  for (const property in json) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(json[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  formBody = formBody.join('&');
  const myRequest = new Request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody,
  });
  // console.log(json);
  // console.log(myRequest.body);
  const result = fetch(myRequest)
    .then(response => {
      // console.log('in resssss');
      // console.log(response);
      if (response.status === 200) {
        // console.log('??clgttt');
        // console.log(response.text());
        return response.json();
      }
      console.log('err');
      return false;
      // return Promise.reject(new Error('err status != 200'));
      // console.log('Something went wrong on api server!');
    })
    .then(response => response);
  // .catch(error => {
  //   console.log(`Stm went wronggggg${error}`);
  // });
  return result;
}
