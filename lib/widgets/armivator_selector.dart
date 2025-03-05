import 'package:accelerationstation/services/dashboard_state.dart';
import 'package:flutter/material.dart';

class ArmivatorSelector extends StatefulWidget {
  final DashboardState dashboardState;
  final bool redAlliance;

  const ArmivatorSelector({
    super.key,
    required this.dashboardState,
    required this.redAlliance,
  });

  @override
  State<ArmivatorSelector> createState() => ArmivatorSelectorState();
}

class ArmivatorSelectorState extends State<ArmivatorSelector> {
  int selected = 0;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Color activeColor = widget.redAlliance ? Colors.red[700]! : Colors.indigo;

    return SizedBox(
      width: 200,
      height: 400,
      child: Stack(
        children: [
          Positioned(
            left: 60,
            top: 0,
            child: Transform.scale(
              scale: 4.75,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(
                    child: Text(
                      "L4",
                      style: TextStyle(
                        color: Colors.white,
                        fontFamily: "Cascadia Code",
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  Checkbox(
                    value: selected == 4,
                    splashRadius: 9,
                    checkColor: Colors.white,
                    activeColor: activeColor,
                    shape: const CircleBorder(),
                    side: const BorderSide(width: 0.5, color: Colors.grey),
                    onChanged: (value) {
                      setState(() {
                        if (value ?? false) {
                          selected = 4;
                          widget.dashboardState.setTargetArmivatorState(selected);
                        }
                      });
                    },
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            left: 60,
            top: 100,
            child: Transform.scale(
              scale: 4.75,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(
                    child: Text(
                      "L3",
                      style: TextStyle(
                        color: Colors.white,
                        fontFamily: "Cascadia Code",
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  Checkbox(
                    value: selected == 3,
                    splashRadius: 9,
                    checkColor: Colors.white,
                    activeColor: activeColor,
                    shape: const CircleBorder(),
                    side: const BorderSide(width: 0.5, color: Colors.grey),
                    onChanged: (value) {
                      setState(() {
                        if (value ?? false) {
                          selected = 3;
                          widget.dashboardState.setTargetArmivatorState(selected);
                        }
                      });
                    },
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            left: 60,
            top: 200,
            child: Transform.scale(
              scale: 4.75,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(
                    child: Text(
                      "L2",
                      style: TextStyle(
                        color: Colors.white,
                        fontFamily: "Cascadia Code",
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  Checkbox(
                    value: selected == 2,
                    splashRadius: 9,
                    checkColor: Colors.white,
                    activeColor: activeColor,
                    shape: const CircleBorder(),
                    side: const BorderSide(width: 0.5, color: Colors.grey),
                    onChanged: (value) {
                      setState(() {
                        if (value ?? false) {
                          selected = 2;
                          widget.dashboardState.setTargetArmivatorState(selected);
                        }
                      });
                    },
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            left: 60,
            top: 300,
            child: Transform.scale(
              scale: 4.75,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(
                    child: Text(
                      "BM",
                      style: TextStyle(
                        color: Colors.white,
                        fontFamily: "Cascadia Code",
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  Checkbox(
                    value: selected == 1,
                    splashRadius: 9,
                    checkColor: Colors.white,
                    activeColor: activeColor,
                    shape: const CircleBorder(),
                    side: const BorderSide(width: 0.5, color: Colors.grey),
                    onChanged: (value) {
                      setState(() {
                        if (value ?? false) {
                          selected = 1;
                          widget.dashboardState.setTargetArmivatorState(selected);
                        }
                      });
                    },
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}