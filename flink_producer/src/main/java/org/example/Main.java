package org.example;
import java.time.Duration;
import java.time.LocalTime;
import java.util.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.common.functions.MapFunction;
import org.apache.flink.api.common.functions.ReduceFunction;
import org.apache.flink.api.common.serialization.SimpleStringSchema;
import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.api.java.tuple.Tuple3;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.windowing.assigners.TumblingProcessingTimeWindows;
import org.apache.flink.streaming.api.windowing.time.Time;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaConsumer;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaProducer;
import org.apache.flink.util.Collector;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;

public class Main {
    static String TOPIC_IN_TEXT = "processingDataText";
    static String BOOTSTRAP_SERVER = "192.168.0.135:9094";

    @SuppressWarnings("serial")
    public static void main( String[] args ) throws Exception
    {
        // iniciaremos aqui um cara que fica ouvindo
        // de um kafka para saber a configuracao
        // pegando a configuracao ai seta o flink
        // para processar
        System.out.printf("Estou rodando aqui gurizada");
        // Set up Kafka consumer properties
        Properties properties = new Properties();
        properties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "192.168.0.135:9094"); // servidor rodando kafka
        properties.put(ConsumerConfig.GROUP_ID_CONFIG, "consumerGroupName");
        properties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        properties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());

        // Create Kafka consumer
        Consumer<String, String> consumer = new KafkaConsumer<>(properties);

        // Subscribe to the Kafka topic
        consumer.subscribe(Collections.singletonList("begin"));

        // Start listening for messages
        while (true) {
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

                    if(Objects.equals(yourObject.finalDataSourceType, "YouTube") || Objects.equals(yourObject.finalDataSourceType, "X")) {
                        System.out.print("cheguei no processamento youtube");
                        // aqui iniciamos o listener do kafka para texto
                                        List<String> stopWords = Arrays.asList( "a", "@","@", "#", "//", "http//:","adeus", "agora", "aí", "ainda", "além", "algo", "alguém", "algum", "alguma", "algumas", "alguns", "ali", "ampla", "amplas", "amplo", "amplos", "ano", "anos", "ante", "antes", "ao", "aos", "apenas", "apoio", "após", "aquela", "aquelas", "aquele", "aqueles", "aqui", "aquilo", "área", "as", "às", "assim", "até", "atrás", "através", "baixo", "bastante", "bem", "boa", "boas", "bom", "bons", "breve", "cá", "cada", "catorze", "cedo", "cento", "certamente", "certeza", "cima", "cinco", "coisa", "coisas", "com", "como", "conselho", "contra",
                        "contudo", "custa", "da", "dá", "dão", "daquela", "daquelas", "daquele", "daqueles", "dar", "das", "de", "debaixo", "dela", "delas", "dele", "deles", "demais", "dentro", "depois", "desde", "dessa", "dessas", "desse", "desses", "desta", "destas", "deste", "destes", "deve", "devem", "devendo", "dever", "deverá", "deverão", "deveria", "deveriam",
                        "devia", "deviam", "dez", "dezanove", "dezasseis", "dezassete", "dezoito", "dia", "diante", "disse",
                        "disso", "disto", "dito", "diz", "dizem", "dizer", "do", "dois", "dos", "doze", "duas", "dúvida",
                        "e", "é", "ela", "elas", "ele", "eles", "em", "embora", "enquanto", "entre", "era", "eram", "éramos",
                        "és", "essa", "essas", "esse", "esses", "esta", "está", "estamos", "estão", "estar", "estas", "estás",
                        "estava", "estavam", "estávamos", "este", "esteja", "estejam", "estejamos", "estes", "esteve", "estive",
                        "estou", "etc", "eu", "exemplo", "faço", "falta", "favor", "faz", "fazeis", "fazem", "fazemos",
                        "fazendo", "fazer", "fazes", "feita", "feitas", "feito", "feitos", "fez", "fim", "final", "foi",
                        "fomos", "foste", "fostes", "fui", "geral", "grande", "grandes", "grupo", "há", "haja", "hajam",
                        "hajamos", "houvessem", "houvéssemos", "isso", "isto", "já", "la", "lá", "lado", "lhe", "lhes", "lo",
                        "local", "logo", "longe", "lugar", "maior", "maioria", "mais", "mal", "mas", "máximo", "me", "meio",
                        "naquele", "naqueles", "nas", "nem", "nenhum", "nenhuma", "nessa", "nessas", "nesse", "nesses", "nesta",
                        "paucas", "pela", "pelas", "pelo", "pelos", "pequena", "pequenas", "pequeno", "pequenos", "per",
                        "perante", "perto", "pode", "pude",  "poderia", "poderiam", "podia", "podiam", "põe", "põem"
                        , "quando", "quanto", "quantos", "quarta", "quarto", "quatro", "que", "quê", "quem", "quer","rt",
                        "relação", "sabe",  "seria", "seriam", "seríamos", "sete", "sétima", "sétimo", "seu", "seus", "sexta", "sexto", "si", "sido", "sim", "sistema", "só", "sob", "terão", "terceira", "terceiro", "terei", "teremos", "teria", "teriam", "teríamos", "teu", "teus", "teve", "ti", "tido", "tinha", "tinham", "tínhamos", "tive", "tivemos", "tiver", "tivera", "tiveram", "tivéramos", "tiverem", "tivermos", "todas", "todavia", "todo", "últimos", "um", "uma", "umas", "uns", "vai", "vais", "vão", "vários", "vem", "vêm", "vendo", "vens", "ver", "vez", "vezes", "viagem", "vindo", "vinte", "vir", "você", "vocês", "vos", "vós", "vossa", "vossas", "vosso", "vossos", "zero", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "_");



                        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

                        Properties props = new Properties();
                        props.put("bootstrap.servers", BOOTSTRAP_SERVER);

                        // Reading data directly as <Key, Value> from Kafka. Write an inner class containing key, value
                        // and use it to deserialise Kafka record.
                        // Reference => https://stackoverflow.com/questions/53324676/how-to-use-flinkkafkaconsumer-to-parse-key-separately-k-v-instead-of-t
                        FlinkKafkaConsumer<String> kafkaConsumer = new FlinkKafkaConsumer<>(TOPIC_IN_TEXT, new SimpleStringSchema(), props);

                        kafkaConsumer.setStartFromEarliest();
                        // comeca a oouvir o que esta vindo dai dos dados
                        DataStream<String> stream = env.addSource(kafkaConsumer);

                        if(yourObject.isCountWordSelected) {
                            System.out.println("Chegamos no isCount");
                            // Create Kafka producer from Flink API
                            Properties prodProps = new Properties();
                            prodProps.put("bootstrap.servers", BOOTSTRAP_SERVER);

                            FlinkKafkaProducer<Tuple2<String, Integer>> kafkaProducerText =
                                    new FlinkKafkaProducer<>("sendWordCountProcessed",
                                            ((value, timestamp) -> new ProducerRecord<byte[], byte[]>("sendWordCountProcessed", "myKey".getBytes(), value.toString().getBytes())),
                                            prodProps,
                                            FlinkKafkaProducer.Semantic.EXACTLY_ONCE);
                          DataStream<Tuple2<String, Integer>> wordCounts = stream.flatMap(new FlatMapFunction<String, Tuple2<String, Integer>>() {
                                public void flatMap(String value, Collector<Tuple2<String, Integer>> out) {
                                    for (String word : value.toLowerCase().split("\\s")) {
                                        for(String stopWord: stopWords ) {
                                            if(word.equals(stopWord)) {
                                                word = word.replaceAll(stopWord, "");
                                            }
                                        }
                                        out.collect(new Tuple2<String, Integer>(word, 1));
                                    }
                                }
                            })
                            .keyBy(0)
                            .timeWindow(Time.seconds(5))
                            .sum(1);

                            // Add the word count to each new window in the same list
                             DataStream<Tuple2<String, Integer>> updatedWordCounts = wordCounts
                                        .keyBy(0)
                                        .reduce((value1, value2) -> new Tuple2<>(value1.f0, value1.f1 + value2.f1));

                                // Persist each count of word for each window
                                updatedWordCounts.print();
                                updatedWordCounts.addSink(kafkaProducerText);

                            env.execute();
                        }

                        if(yourObject.isLineChartSelected) {
                            // Create Kafka producer from Flink API
                            Properties prodProps = new Properties();
                            prodProps.put("bootstrap.servers", BOOTSTRAP_SERVER);

                            FlinkKafkaProducer<Tuple2<String, Integer>> kafkaProducerTotal =
                                    new FlinkKafkaProducer<>("sendTotalItemsProcessed",
                                            ((value, timestamp) -> new ProducerRecord<byte[], byte[]>("sendTotalItemsProcessed", "myKey".getBytes(), value.toString().getBytes())),
                                            prodProps,
                                            FlinkKafkaProducer.Semantic.EXACTLY_ONCE);
//                            // Count of data items in each time window
//                            DataStream<Integer> dataItemCount = stream.map(value -> 1)
//                                    .timeWindowAll(Time.seconds(5))
//                                    .sum(0);
//
//                            // Sink data item count to Kafka
//                            dataItemCount.map(count -> new Tuple2<>("data_count", count))
//                                    .addSink(kafkaProducerTotal);


                        }
                        if(yourObject.isBarChartSelected) {
                            // Create Kafka producer from Flink API
                            Properties prodProps = new Properties();
                            prodProps.put("bootstrap.servers", BOOTSTRAP_SERVER);

                            FlinkKafkaProducer<Tuple2<String, Integer>> kafkaProducerNamed =
                                    new FlinkKafkaProducer<>("sendNamedEntityProcessed",
                                            ((value, timestamp) -> new ProducerRecord<byte[], byte[]>("sendNamedEntityProcessed", "myKey".getBytes(), value.toString().getBytes())),
                                            prodProps,
                                            FlinkKafkaProducer.Semantic.EXACTLY_ONCE);
                            DataStream<String> outputNamedEntity = stream.map(new NamedEntity());

                            DataStream<Tuple2<String, Integer>> namedEntitywordCounts = outputNamedEntity.flatMap(new FlatMapFunction<String, Tuple2<String, Integer>>() {
                                public void flatMap(String value, Collector<Tuple2<String, Integer>> out) {
                                    out.collect(new Tuple2<String, Integer>(value, 1));
                                }
                            })
                            .keyBy(0)
                            .timeWindow(Time.seconds(5))
                            .sum(1);

                            DataStream<Tuple2<String, Integer>> updatedNamedEntityWordCounts = namedEntitywordCounts.keyBy(0).reduce((value1, value2) -> new Tuple2<>(value1.f0, value1.f1 + value2.f1));
                            updatedNamedEntityWordCounts.print();
                            updatedNamedEntityWordCounts.addSink(kafkaProducerNamed);
                        }

                    }
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }

