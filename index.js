import express from "express";
import mongoose from "mongoose";
import Redis from "ioredis";

const app = express();
app.use(express.json())

const redis = new Redis("redis://localhost:6379")

const BANNER_KEY = "app:banner"

const otpKey = phone => 'otp:' + phone

app.get('/redis', async (req, res) => {
    const _ = await redis.ping()
    res.send(_)
})

app.get('/mongo', async (req, res) => {
    if (mongoose.connection.readyState === 0) await mongoose.connect("mongodb://localhost:27017/redis")
    res.send(mongoose.connection.name)
})

app.post('/banner', async (req, res) => {
    await redis.set(BANNER_KEY, req.body.msg || 'Welcome to our website!')
    res.json({ success: true, })
})

app.get('/banner', async (req, res) => {
    const msg = await redis.get(BANNER_KEY)
    res.json({ msg })
})

app.delete('/banner', async (req, res) => {
    await redis.del(BANNER_KEY)
    res.json({ success: true })
})

app.get('/banner/exists', async (req, res) => {
    const exists = await redis.exists(BANNER_KEY)
    res.json({ exists: Boolean(exists) })
})

app.post('/otp', async (req, res) => {
    const { phone } = req.body
    const otp = Math.floor(100000 + Math.floor() * 900000).toString()
    await redis.set(otpKey(phone), otp, "EX", 30)
    res.json({ success: true })
})

app.get('/otp/:phone/ttl', async (req, res) => {
    const ttl = await redis.ttl(otpKey(req.params.phone))
    res.json({ ttl })
})

app.listen(6969)