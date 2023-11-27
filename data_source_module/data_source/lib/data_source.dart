import 'dart:convert';
import 'dart:io';

int calculate() {
  return 6 * 7;
}


Future<void> fetchComments(String url, Map<String, String> params, List<Map<String, dynamic>> jsonData) async {
  try {
    while (true) {
      final response = await HttpClient().getUrl(Uri.parse('$url?${_encodeParams(params)}')).then((request) => request.close());
      final String data = await response.transform(utf8.decoder).join();
      final Map<String, dynamic> parsedData = jsonDecode(data);

      if (parsedData['items'] != null) {
        final List<dynamic> comments = parsedData['items'];
        for (final comment in comments) {
          final String author = comment['snippet']['topLevelComment']['snippet']['authorDisplayName'];
          final String text = comment['snippet']['topLevelComment']['snippet']['textDisplay'];
          final List<String> wordsArray = text.split(' ');
          for (final String text3 in wordsArray) {
            // sendStream(text) perhaps change here to pass the date as well
            print('$text3');
            final String text = text3;
            final int value = DateTime.now().millisecondsSinceEpoch; // Using the current time as a value

            jsonData.add({'text': text, 'value': value});
          }
        }
      }

      // Check if there are more result pages
      if (parsedData['nextPageToken'] != null) {
        params['pageToken'] = parsedData['nextPageToken'];
      } 

      // Wait for 5 seconds before making the next request
      await Future.delayed(Duration(seconds: 5));
    }
  } catch (error) {
    print('Error fetching comments: $error');
  }
}

String _encodeParams(Map<String, String> params) {
  return params.entries.map((e) => '${e.key}=${Uri.encodeQueryComponent(e.value)}').join('&');
}