import Redis from "ioredis";

const subscriber = new Redis("redis://localhost:6379")

subscriber.subscribe('notifications', err => {
    if (err) return console.error('Failed to subscribe', err);
    console.log('Subscribed successfully')
})

subscriber.on('message', (channel, msg) => {
    console.log(`Received on ${channel}: ${JSON.parse(msg)}`)
})