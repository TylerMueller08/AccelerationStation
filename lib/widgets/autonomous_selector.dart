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
  final Map<String, List<String>> autonModes = {
    'Left': ['Move Out', '1-Coral', '2-Coral', '3-Coral'],
    'Center': ['Move Out', '1-Coral'],
    'Right': ['Move Out', '1-Coral', '2-Coral', '3-Coral']
  };

  String? selectedMainCategory = 'Left';
  String? selectedSubCategory = 'Move Out';

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 420,
      height: 230,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Select Autonomous",
            style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold, fontFamily: "Cascadia Code",)),
          SizedBox(height: 8),
          Container(
            padding: EdgeInsets.symmetric(vertical: 10),
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey),
              borderRadius: BorderRadius.circular(10),
            ),
            child: DropdownButton<String>(
              value: selectedMainCategory,
              onChanged: (String? newValue) {
                setState(() {
                  selectedMainCategory = newValue;
                  selectedSubCategory = autonModes[selectedMainCategory!]?[0];
                });
              },
              items: autonModes.keys.map<DropdownMenuItem<String>>((String key) {
                return DropdownMenuItem<String>(
                  value: key,
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16.0),
                    child: Text(
                      key,
                      style: TextStyle(fontSize: 36),
                    ),
                  ),
                );
              }).toList(),
              isExpanded: true,
              underline: Container(),
            ),
          ),
          if (selectedMainCategory != null) ...[
            SizedBox(height: 16),
            Container(
              padding: EdgeInsets.symmetric(vertical: 10),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey),
                borderRadius: BorderRadius.circular(10),
              ),
              child: DropdownButton<String>(
                value: selectedSubCategory,
                onChanged: (String? newValue) {
                  setState(() {
                    selectedSubCategory = newValue;
                    widget.dashboardState.setSelectedAutonomous(
                        '$selectedMainCategory, $selectedSubCategory');
                  });
                },
                items: autonModes[selectedMainCategory!]!
                    .map<DropdownMenuItem<String>>((String subCategory) {
                  return DropdownMenuItem<String>(
                    value: subCategory,
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16.0),
                      child: Text(
                        subCategory,
                        style: TextStyle(fontSize: 36),
                      ),
                    ),
                  );
                }).toList(),
                isExpanded: true,
                underline: Container(), 
              ),
            ),
          ],
        ],
      ),
    );
  }
}
