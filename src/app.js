import express from "express";

const PORT = 5000;
const app = express();
app.listen(PORT);

const tweets = [];

const tweetsRetornados = [];

app.get("/tweets", (req, res) => {

    if (tweets.length === 0) {
        res.send([]);
    } else if (tweets.length <= 10) {
        res.send(tweets);
    } else {
        for (let i = tweets.length - 1; tweetsRetornados.length <= 10; i--) {
            tweetsRetornados.push(tweets[i]);
        }
        res.send(tweetsRetornados);
    }
})
