
class MyData {
  String processData;// separa em contagem de palavras ou data ou numerico com data
  String? text;
  int? number;
  String? date;
  

  MyData({
    required this.processData,
    required this.text,
    required this.number,
    required this.date,
  });

  factory MyData.fromJson(Map<String, dynamic> json) {
    return MyData(
      processData: json['processData'],
      text: json['text'],
      number: json['number'],
      date: json['date'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'processData': processData,
      'text': text,
      'number': number,
      'date': date,
    };
  }
}
