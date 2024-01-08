
class MyData {
  String finalDataSourceType;
  String finalDataTypeFile;
  String finalSmartWatchOptions;
  bool isHeatMapSelected;
  bool isBarChart;
  bool isWordCloudSelected;
  bool isLineChartSelected;
  bool isCountWordSelected;
  bool isNamedEntitySelected;
  bool isCountWordsPertimeSelected;
  String barenToken;
  List<String> tags;
  String videoId;
  List<String> wordsToCount;
  bool isAverageSelected;
  bool isMaxSelected;
  bool isMinSelected;
  Map<String, dynamic>? fileData;

  MyData({
    required this.finalDataSourceType,
    required this.finalDataTypeFile,
    required this.finalSmartWatchOptions,
    required this.isHeatMapSelected,
    required this.isBarChart,
    required this.isWordCloudSelected,
    required this.isLineChartSelected,
    required this.isCountWordSelected,
    required this.isNamedEntitySelected,
    required this.isCountWordsPertimeSelected,
    required this.barenToken,
    required this.tags,
    required this.videoId,
    required this.wordsToCount,
    required this.isAverageSelected,
    required this.isMaxSelected,
    required this.isMinSelected,
    required this.fileData,
  });

  factory MyData.fromJson(Map<String, dynamic> json) {
    return MyData(
      finalDataSourceType: json['finalDataSourceType'],
      finalDataTypeFile: json['finalDataTypeFile'],
      finalSmartWatchOptions: json['finalSmartWatchOptions'],
      isHeatMapSelected: json['is_heat_map_selected'],
      isBarChart: json['is_bar_chart_selected'],
      isWordCloudSelected: json['isWordCloudSelected'],
      isLineChartSelected: json['is_line_chart_selected'],
      isCountWordSelected: json['is_count_word_selected'],
      isNamedEntitySelected: json['is_named_entity_selected'],
      isCountWordsPertimeSelected: json['is_count_words_pertime_selected'],
      barenToken: json['bar_chart_token'],
      tags: List<String>.from(json['tags']),
      videoId: json['video_id'],
      wordsToCount: List<String>.from(json['words_to_count']),
      isAverageSelected: json['is_average_selected'],
      isMaxSelected: json['is_max_selected'],
      isMinSelected: json['is_min_selected'],
      fileData: json['file_data'] != null ? Map<String, dynamic>.from(json['file_data']) : null
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'finalDataSourceType': finalDataSourceType,
      'finalDataTypeFile': finalDataTypeFile,
      'finalSmartWatchOptions': finalSmartWatchOptions,
      'is_heat_map_selected': isHeatMapSelected,
      'is_bar_chart_selected': isBarChart,
      'isWordCloudSelected': isWordCloudSelected,
      'is_line_chart_selected': isLineChartSelected,
      'is_count_word_selected': isCountWordSelected,
      'is_named_entity_selected': isNamedEntitySelected,
      'is_count_words_pertime_selected': isCountWordsPertimeSelected,
      'bar_chart_token': barenToken,
      'tags': tags,
      'video_id': videoId,
      'words_to_count': wordsToCount,
      'is_average_selected': isAverageSelected,
      'is_max_selected': isMaxSelected,
      'is_min_selected': isMinSelected,
      'file_data': fileData
    };
  }
}
