

import 'package:accelerationstation/services/dashboard_state.dart';
import 'package:flutter/material.dart';

class StationSelector extends StatefulWidget {
  final DashboardState dashboardState;
  final bool redAlliance;

  const StationSelector({
    super.key,
    required this.dashboardState,
    required this.redAlliance
  });

  @override
  State<StationSelector> createState() => _StationSelectorState();
}

class _StationSelectorState extends State<StationSelector> {
  int _selected = 0;

  @override
  void initState() {
    super.initState();

    // Listen
  }

  @override
  Widget build(BuildContext context) {
    Color activeColor = widget.redAlliance ? Colors.red[700]! : Colors.indigo;

    return SizedBox(
      width: 1300,
      height: 210,
      child: Stack(
        children: [
          // Left image
          Transform.flip(
            flipX: true,
            child: Image.asset('images/coral_station.png'),
          ),
          Positioned(
            left: null,
            right: 205,
            top: 45,
            child: Transform.scale(
              scale: 3.5,
              child: Checkbox(
                value: _selected == 0,
                splashRadius: 9,
                checkColor: Colors.white,
                activeColor: activeColor,
                shape: const CircleBorder(),
                side: const BorderSide(width: 0.5, color: Colors.grey),
                onChanged: (value) {
                  // setState(() {
                  //   if (value ?? false) {
                  //     _selected = 0;
                  //     widget.dashboardState.setChutePos(_selected);
                  //   }
                  // });
                },
              ),
            ),
          ),
          Positioned(
            left: null,
            right: 125,
            top: 95,
            child: Transform.scale(
              scale: 3.5,
              child: Checkbox(
                value: _selected == 1,
                splashRadius: 9,
                checkColor: Colors.white,
                activeColor: activeColor,
                shape: const CircleBorder(),
                side: const BorderSide(width: 0.5, color: Colors.grey),
                onChanged: (value) {
                  // setState(() {
                  //   if (value ?? false) {
                  //     _selected = 1;
                  //     widget.dashboardState.setChutePos(_selected);
                  //   }
                  // });
                },
              ),
            ),
          ),
          Positioned(
            left: null,
            right: 45,
            top: 145,
            child: Transform.scale(
              scale: 3.5,
              child: Checkbox(
                value: _selected == 2,
                splashRadius: 9,
                checkColor: Colors.white,
                activeColor: activeColor,
                shape: const CircleBorder(),
                side: const BorderSide(width: 0.5, color: Colors.grey),
                onChanged: (value) {
                  // setState(() {
                  //   if (value ?? false) {
                  //     _selected = 2;
                  //     widget.dashboardState.setChutePos(_selected);
                  //   }
                  // });
                },
              ),
            ),
          ),
          // Right Image (Flipped)
          Positioned(
            right: 0,
            bottom: 0,
            child: SizedBox(
              width: 350, // Half the total width
              height: 210,
              child: Stack(
                children: [
                  Transform.flip(
                    flipX: false,
                    child: Image.asset('images/coral_station.png'),
                  ),
                  // Place flipped checkboxes here, if needed, similar to above.
                  // You can repeat the checkbox placement logic but change the
                  // positioning to fit the flipped side.
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}