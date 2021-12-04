import hello from '../src/addUser';
const context = require('aws-lambda-mock-context');

const ctx = context();

test('hello handler', () => {
    hello({}, ctx, (error, response) => {
    expect(error).toBe(null);
    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toBe(
      'User Created!'
    );
  });
});