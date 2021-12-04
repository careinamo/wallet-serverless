"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ['query'],
});
const storeUser = async (event) => {
    let body = null;
    if (event.body != null) {
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
        });
    }
    catch (e) {
        console.error(`Cannot create user information. Cause: ${e.message}`);
        return (0, utils_1.errorResponse)({
            message: e.message,
        });
    }
    // successResponse handles wrapping the response in an API Gateway friendly
    // format (see other responses, including CORS, in `./utils/lambda-response.ts)
    const response = (0, utils_1.successResponse)({
        message: 'Go Serverless! Your function executed successfully!',
        insert,
    });
    return response;
};
// runWarm function handles pings from the scheduler so you don't
// have to put that boilerplate in your function.
exports.default = (0, utils_1.runWarm)(storeUser);
