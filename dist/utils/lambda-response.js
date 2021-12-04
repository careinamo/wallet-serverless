"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsSuccessResponse = exports.successResponse = exports.corsErrorResponse = exports.errorResponse = void 0;
function lambdaResponse({ json, statusCode, allowCORS = false, }) {
    const response = {
        statusCode,
        body: JSON.stringify(json),
    };
    if (allowCORS) {
        response.headers = {
            'Access-Control-Allow-Origin': '*',
        };
    }
    return response;
}
function errorResponse(json) {
    return lambdaResponse({
        json,
        statusCode: 500,
    });
}
exports.errorResponse = errorResponse;
function corsErrorResponse(json) {
    return lambdaResponse({
        json,
        statusCode: 500,
        allowCORS: true,
    });
}
exports.corsErrorResponse = corsErrorResponse;
function successResponse(json) {
    return lambdaResponse({
        json,
        statusCode: 200,
    });
}
exports.successResponse = successResponse;
function corsSuccessResponse(json) {
    return lambdaResponse({
        json,
        statusCode: 200,
        allowCORS: true,
    });
}
exports.corsSuccessResponse = corsSuccessResponse;
