import 'package:accelerationstation/services/dashboard_state.dart';
import 'package:flutter/material.dart';

class PoseSelector extends StatefulWidget {
  final DashboardState dashboardState;
  final bool redAlliance;

  const PoseSelector({
    super.key,
    required this.dashboardState,
    required this.redAlliance,
  });

  @override
  State<PoseSelector> createState() => PoseSelectorState();
}

class PoseSelectorState extends State<PoseSelector> {
  int selected = 0;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Color activeColor = widget.redAlliance ? Colors.red[700]! : Colors.indigo;
  
    return SizedBox(
      width: 1920,
      height: 1080,
      child: Stack(
        children: [
          // Reef Selector
          Positioned(
            left: 660,
            bottom: 275,
            child: SizedBox(
              width: 600,
              height: 600,
              child: Stack(
                children: [
                  widget.redAlliance ? Image.asset('images/red_reef.png') : Image.asset('images/blue_reef.png'),
                  Positioned(
                    left: 220,
                    bottom: 53,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 1 || selected == 25,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 1 : 25;
                              widget.dashboardState.setTargetPose(widget.redAlliance ? selected : selected - 18);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    right: 220,
                    bottom: 53,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 2 || selected == 26,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 2 : 26;
                              widget.dashboardState.setTargetPose(widget.redAlliance ? selected : selected - 18);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    right: 114,
                    bottom: 115,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 3 || selected == 27,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 3 : 27;
                              widget.dashboardState.setTargetPose(widget.redAlliance ? selected : selected - 18);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    right: 53,
                    bottom: 222,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 4 || selected == 28,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 4 : 28;
                              widget.dashboardState.setTargetPose(widget.redAlliance ? selected : selected - 18);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    right: 53,
                    top: 222,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 5 || selected == 29,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 5 : 29;
                              widget.dashboardState.setTargetPose(widget.redAlliance ? selected : selected - 18);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    right: 114,
                    top: 115,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 6 || selected == 30,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 6 : 30;
                              widget.dashboardState.setTargetPose(widget.redAlliance ? selected : selected - 18);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    right: 220,
                    top: 51,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 7 || selected == 19,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 7 : 19;
                              widget.dashboardState.setTargetPose(widget.redAlliance ? selected : selected - 18);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    left: 220,
                    top: 51,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 8 || selected == 20,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 8 : 20;
                              widget.dashboardState.setTargetPose(widget.redAlliance ? selected : selected - 18);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    left: 114,
                    top: 115,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 9 || selected == 21,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 9 : 21;
                              widget.dashboardState.setTargetPose(widget.redAlliance ? selected : selected - 18);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    left: 53,
                    top: 222,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 10 || selected == 22,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 10 : 22;
                              widget.dashboardState.setTargetPose(widget.redAlliance ? selected : selected - 18);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  // 11
                  Positioned(
                    left: 53,
                    bottom: 222,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 11 || selected == 23,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 11 : 23;
                              widget.dashboardState.setTargetPose(widget.redAlliance ? selected : selected - 18);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    left: 114,
                    bottom: 115,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 12 || selected == 24,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 12 : 24;
                              widget.dashboardState.setTargetPose(widget.redAlliance ? selected : selected - 18);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Left Coral Station
          Positioned(
            left: 0,
            bottom: 0,
            child: SizedBox(
              width: 450,
              height: 270,
              child: Stack(
                children: [
                  Transform.flip(
                    flipX: true,
                    child: Image.asset('images/coral_station.png'),
                  ),
                  Positioned(
                    left: 65,
                    bottom: 198,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 13 || selected == 31,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 13 : 31;
                              widget.dashboardState.setTargetPose(selected);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    left: 200,
                    bottom: 118,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 14 || selected == 32,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 14 : 32;
                              widget.dashboardState.setTargetPose(selected);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    left: 330,
                    bottom: 40,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 15 || selected == 33,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 15 : 33;
                              widget.dashboardState.setTargetPose(selected);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                ]
              )
            )
          ),

          // Right Coral Station
          Positioned(
            right: 0,
            bottom: 0,
            child: SizedBox(
              width: 450,
              height: 270,
              child: Stack(
                children: [
                  Transform.flip(
                    flipX: false,
                    child: Image.asset('images/coral_station.png'),
                  ),
                  Positioned(
                    right: 65,
                    bottom: 198,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 16 || selected == 34,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 16 : 34;
                              widget.dashboardState.setTargetPose(selected);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    right: 200,
                    bottom: 118,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 17 || selected == 35,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 17 : 35;
                              widget.dashboardState.setTargetPose(selected);
                            }
                          });
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    right: 330,
                    bottom: 40,
                    child: Transform.scale(
                      scale: 5,
                      child: Checkbox(
                        value: selected == 18 || selected == 36,
                        splashRadius: 9,
                        checkColor: Colors.white,
                        activeColor: activeColor,
                        shape: const CircleBorder(),
                        side: const BorderSide(width: 0.5, color: Colors.grey),
                        onChanged: (value) {
                          setState(() {
                            if (value ?? false) {
                              selected = widget.redAlliance ? 18 : 36;
                              widget.dashboardState.setTargetPose(selected);
                            }
                          });
                        },
                      ),
                    ),
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