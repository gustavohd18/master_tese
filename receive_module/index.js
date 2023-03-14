import{sendToKafka} from './kafka.js'

export async function sendStream(text) {
  sendToKafka(text)
  console.log(text)

} 
