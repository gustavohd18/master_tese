package org.example;

import java.time.Duration;
import java.time.LocalTime;
import java.util.*;

import com.mongodb.client.*;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.UpdateOptions;
import org.bson.Document;
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

public class Main {
    public static class MyObject {
        private String text;
        private int value;

        public MyObject(String text, Integer value) {
            this.text = text;
            this.value = value;
        }

        // Getter methods

        public String getText() {
            return text;
        }

        public Integer getValue() {
            return value;
        }

        public static class MongoDBConnector {
            private final MongoClient mongoClient;
            private final MongoDatabase database;

            public MongoDBConnector(String connectionString, String databaseName) {
                this.mongoClient = MongoClients.create(connectionString);
                this.database = mongoClient.getDatabase(databaseName);
            }

            public void queryAndPrintValues(String collectionName) {
                MongoCollection<Document> collection = database.getCollection(collectionName);

                // Find all documents in the collection
                FindIterable<Document> documents = collection.find();

                // Iterate over the documents and print the values
                try (MongoCursor<Document> cursor = documents.iterator()) {
                    while (cursor.hasNext()) {
                        Document document = cursor.next();
                        String text = document.getString("text");
                        Integer value = document.getInteger("value");
                        int intValue = (value != null) ? value.intValue() : 0; // Set a default value if "value" is null

                        System.out.println("Text: " + text + ", Value: " + value);
                    }
                }
            }

            public void insertMyObject(MyObject myObject, String collectionName) {
                MongoCollection<Document> collection = database.getCollection(collectionName);

                // Convert MyObject to a Document
                Document document = new Document()
                        .append("text", myObject.getText())
                        .append("value", myObject.getValue());

                // Insert the Document into the collection
                collection.replaceOne(Filters.eq("text", myObject.getText()), document);

//                collection.insertOne(document);
            }

            public void close() {
                mongoClient.close();
            }
        }

