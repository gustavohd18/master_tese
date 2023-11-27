import 'package:configuration/drawer_custom.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hopper framework',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
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
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Welcome to Hopper Framework',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 24,
                )),
            Text(
                'Please select an option in the navigation menu to get started',
                style: TextStyle(
                  color: Colors.grey,
                  fontSize: 20,
                )),
          ],
        ),
      ),
    );
  }
}
