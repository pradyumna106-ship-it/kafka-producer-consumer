import { kafka } from "./client.js"
import { Partitioners } from "kafkajs" 
import * as readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
async function init() {
    const producer = kafka.producer({
        createPartitioner: Partitioners.LegacyPartitioner,
    });
    console.log("producer connecting...")
    await producer.connect()
    console.log("producer connected successfully...")
    rl.setPrompt('$ ')
    rl.prompt();

    rl.on('line', async function(line) {
        const [riderName, location] = line.split(' ')
        await producer.send({
            topic: 'rider-updated',
            messages: [
                {
                    partition: location.toLowerCase() === 'north' ? 0:1,
                    key: "location-update", 
                    value: JSON.stringify({ name:riderName, loc:location }) 
                },
            ],
        })
    }).on('close', async () => {
        console.log("producer diconnecting......");
        await producer.disconnect()
        console.log("producer disconnect....")
    })
}
init()