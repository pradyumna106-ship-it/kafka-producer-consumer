import { kafka } from "./client.js"

const group = process.argv[2];
async function init() {
    const consumer = kafka.consumer({ groupId: group})

    await consumer.connect()
    await consumer.subscribe({ topic: 'rider-updated', fromBeginning: true})

    const response = await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`${group}: [${topic}]: PART:${partition} = ${message.value.toString()}`)
        },
    }).finally(async () => {
        console.log("consumer diconnecting....")
        await consumer.disconnect()
        console.log("consumer disconnected successfully..")
    })

}
init()
