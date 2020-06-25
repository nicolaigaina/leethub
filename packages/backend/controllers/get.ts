import handler from '../libs/lambdaHandler';
import dynamoDb from '../libs/dynamodb';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

const getPost = async (event: EventHandler, _context: any) => {
  const params: DocumentClient.GetItemInput = {
    TableName: process.env.tableName as string,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'postId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      postId: event.pathParameters.id
    }
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error('Item not found');
  }

  //Return the retrieved item
  return result.Item;
}

export const main = handler(getPost);
