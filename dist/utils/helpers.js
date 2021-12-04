"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBodyParams = void 0;
/**
 * Get all body params
 * @param {AWSLambda.APIGatewayEvent} event The API Gateway Event
 * @return {Object | null} Response
 */
function getBodyParams(event) {
    if (event.body) {
        return JSON.parse(event.body);
    }
    else {
        return null;
    }
}
exports.getBodyParams = getBodyParams;
