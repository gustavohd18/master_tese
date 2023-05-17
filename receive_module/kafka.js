import { Kafka } from "kafkajs";
export async function sendToKafka(text) {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['192.168.0.90:9092'],
  })
  
   const producer = kafka.producer()
  
  await producer.connect()
  await producer.send({
    topic: 'teste1',
    messages: [
      { value: text },
    ],
   })
}
