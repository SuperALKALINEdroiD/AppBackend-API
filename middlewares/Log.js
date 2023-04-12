const Log = require("../models/Log");

const logger = ((request, response, next) => {

    let requestLog = new Log({
        path: request.protocol + '://' + request.get('host') + request.originalUrl,
        content: '',
        Date: new Date().toString(),
    });

    requestLog.save()
        .then((success) => {

        }).catch((error) => {

        });

    next();
});

module.exports = logger;