const axios = require('axios');

const random = ((request, response) => {

    if (!request.params.sub) {
        axios.get("https://reddit.com/random.json").
            then((content) => {

                let post = content.data[0]['data']['children'][0]['data'];
                return response.json({
                    "success": true,
                    "data": {
                        "subreddit": post['subreddit'],
                        "body": post['selftext'],
                        "title": post['title'],
                        "thumbnail_height": post['thumbnail_height'],
                        "thumbnail_width": post['thumbnail_width'],
                        "thumbnail": post['url_overridden_by_dest'],
                        "comments": content.data[1]['data']['children']
                    },
                    "error": {},
                    "status": 200
                });
            }).catch(() => {

            });

    } else {
        axios.get(`https://reddit.com/r/${request.params.sub}/random.json`).
            then((content) => {
                return response.json({
                    "success": true,
                    "data": {
                        "subreddit": post['subreddit'],
                        "body": post['selftext'],
                        "title": post['title'],
                        "thumbnail_height": post['thumbnail_height'],
                        "thumbnail_width": post['thumbnail_width'],
                        "thumbnail": post['url_overridden_by_dest'],
                        "comments": content.data[1]['data']['children']
                    },
                    "error": {},
                    "status": 200
                });
            }).catch(() => {

            });

    }
});

module.exports = { random };