package org.example;

import java.io.IOException;
import java.net.*;
import java.net.http.HttpClient;
import java.net.http.HttpHeaders;
import java.net.http.HttpRequest;
import java.time.Duration;
import java.time.LocalTime;
import java.util.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpHeaders;
import java.util.Map;
import java.util.HashMap;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twitter.clientlib.ApiException;
import com.twitter.clientlib.TwitterCredentialsBearer;
import com.twitter.clientlib.api.TwitterApi;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.impl.client.CloseableHttpClient;
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
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import org.apache.http.HttpEntity;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.HttpClients;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import com.fasterxml.jackson.databind.ObjectMapper;
import twitter4j.v1.FilterQuery;
import twitter4j.v1.Status;
import twitter4j.v1.StatusListener;
import twitter4j.v1.TwitterStream;

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
                properties.put(BOOTSTRAP_SERVERS_CONFIG, "localhost:9094"); // servidor rodando kafka
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
                            if(yourObject.finalDataSourceType.equals("File")) {
                                Thread.sleep(10000);

                                System.out.println("Chegamos no texto para ver");
                                Properties properties1 = new Properties();
                                properties1.put("bootstrap.servers", "localhost:9094"); // Change to your Kafka broker(s)
                                properties1.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
                                properties1.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
                                List<Map.Entry<String, Object>> entryList = new java.util.ArrayList<>(yourObject.fileData.entrySet());
                                int chunkSize = 2;
                                for (Map.Entry<String, Object> entry : yourObject.fileData.entrySet()) {
                                    String key = entry.getKey();
                                    Object value = entry.getValue();
                                    System.out.println("Key: " + key + ", Value: " + value);
                                }
                                System.out.println(entryList.size());
                                for (int i = 0; i < entryList.size(); i += chunkSize) {
                                    int endIndex = Math.min(i + chunkSize, entryList.size());
                                    List<Map.Entry<String, Object>> chunk = entryList.subList(i, endIndex);
                                    System.out.println("Aqui aqui novamente $");
                                    System.out.println(i);
                                    // Process each entry in the chunk
                                    for (Map.Entry<String, Object> entry : chunk) {
                                        String key1 = entry.getKey();
                                        String value = (String) entry.getValue();
                                        System.out.println(value);
                                        // Your processing logic goes here
                                        // Create a Kafka producer
                                        Producer<String, String> producer = new KafkaProducer<>(properties1);

                                        // Produce a message to a Kafka topic
                                        String topic = "processingDataText"; // Change to your Kafka topic
                                        String key = "key";
                                        String textToSend = (String) value;
                                        System.out.println(textToSend);
                                        System.out.println("O que chegou");
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
                                        // aqui vai o kafka para o aprendizado de maquina
                                        Properties properties12 = new Properties();
                                        properties1.put("bootstrap.servers", "localhost:9094"); // Change to your Kafka broker(s)
                                        properties1.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
                                        properties1.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

                                        // Create a Kafka producer
                                        Producer<String, String> producer2 = new KafkaProducer<>(properties1);

                                        // Produce a message to a Kafka topic
                                        String topic2 = "processingDataTextToIA"; // Change to your Kafka topic
                                        String key2 = "key";
                                        ProducerRecord<String, String> record2 = new ProducerRecord<>(topic2, key2, textToSend);

                                        // Send the message
                                        producer2.send(record2, (metadata, exception) -> {
                                            if (exception == null) {
                                                System.out.println("Message sent successfully. Topic: " + metadata.topic() +
                                                        ", Partition: " + metadata.partition() + ", Offset: " + metadata.offset());
                                            } else {
                                                System.err.println("Error sending message: " + exception.getMessage());
                                            }
                                        });



                                        // Close the producer
                                        producer2.close();
//                                    }
                                    }

                                    // Add a line break between chunks for better readability
                                    System.out.println("------------------");
                                }

                            }
                             else if (yourObject.finalDataSourceType.equals("YouTube")) {
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
                                                    properties1.put("bootstrap.servers", "localhost:9094"); // Change to your Kafka broker(s)
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
                                                    // aqui vai o kafka para o aprendizado de maquina
                                                    Properties properties12 = new Properties();
                                                    properties1.put("bootstrap.servers", "localhost:9094"); // Change to your Kafka broker(s)
                                                    properties1.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
                                                    properties1.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

                                                    // Create a Kafka producer
                                                    Producer<String, String> producer2 = new KafkaProducer<>(properties1);

                                                    // Produce a message to a Kafka topic
                                                    String topic2 = "processingDataTextToIA"; // Change to your Kafka topic
                                                    String key2 = "key";
                                                    ProducerRecord<String, String> record2 = new ProducerRecord<>(topic2, key2, textToSend);

                                                    // Send the message
                                                    producer2.send(record2, (metadata, exception) -> {
                                                        if (exception == null) {
                                                            System.out.println("Message sent successfully. Topic: " + metadata.topic() +
                                                                    ", Partition: " + metadata.partition() + ", Offset: " + metadata.offset());
                                                        } else {
                                                            System.err.println("Error sending message: " + exception.getMessage());
                                                        }
                                                    });



                                                    // Close the producer
                                                    producer2.close();
                                                }
                                            }

                                            // Check if there are more result pages
                                            if (parsedData.get("nextPageToken") != null) {
                                                System.out.println("Foi tinha nova pagina aqui");
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
                            } else if(yourObject.finalDataSourceType.equals("X")) {
                                System.out.println("Twitter aqui");
                                // Set your Twitter API credentials
                                String apiKey = "your_api_key";
                                String apiSecretKey = "your_api_secret_key";
                                String accessToken = "your_access_token";
                                String accessTokenSecret = "AAAAAAAAAAAAAAAAAAAAALV9TAEAAAAAP3ewlXY3kiK%2BRPCwSoM2PdAmsSE%3De95FIYI6naAMw52KQakqu0UbzUSSjM9CzDN6PGfHvoEddXibaa";
                                TwitterCredentialsBearer credentials = new TwitterCredentialsBearer(accessTokenSecret);
                                // set rules

                                setRules(accessTokenSecret, yourObject.wordsToCount);
//                                TwitterApi apiInstance = new TwitterApi(credentials);
                                connectStream(accessTokenSecret);

//                                try {
//                                    TweetsStreamListenersExecutor tsle = new TweetsStreamListenersExecutor();
//                                    tsle.stream()
//                                            .streamingHandler(new StreamingTweetHandlerImpl(apiInstance))
//                                            .executeListeners();
//                                    while(tsle.getError() == null) {
//                                        try {
//                                            System.out.println("==> sleeping 5 ");
//                                            Thread.sleep(5000);
//                                        } catch (InterruptedException e) {
//                                            e.printStackTrace();
//                                        }
//                                    }
//
//                                    if(tsle.getError() != null) {
//                                        System.err.println("==> Ended with error: " + tsle.getError());
//                                    }

                                    //      // Shutdown TweetsStreamListenersExecutor
                                    //      try {
                                    //        Thread.sleep(20000);
                                    //        tsle.shutdown();
                                    //      } catch (InterruptedException e) {
                                    //        e.printStackTrace();
                                    //      }

                                    //      // An example of how to use the streaming directly using the InputStream result (Without TweetsStreamListenersExecutor)
                                    //      try{
                                    //         JSON json = new JSON();
                                    //         Type localVarReturnType = new TypeToken<StreamingTweetResponse>(){}.getType();
                                    //         BufferedReader reader = new BufferedReader(new InputStreamReader(streamResult));
                                    //         String line = reader.readLine();
                                    //         while (line != null) {
                                    //           if(line.isEmpty()) {
                                    //             System.err.println("==> " + line.isEmpty());
                                    //             line = reader.readLine();
                                    //             continue;
                                    //            }
                                    //           Object jsonObject = json.getGson().fromJson(line, localVarReturnType);
                                    //           System.out.println(jsonObject != null ? jsonObject.toString() : "Null object");
                                    //           line = reader.readLine();
                                    //         }
                                    //      }catch (Exception e) {
                                    //        e.printStackTrace();
                                    //        System.out.println(e);
                                    //      }
//                                } catch (ApiException e) {
//                                    System.err.println("Status code: " + e.getCode());
//                                    System.err.println("Reason: " + e.getResponseBody());
//                                    System.err.println("Response headers: " + e.getResponseHeaders());
//                                    e.printStackTrace();
//                                }
                            }
                        } catch (JsonProcessingException e) {
                            throw new RuntimeException(e);
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        } catch (URISyntaxException e) {
                            throw new RuntimeException(e);
                        } catch (InterruptedException e) {
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

    private static void setRules(String bearerToken,
                                 List <String> rules) {
        // Set your Twitter API v2 credentials
        String appAccessToken = "your_app_access_token";

        // Set the endpoint URL
        String endpoint = "https://api.twitter.com/2/tweets/search/stream/rules";

        // Set the request headers
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-type", "application/json");
        headers.put("Authorization", "Bearer " + appAccessToken);

        // Set the request body
        String requestBody = "{\"add\": [{\"value\": \"" + rules.get(0) + "\", \"tag\": \" "+ rules.get(0) +"\"}]}";

        // Create an HttpClient
        HttpClient client = HttpClient.newHttpClient();

        // Create an HttpRequest
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(endpoint))
                .header("Content-type", "application/json")
                .header("Authorization", "Bearer " + appAccessToken)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        // Send the request and retrieve the response
        try {
            HttpResponse response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Print the response code
            int statusCode = ((java.net.http.HttpResponse<?>) response).statusCode();
            System.out.println("Response Code: " + statusCode);

            // Print the response body
            String responseBody = (String) response.body();
            System.out.println("Response Body: " + responseBody);

            // Print the response headers
            HttpHeaders responseHeaders = response.headers();
            System.out.println("Response Headers: " + responseHeaders.map());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void connectStream(String bearerToken) throws IOException, URISyntaxException {

        CloseableHttpClient httpClient = HttpClients.custom()
                .setDefaultRequestConfig(RequestConfig.custom()
                        .setCookieSpec(CookieSpecs.STANDARD).build())
                .build();

        URIBuilder uriBuilder = new URIBuilder("https://api.twitter.com/2/tweets/sample/stream");

        HttpGet httpGet = new HttpGet(uriBuilder.build());
        httpGet.setHeader("Authorization", String.format("Bearer %s", bearerToken));

        CloseableHttpResponse response = httpClient.execute(httpGet);
        HttpEntity entity = response.getEntity();
        if (null != entity) {
            BufferedReader reader = new BufferedReader(new InputStreamReader((entity.getContent())));
            String line = reader.readLine();
            while (line != null) {
                System.out.println(line);
                Properties properties1 = new Properties();
                properties1.put("bootstrap.servers", "192.168.0.135:9094"); // Change to your Kafka broker(s)
                properties1.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
                properties1.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

                // Create a Kafka producer
                Producer<String, String> producer = new KafkaProducer<>(properties1);

                // Produce a message to a Kafka topic
                String topic = "processingDataText"; // Change to your Kafka topic
                String key = "key";

                ProducerRecord<String, String> record1 = new ProducerRecord<>(topic, key,line);

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
                line = reader.readLine();
            }
        }

    }
}