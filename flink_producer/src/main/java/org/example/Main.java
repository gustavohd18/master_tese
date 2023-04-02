package org.example;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.common.functions.ReduceFunction;
import org.apache.flink.api.common.serialization.SimpleStringSchema;
import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.windowing.assigners.TumblingProcessingTimeWindows;
import org.apache.flink.streaming.api.windowing.time.Time;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaConsumer;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaProducer;
import org.apache.flink.util.Collector;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

public class Main {
    static String TOPIC_IN = "teste1";
    static String BOOTSTRAP_SERVER = "192.168.0.46:9092";

    @SuppressWarnings("serial")
    public static void main( String[] args ) throws Exception
    {


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
        props.put("client.id", "my-app");

        // Reading data directly as <Key, Value> from Kafka. Write an inner class containing key, value
        // and use it to deserialise Kafka record.
        // Reference => https://stackoverflow.com/questions/53324676/how-to-use-flinkkafkaconsumer-to-parse-key-separately-k-v-instead-of-t
        FlinkKafkaConsumer<String> kafkaConsumer = new FlinkKafkaConsumer<>(TOPIC_IN, new SimpleStringSchema(), props);

        kafkaConsumer.setStartFromLatest();


        // Create Kafka producer from Flink API
        Properties prodProps = new Properties();
        prodProps.put("bootstrap.servers", BOOTSTRAP_SERVER);

        FlinkKafkaProducer<Tuple2<String, Integer>> kafkaProducer =
                new FlinkKafkaProducer<>("teste2",
                        ((value, timestamp) -> new ProducerRecord<byte[], byte[]>("teste2", "myKey".getBytes(), value.toString().getBytes())),
                        prodProps,
                        FlinkKafkaProducer.Semantic.EXACTLY_ONCE);

        // create a stream to ingest data from Kafka as a custom class with explicit key/value
        DataStream<String> stream = env.addSource(kafkaConsumer);

//        // parse the data, group it, window it, and aggregate the counts
//        DataStream<WordWithCount> windowCounts =
//                stream.flatMap(
//                                (FlatMapFunction<String, WordWithCount>)
//                                        (value, out) -> {
//                                            String str2 = "\\?";
//
//                                            String characterFilter = "[^\\p{L}\\p{M}\\p{N}\\p{P}\\p{Z}\\p{Cf}\\p{Cs}\\s]";
//                                            String newWord1 = value.replaceAll(characterFilter, "");
//                                            String newWord2 = newWord1.replaceAll(str2, "").toLowerCase();
//                                            for (String word : newWord2.split("\\s")) {
//                                                for(String stopWord: stopWords ) {
//                                                    if(word.equals(stopWord)) {
//                                                        word = word.replaceAll(stopWord, "");
//                                                    }
//                                                }
//                                                out.collect(new WordWithCount(word, 1L));
//                                            }
//                                        },
//                                Types.POJO(WordWithCount.class))
//                        .keyBy(value -> value.word)
//                        .window(TumblingProcessingTimeWindows.of(Time.seconds(5)))
//                        .reduce((a, b) -> new WordWithCount(a.word, a.count + b.count))
//                        .returns(WordWithCount.class);
//        windowCounts.addSink(kafkaProducer);
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
      //  System.out.println( env.getExecutionPlan() );
        // Split the text stream into words and count each word
        DataStream<Tuple2<String, Integer>> wordCounts = stream
                .flatMap(new FlatMapFunction<String, Tuple2<String, Integer>>() {
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

        updatedWordCounts.addSink(kafkaProducer);
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
