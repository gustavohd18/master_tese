package org.example;

import java.time.Duration;
import java.time.LocalTime;
import java.util.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.apache.kafka.clients.consumer.ConsumerConfig.*;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {

    public static void main(String[] args) {
        //TIP Press <shortcut actionId="ShowIntentionActions"/> with your caret at the highlighted text
        // to see how IntelliJ IDEA suggests fixing it.
        ExecutorService executorService = Executors.newSingleThreadExecutor();

        executorService.execute(() -> {
            try {
                // Seu código Kafka Consumer aqui...
                System.out.print("Hello and welcome!");

                Properties properties = new Properties();
                properties.put(BOOTSTRAP_SERVERS_CONFIG, "192.168.0.135:9094"); // servidor rodando kafka
                properties.put(GROUP_ID_CONFIG, "consumerGroup2Name");
                properties.put(KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
                properties.put(VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());

                // Create Kafka consumer
                Consumer<String, String> consumer = new KafkaConsumer<>(properties);

                // Subscribe to the Kafka topic
                consumer.subscribe(Collections.singletonList("beginPro"));

                while(true) {
                    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100)); // adjust poll duration as needed
                    records.forEach(record -> {
                        System.out.printf("Received message. Topic: %s, Partition: %d, Offset: %d, Key: %s, Value: %s%n",
                                record.topic(), record.partition(), record.offset(), record.key(), record.value());
                        // Add your business logic here to process the received message

                        String jsonString = record.value();
                        ObjectMapper objectMapper = new ObjectMapper();
                        DecodeData yourObject = null;
                        try {
                            yourObject = objectMapper.readValue(jsonString, DecodeData.class);
                            // Now 'yourObject' contains the Java representation of the JSON
                            System.out.println(yourObject.finalDataSourceType);
                            System.out.println(yourObject.finalDataTypeFile);

                            if (yourObject.finalDataSourceType.equals("YouTube")) {
                                // final String API_KEY = "AIzaSyC4q3y4zzKHOmzZGu7SHJ7kO3969MD4XuY";
                                final String API_KEY = yourObject.barChartToken;

                                // ID of the YouTube video you want to fetch comments for
                                // final String VIDEO_ID = "vl9yakt_5tc";
                                final String VIDEO_ID = yourObject.videoId;

                                // Parameters for the initial request
                                Map<String, String> params = new HashMap<>();
                                params.put("key", API_KEY);
                                params.put("part", "snippet");
                                params.put("videoId", VIDEO_ID);
                                params.put("order", "time"); // This orders comments from oldest to newest
                                params.put("textFormat", "plainText");
                                params.put("maxResults", "20"); // Get 20 comments at a time
                                // URL for the YouTube API to get comments
                                String url = "https://www.googleapis.com/youtube/v3/commentThreads";
//                        List<Map<String, Object>> jsonData = fetchComments(url, params);
                                try {
                                    boolean value = true;
                                    while (value) {
                                        URL requestUrl = new URL(url + "?" + encodeParams(params));
                                        HttpURLConnection connection = (HttpURLConnection) requestUrl.openConnection();
                                        connection.setRequestMethod("GET");

                                        try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8))) {
                                            StringBuilder response = new StringBuilder();
                                            String line;
                                            while ((line = reader.readLine()) != null) {
                                                response.append(line);
                                            }

                                            String data = response.toString();
                                            Map<String, Object> parsedData = jsonDecode(data);

                                            if (parsedData.get("items") != null) {
                                                List<Map<String, Object>> comments = (List<Map<String, Object>>) parsedData.get("items");
                                                for (Map<String, Object> comment : comments) {
                                                    // Extrai o campo "snippet" como um Map<String, Object>
                                                    Map<String, Object> snippet = (Map<String, Object>) comment.get("snippet");
                                                    // Extrai o campo "topLevelComment" como um Map<String, Object>
                                                    Map<String, Object> topLevelComment = (Map<String, Object>) snippet.get("topLevelComment");

                                                    // Extrai o campo "snippet" do "topLevelComment" como um Map<String, Object>
                                                    Map<String, Object> commentSnippet = (Map<String, Object>) topLevelComment.get("snippet");

                                                    // Extrai o valor do campo "textDisplay" do "commentSnippet"
                                                    String textDisplay = (String) commentSnippet.get("textDisplay");
                                                    System.out.println("Chegamos aqui");
                                                    System.out.println(textDisplay);
                                                    Properties properties1 = new Properties();
                                                    properties1.put("bootstrap.servers", "192.168.0.135:9094"); // Change to your Kafka broker(s)
                                                    properties1.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
                                                    properties1.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

                                                    // Create a Kafka producer
                                                    Producer<String, String> producer = new KafkaProducer<>(properties1);

                                                    // Produce a message to a Kafka topic
                                                    String topic = "processingDataText"; // Change to your Kafka topic
                                                    String key = "key";
                                                    String textToSend = textDisplay;

                                                    ProducerRecord<String, String> record1 = new ProducerRecord<>(topic, key, textToSend);

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
                                                    // aqui vai o kafka
                                                }
                                            }

                                            // Check if there are more result pages
                                            if (parsedData.get("nextPageToken") != null) {
                                                value = false;
                                                params.put("pageToken", (String) parsedData.get("nextPageToken"));
                                            } else {
                                                value = false;
                                            }

                                            // Wait for 5 seconds before making the next request
                                            Thread.sleep(5000);
                                        }
                                    }
                                } catch (Exception e) {
                                    System.out.println("Error fetching comments: " + e.getMessage());
                                }
                            }
                        } catch (JsonProcessingException e) {
                            throw new RuntimeException(e);
                        }
                    });
                }
                // Substitua o loop 'do-while' por um loop que verifica uma condição de parada,
                // por exemplo, uma variável booleana que pode ser definida em algum ponto para false.
//
//                boolean shouldContinue = true;
//                while (shouldContinue) {
//                    // Seu código Kafka Consumer aqui...
//
//                    // Aguarde um período antes de fazer a próxima iteração
//                    Thread.sleep(5000); // 5 segundos
//                }

            } finally {
                // Encerre o ExecutorService quando não precisar mais dele
                executorService.shutdown();
            }
        });

        // Aguarde até que todas as tarefas do ExecutorService sejam concluídas ou o tempo limite seja atingido
        try {
            executorService.awaitTermination(1, TimeUnit.HOURS);
        } catch (InterruptedException e) {
            System.err.println("Thread principal interrompida: " + e.getMessage());
        }
}

    private static String encodeParams(Map<String, String> params) {
        return params.entrySet().stream()
                .map(e -> e.getKey() + "=" + URLEncoder.encode(e.getValue(), StandardCharsets.UTF_8))
                .reduce((p1, p2) -> p1 + "&" + p2)
                .orElse("");
    }

    private static Map<String, Object> jsonDecode(String data) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(data, Map.class);
        } catch (Exception e) {
            System.out.println("Error decoding JSON: " + e.getMessage());
            return null;
        }
    }
}