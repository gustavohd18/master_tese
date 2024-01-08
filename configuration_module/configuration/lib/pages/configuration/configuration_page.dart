import 'dart:html';
import 'dart:typed_data';

import 'package:configuration/configuration.dart';
import 'package:configuration/drawer_custom.dart';
import 'package:csv/csv.dart';
import 'package:flutter/material.dart';

class ConfigurationPage extends StatefulWidget {
  const ConfigurationPage({super.key});

  @override
  State<ConfigurationPage> createState() => _ConfigurationPageState();
}

class _ConfigurationPageState extends State<ConfigurationPage> {
  String selectedOption = 'X';
  String selectedOptionFile = 'YouTube';
  String selectedOptionSmartWatch = 'Heart beats';
  String begin = '';
  List<String> selectedOptions = [];
  TextEditingController barenTokenController = TextEditingController();
  TextEditingController tagsController = TextEditingController();
  TextEditingController videoIdController = TextEditingController();
  TextEditingController wordsToCountController = TextEditingController();
  int linesPerChunk = 20;

  // Track the selected options
  bool _barChartSelected = false;
  bool _lineChartSelected = false;
  bool _heatMapSelected = false;
  bool _wordCloudSelected = false;
  bool _countWordSelected = false;
  bool _namedEntitySelected = false;
  bool _countWordsPertimeSelected = false;
  bool _averageSelected = false;
  bool _maxSelected = false;
  bool _minSelected = false;
  String fileName = '';
  File? fileUpload;

DateTime parseDate(String dateString) {
  List<String> dateParts = dateString.split('/');
  if (dateParts.length != 3) {
    throw FormatException('Invalid date format: $dateString');
  }

  int month = int.parse(dateParts[0]);
  int day = int.parse(dateParts[1]);
  int year = int.parse(dateParts[2]);

  return DateTime(year, month, day);
}

