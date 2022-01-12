// using next(error) at routers we can centralize all error handling to this middleware
// Just follow the code to see how it is done

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' , message: error.message});
  }
  else if (error.name === 'ValidationError')
  {
    return response.status(400).json({ error: error.message });
  }
  else if (error.name === 'JsonWebTokenError')
  {
    return response.status(401).json({error: 'invalid token'});
  }
  else if (error.name === 'TokenExpiredError')
  {
    return response.status(401).json({error: 'token expired'});
  }

  next(error);  // If there are any errors we have not handled, pass them to the default error handler
};

module.exports = errorHandler;