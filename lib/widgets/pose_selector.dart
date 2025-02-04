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
  Widget build(BuildContext context) {
    Color activeColor = widget.redAlliance ? Colors.red[700]! : Colors.indigo;
  
    List<Map<String, double?>> posePositions = [
      {'left': 220.0, 'bottom': 53.0},
      {'right': 220.0, 'bottom': 53.0},
      {'right': 114.0, 'bottom': 115.0},
      {'right': 53.0, 'bottom': 222.0},
      {'right': 53.0, 'top': 222.0},
      {'right': 114.0, 'top': 115.0},
      {'right': 220.0, 'top': 51.0},
      {'left': 220.0, 'top': 51.0},
      {'left': 114.0, 'top': 115.0},
      {'left': 53.0, 'top': 222.0},
      {'left': 53.0, 'bottom': 222.0},
      {'left': 114.0, 'bottom': 115.0},
    ];

    return SizedBox(
      width: 1920,
      height: 1080,
      child: Stack(
        children: [
          buildReefSelector(posePositions, activeColor),
          buildCoralStation(left: true, startPose: 13, activeColor: activeColor),
          buildCoralStation(left: false, startPose: 16, activeColor: activeColor)
        ],
      ),
    );
  }

  Widget buildReefSelector(List<Map<String, double?>> positions, Color activeColor) {
    return Positioned(
      left: 660,
      bottom: 275,
      child: SizedBox(
        width: 600,
        height: 600,
        child: Stack(
          children: [
            Image.asset(widget.redAlliance ? 'images/red_reef.png' : 'images/blue_reef.png'),
            ...List.generate(positions.length, (index) {
              return buildPoseCheckbox(
                position: positions[index],
                poseId: widget.redAlliance ? index + 1 : (index > 5 ? index + 13 : index + 25),
                isReef: true,
                activeColor: activeColor,
              );
            }),
          ],
        ),
      ),
    );
  }

  Widget buildCoralStation({required bool left, required int startPose, required Color activeColor}) {
    List<Map<String, double?>> positions = [
      {left ? 'left' : 'right': 65.0, 'bottom': 198.0},
      {left ? 'left' : 'right': 200.0, 'bottom': 118.0},
      {left ? 'left' : 'right': 330.0, 'bottom': 40.0},
    ];

    return Positioned(
      left: left ? 0 : null,
      right: left ? null : 0,
      bottom: 0,
      child: SizedBox(
        width: 450,
        height: 270,
        child: Stack(
          children: [
            Transform.flip(
              flipX: left,
              child: Image.asset('images/coral_station.png'),
            ),
            ...List.generate(3, (index) {

              return buildPoseCheckbox(
                position: positions[index],
                poseId: widget.redAlliance ? startPose + index : startPose + 18 + index,
                isReef: false,
                activeColor: activeColor,
              );
            }),
          ],
        ),
      ),
    );
  }

  Widget buildPoseCheckbox({required Map<String, double?> position, required int poseId, required bool isReef, required Color activeColor}) {
    return Positioned(
      left: position['left'],
      right: position['right'],
      top: position['top'],
      bottom: position['bottom'],
      child: Transform.scale(
        scale: 5,
        child: Checkbox(
          value: selected == poseId,
          splashRadius: 9,
          checkColor: Colors.white,
          activeColor: activeColor,
          shape: const CircleBorder(),
          side: const BorderSide(width: 0.5, color: Colors.grey),
          onChanged: (value) {
            setState(() {
              if (value ?? false) {
                selected = poseId;
                if (!isReef) {
                  widget.dashboardState.setTargetPose(selected);
                } else {
                  widget.dashboardState.setTargetPose(widget.redAlliance ? selected : selected - 18);
                }
              }
            });
          },
        ),
      ),
    );
  }
}