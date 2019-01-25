const Session = require('../models/session');

const express = require('express');
const app = express();

const { getRequestToken, getAccessToken, verifyCredentials, getTimeline } = require("../util/tweet-api");

app.get('/twitter-login', async(req, res) => {
    try {

        let { token, secret } = await getRequestToken();

        let session = await Session.create({
            secret,
            token,
            user: null,
            endsAt: null
        });

        return res.json({
            ok: true,
            URLToken: `https://twitter.com/oauth/authenticate?oauth_token=${token}`,
            userToken: session._id
        });

    } catch (error) {
        console.log({ error });
        res.status(500).json({ error });
    }
});

app.post('/twitter-user', async(req, res) => {
    try {
        let { oauth_token, oauth_verifier, userToken } = req.body;

        if (!(oauth_token && oauth_verifier && userToken)) {
            return res.status(400).json({
                error: {
                    message: "Faltan parametros requeridos para obtener el usuario"
                }
            });
        }
        let session = await Session.findById(userToken);
        let { token, secret } = await getAccessToken(oauth_token, session.secret, oauth_verifier);
        let { token: user } = await verifyCredentials(token, secret);
        session = await Session.findByIdAndUpdate(userToken, { user: user.id_str, token, secret });

        res.status(200).json({
            ok: true,
            user,
            userToken
        });

    } catch (error) {
        console.log({ error });
        res.status(500).json({ error });
    }
});

app.post('/user-tweets', async(req, res) => {
    try {
        let { userToken } = req.body;

        if (!userToken) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "No se ha recibido ningún token valido."
                }
            });
        }

        let session = await Session.findById(userToken);
        let { token: data } = await getTimeline("user_timeline", {
            user_id: session.user,
            count: 100
        }, session.token, session.secret);

        return res.json({
            ok: true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
});

module.exports = app;