import { Worker } from "bullmq";
import { connection } from "./queue";

const worker = new Worker(
    'emails',
    async job => {
        console.log('Processing email job', job.id, job.name, job.data)
        console.log('Email job completed...', job.id, job.name, job.data)
    },
    { connection }
)

worker.on('completed', job => {
    console.log('Job completed', job.id, job.name, job.data)
})

worker.on('failed', (job, err) => {
    console.log('Job failed...', job.id, job.name, job.data, err)
})