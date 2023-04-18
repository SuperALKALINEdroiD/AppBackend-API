const axios = require('axios');

const random = ((request, response) => {
    axios.get("https://reddit.com/r/starwars/random.json").
        then((content) => {
            return response.json(content.data);
        }).catch(() => {

        });
});

module.exports = { random };