        public static void main(String[] args) {
            ExecutorService executorService = Executors.newSingleThreadExecutor();
            ExecutorService executorService2 = Executors.newSingleThreadExecutor();
            ExecutorService executorService3 = Executors.newSingleThreadExecutor();

            executorService3.execute(() -> {
                try {
                    // Seu código Kafka Consumer aqui...
                    System.out.print("Hello and welcome executer line count !");

                    Properties properties = new Properties();
                    properties.put(BOOTSTRAP_SERVERS_CONFIG, "localhost:9094"); // servidor rodando kafka
                    properties.put(GROUP_ID_CONFIG, "consumerGroup2Name");
                    properties.put(KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
                    properties.put(VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());

                    // Create Kafka consumer
                    Consumer<String, String> consumer = new KafkaConsumer<>(properties);

                    // Subscribe to the Kafka topic
                    consumer.subscribe(Collections.singletonList("sendTotalItemsProcessed"));

                    while (true) {
                        ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100)); // adjust poll duration as needed
                        records.forEach(record -> {
                            System.out.printf("Received message. Topic: %s, Partition: %d, Offset: %d, Key: %s, Value: %s%n",
                                    record.topic(), record.partition(), record.offset(), record.key(), record.value());
                            // Add your business logic here to process the received message

                            String jsonString = record.value();
                            ObjectMapper objectMapper = new ObjectMapper();
//                        DecodeData yourObject = null;
                            // Remove parentheses and split the string by comma
                            String[] parts = jsonString.replaceAll("[()]", "").split(",");

                            // Extract text and value from the parts
                            String text = parts[0];
                            int value = Integer.parseInt(parts[1]);
                            MyObject myObject = new MyObject(text, value);
//                            System.out.println("Text: " + myObject.text + ", Value: " + myObject.value);
//
//                            System.out.print("   ");

                            String connectionString = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
                            String databaseName = "mongo_dart-blog"; // Replace with your MongoDB database name

                            // Create MongoDBConnector
                            MongoDBConnector connector = new MongoDBConnector(connectionString, databaseName);

                            // Create a sample MyObject

                            // Specify the collection name
                            String collectionName = "sendTotalItemsProcessed"; // Replace with your MongoDB collection name

                            // Insert MyObject into MongoDB
                            connector.insertMyObject(myObject, collectionName);

                            connector.queryAndPrintValues(collectionName);

                            // Close the MongoDB connection when done
                            connector.close();
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

            executorService2.execute(() -> {
                try {
                    // Seu código Kafka Consumer aqui...
                    System.out.print("Hello and welcome executer 2 !");

                    Properties properties = new Properties();
                    properties.put(BOOTSTRAP_SERVERS_CONFIG, "localhost:9094"); // servidor rodando kafka
                    properties.put(GROUP_ID_CONFIG, "consumerGroup2Name");
                    properties.put(KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
                    properties.put(VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());

                    // Create Kafka consumer
                    Consumer<String, String> consumer = new KafkaConsumer<>(properties);

                    // Subscribe to the Kafka topic
                   consumer.subscribe(Collections.singletonList("sendWordCountProcessed"));



                    while (true) {
                        ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100)); // adjust poll duration as needed
                        records.forEach(record -> {
                            System.out.printf("Received message. Topic: %s, Partition: %d, Offset: %d, Key: %s, Value: %s%n",
                                    record.topic(), record.partition(), record.offset(), record.key(), record.value());
                            // Add your business logic here to process the received message

                            String jsonString = record.value();
                            ObjectMapper objectMapper = new ObjectMapper();
//                        DecodeData yourObject = null;
                            // Remove parentheses and split the string by comma
                            String[] parts = jsonString.replaceAll("[()]", "").split(",");

                            // Extract text and value from the parts
                            String text = parts[0];
                            int value = Integer.parseInt(parts[1]);
                            MyObject myObject = new MyObject(text, value);
//                            System.out.println("Text: " + myObject.text + ", Value: " + myObject.value);
//
//                            System.out.print("   ");

                            String connectionString = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
                            String databaseName = "mongo_dart-blog"; // Replace with your MongoDB database name

                            // Create MongoDBConnector
                            MongoDBConnector connector = new MongoDBConnector(connectionString, databaseName);

                            // Create a sample MyObject

                            // Specify the collection name
                            String collectionName = "sendWordCountProcessed"; // Replace with your MongoDB collection name

                            // Insert MyObject into MongoDB
                            connector.insertMyObject(myObject, collectionName);

                            connector.queryAndPrintValues(collectionName);

                            // Close the MongoDB connection when done
                            connector.close();
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

            executorService.execute(() -> {
                try {
                    // Seu código Kafka Consumer aqui...
                    System.out.print("Hello and welcome executer 1 named entity !");

                    Properties properties = new Properties();
                    properties.put(BOOTSTRAP_SERVERS_CONFIG, "192.168.0.135:9094"); // servidor rodando kafka
                    properties.put(GROUP_ID_CONFIG, "consumerGroup5Name");
                    properties.put(KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
                    properties.put(VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());

                    // Create Kafka consumer
                    Consumer<String, String> consumer = new KafkaConsumer<>(properties);

                    // Subscribe to the Kafka topic
                    consumer.subscribe(Collections.singletonList("sendNamedEntityProcessed"));

                    while (true) {
                        ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100)); // adjust poll duration as needed
                        records.forEach(record -> {
                            System.out.printf("Received message. Topic: %s, Partition: %d, Offset: %d, Key: %s, Value: %s%n",
                                    record.topic(), record.partition(), record.offset(), record.key(), record.value());
                            // Add your business logic here to process the received message

                            String jsonString = record.value();
                            ObjectMapper objectMapper = new ObjectMapper();
//                        DecodeData yourObject = null;
                            // Remove parentheses and split the string by comma
                            String[] parts = jsonString.replaceAll("[()]", "").split(",");

                            // Extract text and value from the parts
                            String text = parts[0];
                            int value = Integer.parseInt(parts[1]);
                            MyObject myObject = new MyObject(text, value);
//                            System.out.print(myObject.text);
//                            System.out.print(myObject.value);
//                            System.out.print("   ");
                            String connectionString = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
                            String databaseName = "mongo_dart-blog"; // Replace with your MongoDB database name

                            // Create MongoDBConnector
                            MongoDBConnector connector = new MongoDBConnector(connectionString, databaseName);

                            // Create a sample MyObject

                            // Specify the collection name
                            String collectionName = "sendNamedEntityProcessed"; // Replace with your MongoDB collection name

                            // Insert MyObject into MongoDB
                            connector.insertMyObject(myObject, collectionName);

                            connector.queryAndPrintValues(collectionName);

                            // Close the MongoDB connection when done
                            connector.close();
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
    }
}