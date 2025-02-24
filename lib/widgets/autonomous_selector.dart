import 'package:accelerationstation/services/dashboard_state.dart';
import 'package:flutter/material.dart';

class AutonomousSelector extends StatefulWidget {
  final DashboardState dashboardState;
  final bool redAlliance;

  const AutonomousSelector({
    super.key,
    required this.dashboardState,
    required this.redAlliance,
  });

  @override
  State<AutonomousSelector> createState() => AutonomousSelectorState();
}

class AutonomousSelectorState extends State<AutonomousSelector> {
  final List<String> autonModes = [
    'Do Nothing',
    'Left, Move Out',
    'Left, 1-Coral',
    'Center, Move Out',
    'Center, 1-Coral',
    'Right, Move Out',
    'Right, 1-Coral'
  ];

  String selectedAuton = 'Do Nothing';

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Color activeColor = widget.redAlliance ? Colors.red[700]! : Colors.indigo;

    return SizedBox(
      width: 350,
      height: 800,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Select Autonomous:",
              style: TextStyle(fontSize: 34, fontWeight: FontWeight.bold)),
          SizedBox(height: 8),
          for (var mode in autonModes)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 18),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(
                    width: 300,
                    child: Text(
                      mode,
                      style: TextStyle(
                        color: Colors.white,
                        fontFamily: "Cascadia Code",
                        fontSize: 26
                      ),
                    ),
                  ),
                  Transform.scale(
                    scale: 3,
                    child: Checkbox(
                      value: selectedAuton == mode,
                      splashRadius: 9,
                      checkColor: Colors.white,
                      activeColor: activeColor,
                      shape: const CircleBorder(),
                      side: const BorderSide(width: 1.0, color: Colors.grey),
                      onChanged: (value) {
                        setState(() {
                          if (value ?? false) {
                            selectedAuton = mode;
                            widget.dashboardState.setSelectedAutonomous(mode);
                          }
                        });
                      },
                    ),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}