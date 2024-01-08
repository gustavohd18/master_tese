package org.example;
import com.twitter.clientlib.ApiException;

public interface ITweetsStreamListener<T> {
    void actionOnStreamingObject(T streamingTweet)  throws ApiException;
}