require('../../config.js');
const twitterAPI = require('node-twitter-api');

console.log({["process.env.twitterCallback"]: process.env.twitterCallback});

const tAPI = new twitterAPI({
    consumerKey: process.env.consumerKey,
    consumerSecret: process.env.consumerSecret,
    callback: process.env.twitterCallback
});

const promisifyTW = (func, ...args) => {
    func = func.bind(tAPI);
    return new Promise((done, error) =>
        args ? func(...args, (err, token, secret) => err ? error(err) : done({ token, secret })) :
            func((err, token, secret) => err ? error(err) : done({ token, secret }))
    );
}

const changeOfName = (promise = new Promise, param1 = "token", param2 = "secret") =>
    new Promise((done, error) => promise.then(data => done({ [param1]: data.token, [param2]: data.secret })).catch(error));

module.exports = {
    getRequestToken: () => promisifyTW(tAPI.getRequestToken),
    getAccessToken: (token, secret, verifier) => promisifyTW(tAPI.getAccessToken, token, secret, verifier),
    verifyCredentials: (token, secret) => changeOfName(promisifyTW(tAPI.verifyCredentials, token, secret), "user"),
    getTimeline: (type, params, token, secret) => changeOfName(promisifyTW(tAPI.getTimeline, type, params, token, secret),"data","response")
}