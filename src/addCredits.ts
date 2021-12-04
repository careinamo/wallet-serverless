import { APIGatewayEvent, Context } from "aws-lambda";
import { successResponse, errorResponse, runWarm } from './utils';
import { Response } from './utils/lambda-response';
import { PrismaClient } from '@prisma/client';
import _ from 'underscore';


const prisma = new PrismaClient({
  log: ['query'],
})


const addCredits = async (event: AWSLambda.APIGatewayEvent): Promise<Response> => {

  let body = null;

  if (event.body != null){
    body = JSON.parse(event.body);
  }

  let credits;

  try {

    credits = await prisma.credit.create({
      data: {
        userId: body.user_id,
        total: body.total,
      },
    })


    const user = await prisma.user.findFirst({
      where: { id : body.user_id },
    })

    let balanceUpdated = Number(user?.balance) + body.total

    await prisma.user.update({
      where: {
        id: body.user_id,
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

  const response = successResponse({
    message: 'Add credits successfully!',
    credits,
  });

  return response;
};

export default runWarm(addCredits);