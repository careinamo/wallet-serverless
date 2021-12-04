"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ['query'],
});
const storeUser = async (event) => {
    console.log("tumadre");
    const insert = await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@prisma.io',
            balance: 120000.00
        }
    });
    // successResponse handles wrapping the response in an API Gateway friendly
    // format (see other responses, including CORS, in `./utils/lambda-response.ts)
    const response = (0, utils_1.successResponse)({
        message: 'Go Serverless! Your function executed successfully!',
        input: event,
    });
    return response;
};
// runWarm function handles pings from the scheduler so you don't
// have to put that boilerplate in your function.
exports.default = (0, utils_1.runWarm)(hello);
