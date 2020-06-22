interface GenericError extends Error {
  message: string;
}

const onError = (error: GenericError) => {
  let message = error.toString();
  // Auth errors
  if (!(error instanceof Error) && (error as GenericError).message) {
    message = (error as GenericError).message;
  }
  // TODO: fix by adding toast notifications
  // eslint-disable-next-line
  alert(message);
};

export default onError;
