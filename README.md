# Kafka Producer-Consumer

A Node.js implementation of Apache Kafka producer and consumer using **KafkaJS**, a JavaScript client library for Apache Kafka.

## Overview

This project demonstrates a real-time messaging system using Apache Kafka. It includes:
- **Producer**: Sends rider location updates to a Kafka topic
- **Consumer**: Receives and processes messages from the Kafka topic
- **Admin**: Creates and manages Kafka topics

The system is designed to handle location updates for riders, partitioning messages based on geographic location (North/South).

## Features

- 📤 **Producer**: Interactive command-line producer that publishes rider location updates
- 📥 **Consumer**: Multiple consumer groups can subscribe to the same topic with different group IDs
- ⚙️ **Admin**: Topic management and creation
- 🔄 **Partitioning**: Messages are partitioned based on rider location (North → partition 0, South → partition 1)
- 🎯 **Consumer Groups**: Support for multiple consumer groups processing the same messages

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Apache Kafka** broker running (locally or remote)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/pradyumna106-ship-it/kafka-producer-consumer.git
cd kafka-producer-consumer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Project Structure

```
├── admin.js          # Topic creation and management
├── client.js         # Kafka client initialization
├── producer.js       # Producer implementation
├── consumer.js       # Consumer implementation
├── package.json      # Project dependencies
└── README.md         # Documentation
```

## Usage

### Step 1: Create Kafka Topic

Before running the producer and consumer, create the required topic using the admin script:

```bash
node admin.js
```

This will create a topic named `rider-updated` with 2 partitions.

**Output:**
```
admin connecting....
admin connection successful...
creating topics [rider-updated]...
topic created [rider-updated]... { topic: 'rider-updated', ... }
Disconnecting admin...
```

### Step 2: Start Consumer(s)

Run the consumer with a consumer group ID. You can run multiple consumers with different group IDs:

```bash
node consumer.js <group-id>
```

**Example:**
```bash
node consumer.js group1
```

The consumer will listen for messages on the `rider-updated` topic and display them in real-time.

**Output:**
```
group1: [rider-updated]: PART:0 = {"name":"john","loc":"north"}
group1: [rider-updated]: PART:1 = {"name":"jane","loc":"south"}
```

### Step 3: Run Producer

In another terminal, start the producer:

```bash
node producer.js
```

The producer will display a prompt where you can input rider updates:

```
producer connecting...
producer connected successfully...
$
```

**Input Format:** `<rider-name> <location>`

**Example commands:**
```
$ john north
$ jane south
$ alice north
$ bob south
```

Messages will be partitioned automatically:
- **North** locations → Partition 0
- **South** locations → Partition 1

## Message Flow

1. **Producer** sends a message:
   ```javascript
   {
     partition: location === 'north' ? 0 : 1,
     key: "location-update",
     value: { name: "john", loc: "north" }
   }
   ```

2. **Kafka** routes the message to the appropriate partition based on location

3. **Consumer** receives and displays:
   ```
   group1: [rider-updated]: PART:0 = {"name":"john","loc":"north"}
   ```

## Running Multiple Consumers

You can run multiple consumers with different group IDs to demonstrate consumer groups:

**Terminal 1:**
```bash
node consumer.js group1
```

**Terminal 2:**
```bash
node consumer.js group2
```

Each consumer group will receive all messages independently, starting from the beginning (due to `fromBeginning: true`).

## Configuration

To connect to a different Kafka broker, modify the `client.js` file:

```javascript
brokers: ['your-broker:9092']
```

## Technologies Used

- **[KafkaJS](https://kafka.js.org/)** - Apache Kafka client for JavaScript
- **Node.js** - JavaScript runtime
- **readline** - Interactive command-line interface

## Dependencies

```json
{
  "kafkajs": "^2.2.4"
}
```

## Troubleshooting

### Connection Issues
- Ensure Kafka broker is running and accessible
- Verify broker address in `client.js`
- Check firewall settings

### Topic Creation Fails
- Topic might already exist
- Check Kafka broker logs for errors
- Ensure admin user has permission to create topics

### Consumer Not Receiving Messages
- Verify topic was created successfully
- Ensure producer is sending messages to the same topic
- Check consumer group ID is correct

## Learning Resources

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [KafkaJS Documentation](https://kafka.js.org/)
- [Kafka Concepts](https://kafka.apache.org/intro)

## License

MIT

## Author

[@pradyumna106-ship-it](https://github.com/pradyumna106-ship-it)
