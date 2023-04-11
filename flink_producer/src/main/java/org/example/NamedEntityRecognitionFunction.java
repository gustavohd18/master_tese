import org.apache.flink.api.common.functions.RichMapFunction;
import org.apache.flink.api.java.utils.ParameterTool;
import org.apache.flink.configuration.Configuration;
import opennlp.tools.namefind.NameFinderME;
import opennlp.tools.namefind.TokenNameFinderModel;
import opennlp.tools.util.Span;

public class NamedEntityRecognitionFunction extends RichMapFunction<String, String> {

    private transient NameFinderME nameFinder;

    @Override
    public void open(Configuration parameters) throws Exception {
        super.open(parameters);

        // Load the TokenNameFinderModel from the resources folder
        TokenNameFinderModel model = new TokenNameFinderModel(getClass().getResourceAsStream("/en-ner-person.bin"));
        
        // Initialize the NameFinderME with the loaded model
        nameFinder = new NameFinderME(model);
    }

    @Override
    public void close() throws Exception {
        super.close();
        
        // Clean up resources
        nameFinder.clearAdaptiveData();
    }

    @Override
    public String map(String value) throws Exception {
        // Split the input text into tokens
        String[] tokens = value.split(" ");

        // Use the NameFinderME to extract named entities from the tokens
        Span[] spans = nameFinder.find(tokens);

        // Convert the extracted spans back into text and return as a comma-separated string
        StringBuilder sb = new StringBuilder();
        for (Span span : spans) {
            sb.append(value.substring(span.getStart(), span.getEnd())).append(",");
        }
        return sb.toString();
    }
}
