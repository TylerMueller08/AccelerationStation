import 'package:accelerationstation/services/dashboard_state.dart';
import 'package:flutter/material.dart';

class BranchSelector extends StatefulWidget {
  final DashboardState dashboardState;
  final bool redAlliance;

  const BranchSelector({
    super.key,
    required this.dashboardState,
    required this.redAlliance,
  });

  @override
  State<BranchSelector> createState() => BranchSelectorState();
}

class BranchSelectorState extends State<BranchSelector> {
  int selected = 0;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Color activeColor = widget.redAlliance ? Colors.red[700]! : Colors.indigo;

    return SizedBox(
      width: 150,
      height: 400,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Stack(
          children: [
            Image.asset('images/branch.png'),
            Positioned(
              left: 25,
              bottom: 40,
              child: Transform.scale(
                scale: 2.25,
                child: Checkbox(
                  value: selected == 0,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = 0;
                        widget.dashboardState.setBranchHeight(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              left: 25,
              bottom: 160,
              child: Transform.scale(
                scale: 2.25,
                child: Checkbox(
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
                        widget.dashboardState.setBranchHeight(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              left: 25,
              bottom: 235,
              child: Transform.scale(
                scale: 2.25,
                child: Checkbox(
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
                        widget.dashboardState.setBranchHeight(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              left: 25,
              bottom: 340,
              child: Transform.scale(
                scale: 2.25,
                child: Checkbox(
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
                        widget.dashboardState.setBranchHeight(selected);
                      }
                    });
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}