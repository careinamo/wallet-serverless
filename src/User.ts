import { APIGatewayEvent, Context } from "aws-lambda";
import { successResponse, errorResponse, runWarm } from './utils';
import { Response } from './utils/lambda-response';
import { PrismaClient } from '@prisma/client';
import _ from 'underscore';


const prisma = new PrismaClient({
  log: ['query'],
})


const storeUser = async (event: AWSLambda.APIGatewayEvent): Promise<Response> => {

  let body = null;

  if (event.body != null){
    body = JSON.parse(event.body);
  }
  let insert;

  try {
    insert = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        balance: 0
      }
    })  
  } catch (e) {
      console.error(`Cannot create user information. Cause: ${e.message}`);
      return errorResponse({
        message: e.message,
      });
  }

  // successResponse handles wrapping the response in an API Gateway friendly
  // format (see other responses, including CORS, in `./utils/lambda-response.ts)
  const response = successResponse({
    message: 'Go Serverless! Your function executed successfully!',
    insert,
  });

  return response;
};

// runWarm function handles pings from the scheduler so you don't
// have to put that boilerplate in your function.
export default runWarm(storeUser);