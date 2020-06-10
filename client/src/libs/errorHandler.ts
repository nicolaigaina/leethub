interface GenericError extends Error {
  message: string;
}

export function onError(error: GenericError) {
  let message = error.toString();
  // Auth errors
  if (!(error instanceof Error) && (error as GenericError).message) {
    message = (error as GenericError).message;
  }
  alert(message);
}