    Future<void> _processCSV(String content) async {
 
      print('chegou no process');
    final List<List<dynamic>> rows = const CsvToListConverter().convert(content);
    Map<String, dynamic> resultMap = {};

    for (int i = 0; i < rows.length; i += linesPerChunk) {
      print('chegamos aqui no row');
      final end = (i + linesPerChunk < rows.length) ? i + linesPerChunk : rows.length;
      final chunk = rows.sublist(i, end);
      if(selectedOption == 'Smartwatch') {
          for (int i = 1; i < chunk.length; i++) {
            var date = chunk[i][1] as String; // Assuming the date is always at index 1
            var stepCount = chunk[i][2] as int; // Assuming the step count is always at index 2

            resultMap.addAll({date: stepCount});
                        resultMap.forEach((key, value) {print(value);});

          }
      } else {
        for (int i = 1; i < chunk.length; i++) {
            var text = chunk[i][0] as String; // Assuming the date is always at index 1
            var date = chunk[i][1] as String; // Assuming the step count is always at index 2
            // aqui teremos que revisar se der erro para parsear data corretamente no arquivo texto
            // DateTime dateTime = parseDate(date);
            print("Ola o que chegou aqui");
            print(text);
            print(date);
            resultMap.addAll({date: text});
            // resultMap.forEach((key, value) {print(value);});
          }
      }
      // Process the chunk of rows
      // print('Processing chunk $i - $end: $chunk');
      
    }

    // aqui pode enviar este dado para algum endpoint de dados no datasource vamos tratar o caso
                String finalDataSourceType = selectedOption;
                String finalDataTypeFile = selectedOptionFile;
                String? finalSmartWatchOptions = selectedOptionSmartWatch;
                bool isBarChart = _barChartSelected;
                bool isHeatMapSelected = _heatMapSelected;
                bool isLineChartSelected = _lineChartSelected;
                bool isWordCloudSelected = _wordCloudSelected;
                bool isCountWordSelected = _countWordSelected;
                bool isNamedEntitySelected = _namedEntitySelected;
                bool isCountWordsPertimeSelected = _countWordsPertimeSelected;
                bool isAverageSelected = _averageSelected;
                bool isMaxSelected = _maxSelected;
                bool isMinSelected = _minSelected;
                String barenToken = barenTokenController.text;
                List<String> tags = tagsController.text.split(';');
                String videoId = videoIdController.text;
                                List<String> wordsToCount =
                    wordsToCountController.text.split(';');
                    await start(
                    finalDataSourceType,
                    finalDataTypeFile,
                    finalSmartWatchOptions,
                    isHeatMapSelected,
                    isBarChart,
                    isWordCloudSelected,
                    isLineChartSelected,
                    isCountWordSelected,
                    isNamedEntitySelected,
                    isCountWordsPertimeSelected,
                    barenToken,
                    tags,
                    videoId,
                    wordsToCount,
                    isAverageSelected,
                    isMaxSelected,
                    isMinSelected,
                    resultMap);  
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const DrawerCustom(),
      appBar: AppBar(
        backgroundColor: Colors.blue,
        title: const Text('Hopper Framework',
            style: TextStyle(
              color: Colors.white,
              fontSize: 24,
            )),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  const Align(
                    alignment: Alignment.topLeft,
                    child: Text('Select data source:',
                        textAlign: TextAlign.start,
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16,
                        )),
                  ),
                  RadioListTile(
                    title: const Text('X'),
                    value: 'X',
                    groupValue: selectedOption,
                    onChanged: (value) {
                      setState(() {
                        selectedOption = value.toString();
                      });
                    },
                  ),
                  RadioListTile(
                    title: const Text('YouTube'),
                    value: 'YouTube',
                    groupValue: selectedOption,
                    onChanged: (value) {
                      setState(() {
                        selectedOption = value.toString();
                      });
                    },
                  ),
                  RadioListTile(
                    title: const Text('Smartwatch'),
                    value: 'Smartwatch',
                    groupValue: selectedOption,
                    onChanged: (value) {
                      setState(() {
                        selectedOption = value.toString();
                      });
                    },
                  ),
                  RadioListTile(
                    title: const Text('File'),
                    value: 'File',
                    groupValue: selectedOption,
                    onChanged: (value) {
                      setState(() {
                        selectedOption = value.toString();
                      });
                    },
                  ),
                ],
              ),
            ),
            Column(
              children: [
                Visibility(
                  visible: selectedOption == 'File' ||
                      selectedOption == 'Smartwatch',
                  child: Column(
                    children: [
                      Visibility(
                        visible: selectedOption == 'File',
                        child: const Padding(
                          padding: EdgeInsets.all(8.0),
                          child: Align(
                            alignment: Alignment.topLeft,
                            child: Text('Select the type of data:',
                                textAlign: TextAlign.start,
                                style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 16,
                                )),
                          ),
                        ),
                      ),
                       Visibility(
                        visible: selectedOption == 'File',
                        child: RadioListTile(
                          title: const Text('YouTube'),
                          value: 'YouTube',
                          groupValue: selectedOptionFile,
                          onChanged: (value) {
                            setState(() {
                              selectedOptionFile = value.toString();
                            });
                          },
                        ),
                      ),
                       Visibility(
                        visible: selectedOption == 'File',
                        child: RadioListTile(
                          title: const Text('X'),
                          value: 'X',
                          groupValue: selectedOptionFile,
                          onChanged: (value) {
                            setState(() {
                              selectedOptionFile = value.toString();
                            });
                          },
                        ),
                      ),
                      Visibility(
                          visible: selectedOption == 'Smartwatch',
                          child: Column(
                            children: [
                              const Padding(
                                padding: EdgeInsets.all(8.0),
                                child: Align(
                                  alignment: Alignment.topLeft,
                                  child: Text(
                                      'Select the type of data from SmartWatch:',
                                      textAlign: TextAlign.start,
                                      style: TextStyle(
                                        color: Colors.black,
                                        fontSize: 16,
                                      )),
                                ),
                              ),
                              RadioListTile(
                                title: const Text('Heart beats'),
                                value: 'Heart beats',
                                groupValue: selectedOptionSmartWatch,
                                onChanged: (value) {
                                  setState(() {
                                    selectedOptionSmartWatch = value.toString();
                                  });
                                },
                              ),
                              RadioListTile(
                                title: const Text('Steps'),
                                value: 'Steps',
                                groupValue: selectedOptionSmartWatch,
                                onChanged: (value) {
                                  setState(() {
                                    selectedOptionSmartWatch = value.toString();
                                  });
                                },
                              ),
                              RadioListTile(
                                title: const Text('Sleep'),
                                value: 'Sleep',
                                groupValue: selectedOptionSmartWatch,
                                onChanged: (value) {
                                  setState(() {
                                    selectedOptionSmartWatch = value.toString();
                                  });
                                },
                              ),
                            ],
                          )),
                      ElevatedButton(
                        onPressed: () async {
                              // // aqui pode enviar este dado para algum endpoint de dados no datasource vamos tratar o caso
     
                                      final FileUploadInputElement input = FileUploadInputElement()
              ..accept = 'text/csv'; // Specify the accepted file type(s)

            input.click();

            await input.onChange.first;

            final files = input.files;
            if (files != null && files.isNotEmpty) {
              final file = files[0];
              final reader = FileReader();

              reader.onLoadEnd.listen((event) async {
                if (reader.result != null) {
                  final String content = reader.result.toString();
                 await  _processCSV(content);
                }
              });

              reader.readAsText(file);
            }
                          // // Add your button click logic here
                          // FileUploadInputElement input =
                          //     FileUploadInputElement()..click();

                          // input.onChange.listen((Event e) {
                          //   final List<File> files = input.files!;
                          //   if (files.isNotEmpty) {
                          //     _handleFileUpload(files.first);
                          //   }
                          // });

                          // // Trigger the file picker dialog
                          // input.click();
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.blue,
                        ),
                        child: const Text(
                          'Choose file to upload',
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                      ),
                      Text(
                        fileName,
                        style: const TextStyle(
                          color: Colors.black,
                        ),
                      ),
                    ],
                  ),
                ),
                Visibility(
                    visible: selectedOption == 'X',
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Column(
                            children: [
                              const SizedBox(
                                height: 12,
                              ),
                              Align(
                                alignment: Alignment.topLeft,
                                child: SizedBox(
                                  width: 200,
                                  child: TextField(
                                    controller: barenTokenController,
                                    decoration: const InputDecoration(
                                      labelText: 'Enter the Baren token:',
                                      border: OutlineInputBorder(),
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(
                                height: 20,
                              ),
                              Align(
                                alignment: Alignment.topLeft,
                                child: SizedBox(
                                  width: 200,
                                  child: TextField(
                                    controller: tagsController,
                                    decoration: const InputDecoration(
                                      labelText: 'Enter the Tags:',
                                      border: OutlineInputBorder(),
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(
                                height: 20,
                              ),
                              Align(
                                alignment: Alignment.topLeft,
                                child: SizedBox(
                                  width: 200,
                                  child: TextField(
                                    controller: wordsToCountController,
                                    decoration: const InputDecoration(
                                      labelText: 'Words to count:',
                                      border: OutlineInputBorder(),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    )),
                Visibility(
                    visible: selectedOption == 'YouTube',
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Column(
                            children: [
                              const SizedBox(
                                height: 12,
                              ),
                              Align(
                                alignment: Alignment.topLeft,
                                child: SizedBox(
                                  width: 200,
                                  child: TextField(
                                    controller: barenTokenController,
                                    decoration: const InputDecoration(
                                      labelText: 'Enter the Baren token:',
                                      border: OutlineInputBorder(),
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(
                                height: 20,
                              ),
                              Align(
                                alignment: Alignment.topLeft,
                                child: SizedBox(
                                  width: 200,
                                  child: TextField(
                                    controller: videoIdController,
                                    decoration: const InputDecoration(
                                      labelText: 'Enter the Video id:',
                                      border: OutlineInputBorder(),
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(
                                height: 20,
                              ),
                              Align(
                                alignment: Alignment.topLeft,
                                child: SizedBox(
                                  width: 200,
                                  child: TextField(
                                    controller: wordsToCountController,
                                    decoration: const InputDecoration(
                                      labelText: 'Words to count:',
                                      border: OutlineInputBorder(),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ))
              ],
            ),
            Visibility(
              visible: selectedOption == 'Smartwatch',
              child: Column(
                children: [
                  const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Align(
                      alignment: Alignment.topLeft,
                      child: Text('Select Visualization:',
                          textAlign: TextAlign.start,
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 16,
                          )),
                    ),
                  ),
                  CheckboxListTile(
                    title: const Text('HeatMap'),
                    value: _heatMapSelected,
                    onChanged: (value) {
                      setState(() {
                        _heatMapSelected = value!;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text('Line Chart'),
                    value: _lineChartSelected,
                    onChanged: (value) {
                      setState(() {
                        _lineChartSelected = value!;
                      });
                    },
                  ),
                ],
              ),
            ),
            Visibility(
              visible: ((selectedOptionFile == 'YouTube' || selectedOptionFile == 'X') && selectedOption == 'File') ||
                  selectedOption == 'YouTube' ||
                  selectedOption == 'X',
              child: Column(
                children: [
                  const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Align(
                      alignment: Alignment.topLeft,
                      child: Text('Select Visualization:',
                          textAlign: TextAlign.start,
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 16,
                          )),
                    ),
                  ),
                  CheckboxListTile(
                    title: const Text('Bar Chart'),
                    value: _barChartSelected,
                    onChanged: (value) {
                      setState(() {
                        _barChartSelected = value!;
                        _namedEntitySelected = value;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text('Line Chart'),
                    value: _lineChartSelected,
                    onChanged: (value) {
                      setState(() {
                        _lineChartSelected = value!;
                        _countWordsPertimeSelected = value;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text('Word Cloud'),
                    value: _wordCloudSelected,
                    onChanged: (value) {
                      setState(() {
                        _wordCloudSelected = value!;
                        _countWordSelected = value;
                      });
                    },
                  ),
                ],
              ),
            ),
            Visibility(
              visible: ((selectedOptionFile == 'YouTube' || selectedOptionFile == 'X') && selectedOption == 'File')  ||
                  selectedOption == 'YouTube' ||
                  selectedOption == 'X',
              child: Column(
                children: [
                  const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Align(
                      alignment: Alignment.topLeft,
                      child: Text('Select algorithms for processing:',
                          textAlign: TextAlign.start,
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 16,
                          )),
                    ),
                  ),
                  CheckboxListTile(
                    title: const Text('Count words'),
                    value: _countWordSelected,
                    onChanged: (value) {
                      setState(() {
                        _countWordSelected = value!;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text('Named entity'),
                    value: _namedEntitySelected,
                    onChanged: (value) {
                      setState(() {
                        _namedEntitySelected = value!;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text('count words pertime'),
                    value: _countWordsPertimeSelected,
                    onChanged: (value) {
                      setState(() {
                        _countWordsPertimeSelected = value!;
                      });
                    },
                  ),
                ],
              ),
            ),
            Visibility(
              visible:  selectedOption == 'Smartwatch',
              child: Column(
                children: [
                  const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Align(
                      alignment: Alignment.topLeft,
                      child: Text('Select algorithms for processing:',
                          textAlign: TextAlign.start,
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 16,
                          )),
                    ),
                  ),
                  CheckboxListTile(
                    title: const Text('Average'),
                    value: _averageSelected,
                    onChanged: (value) {
                      setState(() {
                        _averageSelected = value!;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text('Minimum'),
                    value: _minSelected,
                    onChanged: (value) {
                      setState(() {
                        _minSelected = value!;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text('Maximum'),
                    value: _maxSelected,
                    onChanged: (value) {
                      setState(() {
                        _maxSelected = value!;
                      });
                    },
                  ),
                ],
              ),
            ),
            ElevatedButton(
              onPressed: () async {
                // Aqui vamos pegar tudo que foi selecionado e enviar para a parte que vai
                // lidar com o envio dos dados
                String finalDataSourceType = selectedOption;
                String finalDataTypeFile = selectedOptionFile;
                String? finalSmartWatchOptions = selectedOptionSmartWatch;
                bool isBarChart = _barChartSelected;
                bool isHeatMapSelected = _heatMapSelected;
                bool isLineChartSelected = _lineChartSelected;
                bool isWordCloudSelected = _wordCloudSelected;
                bool isCountWordSelected = _countWordSelected;
                bool isNamedEntitySelected = _namedEntitySelected;
                bool isCountWordsPertimeSelected = _countWordsPertimeSelected;
                bool isAverageSelected = _averageSelected;
                bool isMaxSelected = _maxSelected;
                bool isMinSelected = _minSelected;
                String barenToken = barenTokenController.text;
                List<String> tags = tagsController.text.split(';');
                String videoId = videoIdController.text;
                List<String> wordsToCount =
                    wordsToCountController.text.split(';');
                await start(
                    finalDataSourceType,
                    finalDataTypeFile,
                    finalSmartWatchOptions,
                    isHeatMapSelected,
                    isBarChart,
                    isWordCloudSelected,
                    isLineChartSelected,
                    isCountWordSelected,
                    isNamedEntitySelected,
                    isCountWordsPertimeSelected,
                    barenToken,
                    tags,
                    videoId,
                    wordsToCount,
                    isAverageSelected,
                    isMaxSelected,
                    isMinSelected,
                    null);
                setState(() {
                  begin = 'Started';
                });
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue,
              ),
              child: const Text(
                'Start',
                style: TextStyle(
                  color: Colors.white,
                ),
              ),
            ),
            const SizedBox(
              height: 12,
            ),
            Text(begin)
          ],
        ),
      ),
    );
  }
}
