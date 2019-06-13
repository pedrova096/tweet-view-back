require('../../config.js');
const twitterAPI = require('node-twitter-api');
const tAPI = new twitterAPI({
    consumerKey: process.env.consumerKey,
    consumerSecret: process.env.consumerSecret,
    callback: process.env.twitterCallback
});
let _promisifyTW = (f, ...args) => {
    f = f.bind(tAPI);
    return new Promise((done, error) =>
        args ? f(...args, (err, token, secret) => err ? error(err) : done({ token, secret })) :
        f((err, token, secret) => err ? error(err) : done({ token, secret }))
    );
}
module.exports = {
    getRequestToken: () =>
        _promisifyTW(tAPI.getRequestToken),
    getAccessToken: (token, secret, verifier) =>
        _promisifyTW(tAPI.getAccessToken, token, secret, verifier),
    verifyCredentials: (token, secret) =>
        _promisifyTW(tAPI.verifyCredentials, token, secret),
    //User as Token, Response as Secret 
    getTimeline: (type, params, token, secret) =>
        _promisifyTW(tAPI.getTimeline, type, params, token, secret),
    //Data as Token, Response as Secret 

}