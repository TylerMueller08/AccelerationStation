import 'package:accelerationstation/services/dashboard_state.dart';
import 'package:flutter/material.dart';

class ManualEnabled extends StatefulWidget {
  final DashboardState dashboardState;
  final bool redAlliance;

  const ManualEnabled({
    super.key,
    required this.dashboardState,
    required this.redAlliance
  });

  @override
  State<ManualEnabled> createState() => ManualEnabledState();
}

class ManualEnabledState extends State<ManualEnabled> {
  bool isEnabled = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Color activeColor = widget.redAlliance ? Colors.red[700]! : Colors.indigo;

    return SizedBox(
      width: 280,
      height: 300,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Manual Control",
            style: TextStyle(fontSize: 34, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 18),
            child: Row(
              children: [
                SizedBox(
                  width: 215,
                  child: Text(
                    "Enabled",
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
                    value: isEnabled,
                    splashRadius: 9,
                    checkColor: Colors.white,
                    activeColor: activeColor,
                    shape: const CircleBorder(),
                    side: const BorderSide(width: 1.0, color: Colors.grey),
                    onChanged: (value) {
                      setState(() {
                        isEnabled = true;
                        widget.dashboardState.setManualControl(true);
                      });
                    },
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 18),
            child: Row(
              children: [
                SizedBox(
                  width: 215,
                  child: Text(
                    "Disabled",
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
                    value: !isEnabled,
                    splashRadius: 9,
                    checkColor: Colors.white,
                    activeColor: activeColor,
                    shape: const CircleBorder(),
                    side: const BorderSide(width: 1.0, color: Colors.grey),
                    onChanged: (value) {
                      setState(() {
                        isEnabled = false;
                        widget.dashboardState.setManualControl(false);
                      });
                    },
                  ),
                ),
              ],
            ),
          ),
        ],
      )
    );
  }
}