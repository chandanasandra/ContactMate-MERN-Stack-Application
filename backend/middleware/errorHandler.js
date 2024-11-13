const constants = require('../constants').constants;
const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    //console.log(statusCode, constants.NOT_FOUND);
    switch (statusCode) {
        case constants.VALIDATION_FAIL:
            res.json({
                title: 'VALIDATION_FAIL',
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: 'UNAUTHORIZED',
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: 'FORBIDDEN',
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: 'NOT_FOUND',
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            res.json({
                title: 'Something Unexpected occured!',
            });
            break;
    }
}

module.exports = errorHandler;