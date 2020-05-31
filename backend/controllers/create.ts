import * as uuid from 'uuid';
import handler from "../libs/lambdaHandler";
import dynamoDb from "../libs/dynamodb";

const create = async (event: EventHandler, _context: any) => {
  const data = JSON.parse(event.body);
  const params: CreatePost = {
    TableName: process.env.tableName as string,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'postId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      postId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  await dynamoDb.put(params);

  return params.Item;
}

export const main = handler(create);
