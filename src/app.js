import express, { json } from "express";
import cors from "cors"

const PORT = 5000;
const app = express();
app.use(cors())
app.use(json())
app.listen(PORT);

const tweets = [];
let tweetsRetornados = [];
const usuarios = [];

app.get("/tweets", (req, res) => {
    if (tweets.length === 0) {
        res.send([]);
    } else if (tweets.length <= 10) {
        for (let i = 0; i < tweets.length; i++) {
            const user = tweets[i].username;
            const avatar = usuarios.find(u => u.username === user).avatar;
            const tweeterRetornado = {
                username: user,
                avatar,
                tweet: tweets[i].tweet
            }
            tweetsRetornados.push(tweeterRetornado)
        }
        res.send(tweetsRetornados.reverse());
        tweetsRetornados = [];
    } else {
        for (let i = tweets.length - 10; i < tweets.length; i++) {
            const user = tweets[i].username;
            const avatar = usuarios.find(u => u.username === user).avatar;
            const tweeterRetornado = {
                username: tweets[i].username,
                avatar,
                tweet: tweets[i].tweet
            }
            tweetsRetornados.push(tweeterRetornado)
        }
        res.send(tweetsRetornados.reverse());
        tweetsRetornados = [];
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
    if (usuarios.find((u) => u.username === username) === undefined || !username) {
        res.status(401).send("UNAUTHORIZED");
        return
    }
    const novoTweet = {
        username,
        tweet
    }
    tweets.push(novoTweet);
    res.send("OK");
})
