const defaultContentType = 'application/json';
const remoteUrl = 'http://localhost:1337';

const asyncRequest = async (payload) => {
  const {
    path,
    method,
    body,
    cType
  } = payload;

  const contentType = cType || defaultContentType;
  const headers = { 'Content-Type': `${ contentType }` };

  const response = await fetch(`${ remoteUrl }/${ path }`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  console.log('response',response);

  if (response.status === 200) {
    const responseBody = response.json();
    return responseBody;
  }

  if (
    response.status === 400
    || response.status === 401
    || response.status === 403
    || response.status === 500
  ) {
    throw Error(response.statusText);
  }

  throw Error('An unexpected error has occured.');
};

export {
  asyncRequest
};
