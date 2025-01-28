import 'package:accelerationstation/pages/dashboard.dart';
import 'package:accelerationstation/services/dashboard_state.dart';
import 'package:flutter/material.dart';
import 'package:window_manager/window_manager.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await windowManager.ensureInitialized();

  WindowOptions windowOptions = const WindowOptions(
    size: Size(1920, 1080),
    minimumSize: Size(1920, 1080),
    center: true,
    title: 'Rapid Acceleration Station',
  );

  windowManager.waitUntilReadyToShow(windowOptions, () async {
    await windowManager.show();
    await windowManager.focus();
  });

  DashboardState dashboardState = DashboardState();
  
  runApp(DashboardApp(dashboardState: dashboardState));
}

class DashboardApp extends StatelessWidget {
  final DashboardState dashboardState;

  const DashboardApp({
    super.key,
    required this.dashboardState,
  });

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dashboard',
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: Colors.indigo,
        brightness: Brightness.dark,
      ),
      home: Dashboard(dashboardState: dashboardState),
    );
  }
}