package org.example;



import java.io.Serializable;

import lombok.Data;

@SuppressWarnings("serial")
@Data
public class KafkaRecord implements Serializable
{
    String value;
    Long timestamp;

    @Override
    public String toString()
    {
        return "key"+":"+value;
    }

}
