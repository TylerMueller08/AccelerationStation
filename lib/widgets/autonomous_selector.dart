import 'package:accelerationstation/services/dashboard_state.dart';
import 'package:accelerationstation/services/dashboard_theme.dart';
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
  State<AutonomousSelector> createState() => _AutonomousSelectorState();
}

class _AutonomousSelectorState extends State<AutonomousSelector> {
  final List<String> autonomousOptions = [
    'Do Nothing',
    'Example',
  ];

  String? selectedAuton = 'Do Nothing';

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 16.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Select Autonomous",
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
              fontFamily: DashboardTheme.font,
            ),
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey),
              borderRadius: BorderRadius.circular(10),
            ),
            child: DropdownButton<String>(
              value: selectedAuton,
              isExpanded: true,
              underline: Container(),
              onChanged: (String? newValue) {
                setState(() {
                  selectedAuton = newValue;
                  widget.dashboardState.setAutonomous(selectedAuton!);
                });
              },
              items: autonomousOptions.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(
                    value,
                    style: const TextStyle(
                      fontSize: 28,
                      fontFamily: DashboardTheme.font,
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }
}
