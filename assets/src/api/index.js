//const remoteUrl = 'http://ec2-18-218-105-143.us-east-2.compute.amazonaws.com:1337';
const remoteUrl = 'http://localhost:1337';
const defaultContentType = 'application/json';
const downloadPath = 'api/photo/download';

// Async request middleware
const asyncRequest = async (payload) => {
  const {
    path,
    method,
    body,
    cType
  } = payload;

  // Set request headers
  const contentType = cType || defaultContentType;
  const headers = {
    'Content-Type': `${ contentType }`
  };

  // Fetch data from API
  var response = await fetch(`${ remoteUrl }/${ path }`, {
    method,
    headers: contentType === defaultContentType ? headers : undefined,
    body: contentType === defaultContentType ? JSON.stringify(body) : body,
  });

  // Parse results according to response content-type
  if (response.status === 200) {
    const responseBody = path.includes(downloadPath) ?
      await response.blob() : response.json();

    return responseBody;
  }

  // Parse error
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
