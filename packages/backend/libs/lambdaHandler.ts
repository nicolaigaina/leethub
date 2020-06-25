/**
 * Handler function used as a wrapper for our Lambda functions.
 * @param - lambda function
 */
const handler = (lambda: Lambda) => {
  return async (event: EventHandler, context: any) => {
    let result;
    try {
      // uses the 'Promise.resolve()' pattern here because our Lambda
      // functions could return a Promise (be asyncronous) or not. This lets
      // us handle both cases.
      await Promise.resolve();
      const responseBody = await lambda(event, context);
      result = [200, responseBody];
    }
    catch (e) {
      console.error(e);
      result = [500, { error: e.message }];
    }
    const [statusCode, body] = result;
    return ({
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(body),
    });
  };
}

export default handler
