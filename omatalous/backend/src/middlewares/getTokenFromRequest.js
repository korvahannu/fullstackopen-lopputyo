// This middleware simply takes the token of a request and sets request.token to it
/* example of header

authorization: {
    bearer ko4vk345ok345vko3453vp4o5op543vok
}

*/

const getTokenFromRequest = (request, response, next) => {

    console.log(request.body);
    const authorization = request.get('authorization');
    console.log('authorization is ' + authorization);

    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    }

    next();
};

module.exports = getTokenFromRequest;