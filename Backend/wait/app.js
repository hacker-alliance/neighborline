const VoiceResponse = require('twilio').twiml.VoiceResponse;

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    const twiml = new VoiceResponse();

    twiml.play('http://demo.twilio.com/docs/classic.mp3');
    twiml.say({ voice: 'alice' }, 'Thank you for waiting. We\'ll be pairing you with a friend shortly.');
    twiml.redirect();

    try {
        response = {
            'statusCode': 200,
            'headers': { "content-type": "text/xml" },
            'body': twiml.toString()
        }
    } catch (err) {
        console.log(err);
        return err;
    }
    return response
};