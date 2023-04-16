package org.example;

import opennlp.tools.tokenize.SimpleTokenizer;
import org.apache.flink.api.common.functions.RichMapFunction;
import org.apache.flink.api.java.utils.ParameterTool;
import org.apache.flink.configuration.Configuration;
import opennlp.tools.namefind.NameFinderME;
import opennlp.tools.namefind.TokenNameFinderModel;
import opennlp.tools.util.Span;

public class NamedEntity extends RichMapFunction<String, String> {

    private transient NameFinderME nameFinder;

    @Override
    public void open(Configuration parameters) throws Exception {
        super.open(parameters);

        // Load the TokenNameFinderModel from the resources folder
        TokenNameFinderModel model = new TokenNameFinderModel(getClass().getResourceAsStream("/opennlp/en-ner-person.bin"));

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
        String[] tokens = SimpleTokenizer.INSTANCE.tokenize(value);

        // Use the NameFinderME to extract named entities from the tokens
        Span[] spans = nameFinder.find(tokens);

        String[] names = Span.spansToStrings(spans, tokens);


        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < names.length; i++) {
            sb.append(names[i]);
        }
        return sb.toString();
    }
}
