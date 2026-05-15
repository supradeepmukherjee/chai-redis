import express from "express";
import mongoose from "mongoose";
import Redis from "ioredis";

const app = express();

const redis = new Redis("redis://localhost:6379")

app.get('/redis', async (req, res) => {
    const _ = await redis.ping()
    res.send(_)
})

app.get('/mongo', async (req, res) => {
    if (mongoose.connection.readyState === 0) await mongoose.connect("mongodb://localhost:27017/redis")
    res.send(mongoose.connection.name)
})

app.listen(6969)