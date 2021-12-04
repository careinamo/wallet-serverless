/**
 * Get all body params
 * @param {AWSLambda.APIGatewayEvent} event The API Gateway Event
 * @return {Object | null} Response
 */
 export function getBodyParams(event: AWSLambda.APIGatewayEvent): {[key: string]: string | string[]} | null {
    if (event.body) {
      return JSON.parse(event.body);
    } else {
      return null;
    }
  }