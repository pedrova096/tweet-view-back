process.env.PORT = process.env.PORT || 3100;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/twitter-user';
} else {
    process.env.URL_DB = process.env.MONGO_URI;
}

process.env.consumerKey = process.env.consumerKey || 'QwkDLqGCLxcXQyzOWxPMA0HRe';
process.env.consumerSecret = process.env.consumerSecret || 'yqOeCChlLRl7IGzBdWqxc6vXcBNInrTlCdXAENUdvUQ3Gj3Ja0';
process.env.twitterCallback = process.env.twitterCallback || 'http://localhost:3000/tweet-login';