import{sendToKafka} from './kafka.js'

export async function sendStream(obj) {
  sendToKafka(obj)
  console.log(obj)

} 
