package org.example;
import edu.stanford.nlp.simple.Document;
import edu.stanford.nlp.simple.Sentence;
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
        String text = "I love programming!";

        // Analyze sentiment using Stanford NLP
        Document doc = new Document(text);
        for (Sentence sentence : doc.sentences()) {
            System.out.println("Sentiment: " + sentence.sentiment());
        }
    }
}