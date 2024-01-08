package org.example;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public class DecodeData {
    @JsonProperty("finalDataSourceType")
    public String finalDataSourceType;

    @JsonProperty("finalDataTypeFile")
    public String finalDataTypeFile;

    @JsonProperty("finalSmartWatchOptions")
    public String finalSmartWatchOptions;

    @JsonProperty("is_heat_map_selected")
    public boolean isHeatMapSelected;

    @JsonProperty("is_bar_chart_selected")
    public boolean isBarChartSelected;

    @JsonProperty("isWordCloudSelected")
    public boolean isWordCloudSelected;

    @JsonProperty("is_line_chart_selected")
    public boolean isLineChartSelected;

    @JsonProperty("is_count_word_selected")
    public boolean isCountWordSelected;

    @JsonProperty("is_named_entity_selected")
    public boolean isNamedEntitySelected;

    @JsonProperty("is_count_words_pertime_selected")
    public boolean isCountWordsPerTimeSelected;

    @JsonProperty("bar_chart_token")
    public String barChartToken;

    @JsonProperty("tags")
    public List<String> tags;

    @JsonProperty("video_id")
    public String videoId;

    @JsonProperty("words_to_count")
    public List<String> wordsToCount;

    @JsonProperty("is_average_selected")
    public boolean isAverageSelected;

    @JsonProperty("is_max_selected")
    public boolean isMaxSelected;

    @JsonProperty("is_min_selected")
    public boolean isMinSelected;

    @JsonProperty("file_data")
    public Map<String, Object> fileData;

    // getters and setters
}