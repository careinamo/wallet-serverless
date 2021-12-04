"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runWarm = (lambdaFunc) => (event, context, callback) => {
    // Detect the keep-alive ping from CloudWatch and exit early. This keeps our
    // lambda function running hot.
    if (event.source === 'serverless-plugin-warmup') {
        return callback(null, 'pinged');
    }
    return lambdaFunc(event, context, callback);
};
exports.default = runWarm;
