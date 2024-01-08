
class MyData {
  String fromVisualization;// separa em contagem de palavras ou data ou numerico com data
  String? query;
  

  MyData({
    required this.fromVisualization,
    required this.query,
  });

  factory MyData.fromJson(Map<String, dynamic> json) {
    return MyData(
      fromVisualization: json['fromVisualization'],
      query: json['query']
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'fromVisualization': fromVisualization,
      'query': query,
    };
  }
}
