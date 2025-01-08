import 'package:accelerationstation/services/dashboard_state.dart';
import 'package:flutter/material.dart';

class ReefSelector extends StatefulWidget {
  final DashboardState dashboardState;
  final bool redAlliance;

  const ReefSelector({
    super.key,
    required this.dashboardState,
    required this.redAlliance,
  });

  @override
  State<ReefSelector> createState() => ReefSelectorState();
}

class ReefSelectorState extends State<ReefSelector> {
  int selected = 0;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Color activeColor = widget.redAlliance ? Colors.red[700]! : Colors.indigo;

    return SizedBox(
      width: 500,
      height: 500,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Stack(
          children: [
            widget.redAlliance ? Image.asset('images/red_reef.png') : Image.asset('images/blue_reef.png'),
            Positioned(
              left: 175,
              top: 37,
              child: Transform.scale(
                scale: 3.5,
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
                        widget.dashboardState.setReefPose(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              left: 275,
              top: 37,
              child: Transform.scale(
                scale: 3.5,
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
                        widget.dashboardState.setReefPose(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              left: 365,
              top: 90,
              child: Transform.scale(
                scale: 3.5,
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
                        widget.dashboardState.setReefPose(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              left: 413,
              top: 172,
              child: Transform.scale(
                scale: 3.5,
                child: Checkbox(
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
                        widget.dashboardState.setReefPose(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              left: 413,
              bottom: 172,
              child: Transform.scale(
                scale: 3.5,
                child: Checkbox(
                  value: selected == 5,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = 5;
                        widget.dashboardState.setReefPose(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              left: 365,
              bottom: 90,
              child: Transform.scale(
                scale: 3.5,
                child: Checkbox(
                  value: selected == 6,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = 6;
                        widget.dashboardState.setReefPose(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              left: 275,
              bottom: 37,
              child: Transform.scale(
                scale: 3.5,
                child: Checkbox(
                  value: selected == 7,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = 7;
                        widget.dashboardState.setReefPose(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              left: 175,
              bottom: 37,
              child: Transform.scale(
                scale: 3.5,
                child: Checkbox(
                  value: selected == 8,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = 8;
                        widget.dashboardState.setReefPose(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              right: 365,
              bottom: 90,
              child: Transform.scale(
                scale: 3.5,
                child: Checkbox(
                  value: selected == 9,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = 9;
                        widget.dashboardState.setReefPose(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              right: 413,
              bottom: 172,
              child: Transform.scale(
                scale: 3.5,
                child: Checkbox(
                  value: selected == 10,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = 10;
                        widget.dashboardState.setReefPose(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              right: 413,
              top: 172,
              child: Transform.scale(
                scale: 3.5,
                child: Checkbox(
                  value: selected == 11,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = 11;
                        widget.dashboardState.setReefPose(selected);
                      }
                    });
                  },
                ),
              ),
            ),
            Positioned(
              right: 365,
              top: 90,
              child: Transform.scale(
                scale: 3.5,
                child: Checkbox(
                  value: selected == 12,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = 12;
                        widget.dashboardState.setReefPose(selected);
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