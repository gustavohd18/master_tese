package org.example;

import java.io.InputStream;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

import com.twitter.clientlib.ApiException;
import com.twitter.clientlib.api.TwitterApi;
import com.twitter.clientlib.model.StreamingTweetResponse;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;

public class StreamingTweetHandlerImpl extends StreamingTweetHandler {
    public StreamingTweetHandlerImpl(TwitterApi apiInstance) {
        super(apiInstance);
    }

    @Override
    public InputStream connectStream() throws ApiException {
        Set<String> tweetFields = new HashSet<>();
        tweetFields.add("author_id");
        tweetFields.add("id");
        tweetFields.add("created_at");
        tweetFields.add("geo");
        Set<String> expansions = new HashSet<>();
        expansions.add("geo.place_id");
        Set<String> placeFields = new HashSet<>();
        placeFields.add("geo");
        placeFields.add("id");
        placeFields.add("name");
        placeFields.add("place_type");

        return this.apiInstance.tweets().sampleStream()
                .backfillMinutes(0)
                .tweetFields(tweetFields).expansions(expansions).placeFields(placeFields)
                .execute();
    }

    @Override
    public void actionOnStreamingObject(StreamingTweetResponse streamingTweet) throws ApiException {
        if(streamingTweet == null) {
            System.err.println("Error: actionOnTweetsStream - streamingTweet is null ");
            return;
        }

        if(streamingTweet.getErrors() != null) {
            streamingTweet.getErrors().forEach(System.out::println);
        } else if (streamingTweet.getData() != null) {
            System.out.println("New streaming tweet: " + streamingTweet.getData().getText());
            Properties properties1 = new Properties();
            properties1.put("bootstrap.servers", "192.168.0.135:9094"); // Change to your Kafka broker(s)
            properties1.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
            properties1.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

            // Create a Kafka producer
            Producer<String, String> producer = new KafkaProducer<>(properties1);

            // Produce a message to a Kafka topic
            String topic = "processingDataText"; // Change to your Kafka topic
            String key = "key";

            ProducerRecord<String, String> record1 = new ProducerRecord<>(topic, key, streamingTweet.getData().getText());

            // Send the message
            producer.send(record1, (metadata, exception) -> {
                if (exception == null) {
                    System.out.println("Message sent successfully. Topic: " + metadata.topic() +
                            ", Partition: " + metadata.partition() + ", Offset: " + metadata.offset());
                } else {
                    System.err.println("Error sending message: " + exception.getMessage());
                }
            });

            // Close the producer
            producer.close();
        }
    }
}