//                if(record.value().) {
//
//                }
            });
        }

//

//
//
//        // Create Kafka producer from Flink API
//        Properties prodProps = new Properties();
//        prodProps.put("bootstrap.servers", BOOTSTRAP_SERVER);
//
//        FlinkKafkaProducer<Tuple2<String, Integer>> kafkaProducer =
//                new FlinkKafkaProducer<>("teste2",
//                        ((value, timestamp) -> new ProducerRecord<byte[], byte[]>("teste2", "myKey".getBytes(), value.toString().getBytes())),
//                        prodProps,
//                        FlinkKafkaProducer.Semantic.EXACTLY_ONCE);
//
//        // create a stream to ingest data from Kafka as a custom class with explicit key/value
//        DataStream<String> stream = env.addSource(kafkaConsumer);
//        DataStream<String> outputNamedEntity = stream.map(new NamedEntity());
//
//        // Split the text stream into words and count each word
//        DataStream<Tuple2<String, Integer>> wordCounts = stream
//                .flatMap(new FlatMapFunction<String, Tuple2<String, Integer>>() {
//                    public void flatMap(String value, Collector<Tuple2<String, Integer>> out) {
//                        for (String word : value.toLowerCase().split("\\s")) {
//                            for(String stopWord: stopWords ) {
//                                if(word.equals(stopWord)) {
//                                    word = word.replaceAll(stopWord, "");
//                                }
//                            }
//                            out.collect(new Tuple2<String, Integer>(word, 1));
//                        }
//                    }
//                })
//                .keyBy(0)
//                .timeWindow(Time.seconds(5))
//                .sum(1);
//
//        // Split the text stream into named entity and count each word
//        DataStream<Tuple2<String, Integer>> namedEntitywordCounts = outputNamedEntity
//                .flatMap(new FlatMapFunction<String, Tuple2<String, Integer>>() {
//                    public void flatMap(String value, Collector<Tuple2<String, Integer>> out) {
//                        out.collect(new Tuple2<String, Integer>(value, 1));
//                    }
//                })
//                .keyBy(0)
//                .timeWindow(Time.seconds(5))
//                .sum(1);
//
//        // Add the word count to each new window in the same list
//        DataStream<Tuple2<String, Integer>> updatedWordCounts = wordCounts
//                .keyBy(0)
//                .reduce((value1, value2) -> new Tuple2<>(value1.f0, value1.f1 + value2.f1));
//
//        // Add the word count to each new window in the same list
//        DataStream<Tuple2<String, Integer>> updatedNamedEntityWordCounts = namedEntitywordCounts
//                .keyBy(0)
//                .reduce((value1, value2) -> new Tuple2<>(value1.f0, value1.f1 + value2.f1));
//
//        // Persist each count of word for each window
//        //updatedWordCounts.print();
//
//        updatedNamedEntityWordCounts.print();
//
//        updatedWordCounts.addSink(kafkaProducer);
//        // start flink
//        env.execute();
    }

    public static class WordWithCount {

        public String word;
        public long count;

        @SuppressWarnings("unused")
        public WordWithCount() {}

        public WordWithCount(String word, long count) {
            this.word = word;
            this.count = count;
        }

        @Override
        public String toString() {
            return word + "::" + count;
        }
    }
}
