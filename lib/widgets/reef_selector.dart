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
                  value: selected == 2 || selected == 20,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = widget.redAlliance ? 20 : 2;
                        widget.dashboardState.setReefPose(widget.redAlliance ? selected - 12 : selected);
                        widget.dashboardState.setConfirmedCondition(false);
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
                  value: selected == 1 || selected == 19,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = widget.redAlliance ? 19 : 1;
                        widget.dashboardState.setReefPose(widget.redAlliance ? selected - 12 : selected);
                        widget.dashboardState.setConfirmedCondition(false);
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
                  value: selected == 12 || selected == 18,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = widget.redAlliance ? 18 : 12;
                        widget.dashboardState.setReefPose(widget.redAlliance ? selected - 12 : selected);
                        widget.dashboardState.setConfirmedCondition(false);
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
                  value: selected == 11 || selected == 17,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = widget.redAlliance ? 17 : 11;
                        widget.dashboardState.setReefPose(widget.redAlliance ? selected - 12 : selected);
                        widget.dashboardState.setConfirmedCondition(false);
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
                  value: selected == 10 || selected == 16,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = widget.redAlliance ? 16 : 10;
                        widget.dashboardState.setReefPose(widget.redAlliance ? selected - 12 : selected);
                        widget.dashboardState.setConfirmedCondition(false);
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
                  value: selected == 9 || selected == 15,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = widget.redAlliance ? 15 : 9;
                        widget.dashboardState.setReefPose(widget.redAlliance ? selected - 12 : selected);
                        widget.dashboardState.setConfirmedCondition(false);
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
                  value: selected == 8 || selected == 14,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = widget.redAlliance ? 14 : 8;
                        widget.dashboardState.setReefPose(widget.redAlliance ? selected - 12 : selected);
                        widget.dashboardState.setConfirmedCondition(false);
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
                  value: selected == 7 || selected == 13,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = widget.redAlliance ? 13 : 7;
                        widget.dashboardState.setReefPose(widget.redAlliance ? selected - 12 : selected);
                        widget.dashboardState.setConfirmedCondition(false);
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
                  value: selected == 6 || selected == 24,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = widget.redAlliance ? 24 : 6;
                        widget.dashboardState.setReefPose(widget.redAlliance ? selected - 12 : selected);
                        widget.dashboardState.setConfirmedCondition(false);
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
                  value: selected == 5 || selected == 23,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = widget.redAlliance ? 23 : 5;
                        widget.dashboardState.setReefPose(widget.redAlliance ? selected - 12 : selected);
                        widget.dashboardState.setConfirmedCondition(false);
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
                  value: selected == 4 || selected == 22,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = widget.redAlliance ? 22 : 4;
                        widget.dashboardState.setReefPose(widget.redAlliance ? selected - 12 : selected);
                        widget.dashboardState.setConfirmedCondition(false);
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
                  value: selected == 3 || selected == 21,
                  splashRadius: 9,
                  checkColor: Colors.white,
                  activeColor: activeColor,
                  shape: const CircleBorder(),
                  side: const BorderSide(width: 0.5, color: Colors.grey),
                  onChanged: (value) {
                    setState(() {
                      if (value ?? false) {
                        selected = widget.redAlliance ? 21 : 3;
                        widget.dashboardState.setReefPose(widget.redAlliance ? selected - 12 : selected);
                        widget.dashboardState.setConfirmedCondition(false);
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