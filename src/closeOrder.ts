import { APIGatewayEvent, Context } from "aws-lambda";
import { successResponse, errorResponse, runWarm } from './utils';
import { Response } from './utils/lambda-response';
import { PrismaClient } from '@prisma/client';
import _ from 'underscore';


const prisma = new PrismaClient({
  log: ['query'],
})


const closeOrder = async (event: AWSLambda.APIGatewayEvent): Promise<Response> => {

  let body = null;

  if (event.body != null){
    body = JSON.parse(event.body);
  }

  let order;

  try {

    console.log(body);

    order = await prisma.order.create({
      data: body,
    })

    const user = await prisma.user.findFirst({
      where: { id : body.user_id },
    })

    console.log(order);
    console.log(user);

    let balanceUpdated = Number(user?.balance) - body.total

    await prisma.user.update({
      where: {
        id: body.userId,
      },
      data: {
        balance: balanceUpdated
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
    message: 'Order created successfully!',
    order,
  });

  return response;
};

// runWarm function handles pings from the scheduler so you don't
// have to put that boilerplate in your function.
export default runWarm(closeOrder);