import express, { json } from "express";
import cors from "cors"

const PORT = 5000;
const app = express();
app.use(cors())
app.use(json())
app.listen(PORT);

const tweets = [
    {
        username: "bobesponja",
        tweet: "Eu amo hambúrguer de siri!"
    }
];

const tweetsRetornados = [];

const usuarios = [
    {
        username: 'bobesponja',
        avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png"
    }
];

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

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    const novoUsuario = {
        username,
        avatar
    }
    usuarios.push(novoUsuario);
    res.send("OK");
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    if (!username) {
        res.sendStatus(401);
        return
    }
    const novoTweet = {
        username,
        tweet
    }
    tweets.push(novoTweet);
    res.send("OK");
})
