"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ['query'],
});
const addCredits = async (event) => {
    let body = null;
    if (event.body != null) {
        body = JSON.parse(event.body);
    }
    let credits;
    try {
        credits = await prisma.credit.create({
            data: {
                userId: body.user_id,
                total: body.total,
            },
        });
        const user = await prisma.user.findFirst({
            where: { id: body.user_id },
        });
        let balanceUpdated = Number(user === null || user === void 0 ? void 0 : user.balance) + body.total;
        await prisma.user.update({
            where: {
                id: body.user_id,
            },
            data: {
                balance: balanceUpdated
            }
        });
    }
    catch (e) {
        console.error(`Cannot create user information. Cause: ${e.message}`);
        return (0, utils_1.errorResponse)({
            message: e.message,
        });
    }
    const response = (0, utils_1.successResponse)({
        message: 'Add credits successfully!',
        credits,
    });
    return response;
};
exports.default = (0, utils_1.runWarm)(addCredits);
