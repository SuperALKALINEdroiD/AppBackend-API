const axios = require('axios');

const random = ((request, response) => {

    if (!request.params.sub) {
        axios.get("https://reddit.com/random.json").
        then((content) => {
            return response.json(content.data);
        }).catch(() => {

        });

    } else {
        axios.get(`https://reddit.com/r/${request.params.sub}/random.json`).
        then((content) => {
            return response.json(content.data);
        }).catch(() => {

        });
        
    }
});

module.exports = { random };