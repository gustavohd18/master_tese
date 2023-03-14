package org.example;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.common.functions.ReduceFunction;
import org.apache.flink.api.common.serialization.SimpleStringSchema;
import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.windowing.assigners.TumblingProcessingTimeWindows;
import org.apache.flink.streaming.api.windowing.time.Time;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaConsumer;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

public class Main {
    static String TOPIC_IN = "teste1";
    static String BOOTSTRAP_SERVER = "192.168.0.46:9092";

    @SuppressWarnings("serial")
    public static void main( String[] args ) throws Exception
    {
        List<String> stopWords = Arrays.asList("de", "a",
                "o",
                "disso",
                "a",
                "rt",
                "@",
                "foi",
                "que",
                "e",
                "do",
                "da",
                "de",
                "em",
                "um",
                "para",
                "é",
                "?",
                "/",
                "com",
                "não",
                "uma",
                "os",
                "no",
                "se",
                "na",
                "por",
                "mais",
                "as",
                "dos",
                "como",
                "mas",
                "foi",
                "ao",
                "ele",
                "das",
                "tem",
                "à",
                "seu",
                "sua",
                "ou",
                "ser",
                "quando",
                "muito",
                "há",
                "nos",
                "já",
                "está",
                "eu",
                "também",
                "só",
                "pelo",
                "formos",
                "forem",
                "serei",
                "será",
                "seremos",
                "serão",
                "seria",
                "seríamos",
                "seriam",
                "tenho",
                "tem",
                "temos",
                "tém",
                "tinha",
                "tínhamos",
                "tinham",
                "tive",
                "teve",
                "tivemos",
                "tiveram",
                "tivera",
                "tivéramos",
                "tenha",
                "tenhamos",
                "tenham",
                "tivesse",
                "tivéssemos",
                "tivessem",
                "tiver",
                "tivermos",
                "tiverem",
                "terei",
                "terá,",
                "teremos",
                "dizem",
                "terão",
                "teria",
                "teríamos",
                "?",
                "//t.co/",
                "teriam", "@", "#", "//", "http//:");

        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

        Properties props = new Properties();
        props.put("bootstrap.servers", BOOTSTRAP_SERVER);
        props.put("client.id", "my-app");

        // Reading data directly as <Key, Value> from Kafka. Write an inner class containing key, value
        // and use it to deserialise Kafka record.
        // Reference => https://stackoverflow.com/questions/53324676/how-to-use-flinkkafkaconsumer-to-parse-key-separately-k-v-instead-of-t
        FlinkKafkaConsumer<String> kafkaConsumer = new FlinkKafkaConsumer<>(TOPIC_IN, new SimpleStringSchema(), props);

        kafkaConsumer.setStartFromLatest();


        // Create Kafka producer from Flink API
        Properties prodProps = new Properties();
        prodProps.put("bootstrap.servers", BOOTSTRAP_SERVER);

        FlinkKafkaProducer<WordWithCount> kafkaProducer =
                new FlinkKafkaProducer<>("teste2",
                        ((value, timestamp) -> new ProducerRecord<byte[], byte[]>("teste2", "myKey".getBytes(), value.toString().getBytes())),
                        prodProps,
                        FlinkKafkaProducer.Semantic.EXACTLY_ONCE);

        // create a stream to ingest data from Kafka as a custom class with explicit key/value
        DataStream<String> stream = env.addSource(kafkaConsumer);

        // parse the data, group it, window it, and aggregate the counts
        DataStream<WordWithCount> windowCounts =
                stream.flatMap(
                                (FlatMapFunction<String, WordWithCount>)
                                        (value, out) -> {
                                            String str2 = "\\?";

                                            String characterFilter = "[^\\p{L}\\p{M}\\p{N}\\p{P}\\p{Z}\\p{Cf}\\p{Cs}\\s]";
                                            String newWord1 = value.replaceAll(characterFilter, "");
                                            String newWord2 = newWord1.replaceAll(str2, "");
                                            for (String word : newWord2.split("\\s")) {
                                                for(String stopWord: stopWords ) {
                                                    if(newWord2.equals(stopWord)) {
                                                        newWord2 = newWord2.replaceAll(stopWord, "");
                                                    }
                                                }
                                                out.collect(new WordWithCount(word, 1L));
                                            }
                                        },
                                Types.POJO(WordWithCount.class))
                        .keyBy(value -> value.word)
                        .window(TumblingProcessingTimeWindows.of(Time.seconds(5)))
                        .reduce((a, b) -> new WordWithCount(a.word, a.count + b.count))
                        .returns(WordWithCount.class);
        windowCounts.addSink(kafkaProducer);
        // supports timewindow without group by key
//        stream
//                .timeWindowAll(Time.seconds(5)) // ignoring grouping per key
//                .reduce(new ReduceFunction<String>()
//                {
//                    @Override
//                    public String reduce(String value1, String value2) throws Exception
//                    {
//                        System.out.println(LocalTime.now() + " -> " + value1 + "   " + value2);
//                        return value1+value2;
//                    }
//                })
//                .addSink(kafkaProducer);
                //.print(); // immediate printing to console
        //.keyBy( (KeySelector<KafkaRecord, String>) KafkaRecord::getKey )
        //.timeWindow(Time.seconds(5))

        // produce a number as string every second
        //new NumberGenerator(p, TOPIC_IN).start();

        // for visual topology of the pipeline. Paste the below output in https://flink.apache.org/visualizer/
        System.out.println( env.getExecutionPlan() );

        // start flink
        env.execute();
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