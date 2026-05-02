import { kafka } from "./client.js"

async function init() {
    const admin = kafka.admin()
    console.log("admin connecting....")
    admin.connect()
    console.log("admin connection successful...")

    console.log("creating topics [rider-updated]...")
    const result = await admin.createTopics({
            topics: [{ topic: "rider-updated", numPartitions: 2 }],
            waitForLeaders: true
        });
    console.log("topic created [rider-updated]...", result)

    console.log("Disconnecting admin...")
    await admin.disconnect()
}

init()