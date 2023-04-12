const Log = require("../models/Log");
const fs = require('fs');

const logger = ((request, response, next) => {

    const log = {
        path: request.originalUrl,
        content: {
            body: request.body,
            headers: request.headers,
            ip: request.ip,
            method: request.method,
            parameters: request.params.name,
            protocol: request.protocol,
            xhr: request.xhr,
            host: request.hostname,

        },
        Date: new Date().toString(),
    };

    let requestLog = new Log(log);

    requestLog.save()
        .then((success) => {
            // logs saved
        }).catch((error) => {
            // backup logs to local file in case of any error

            fs.writeFile(`BackupLogs/${new Date().toISOString()}`, JSON.stringify(log), (err) => {
                if (err) throw err;
            });
        });

    next();
});

module.exports = logger;