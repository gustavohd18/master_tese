// import { Kafka } from "kafkajs";

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['192.168.0.46:9092'],
// })

// const consumer = kafka.consumer({ groupId: 'test-group' })
// //este consumir vem de outro computador com o topico teste2 criados
// await consumer.connect()
// await consumer.subscribe({ topic: 'teste2', fromBeginning: true })

// await consumer.run({
//   eachMessage: async ({ topic, partition, message }) => {
//     console.log({
//       value: message.value.toString(),
//     })
//   },
// })
