import 'package:accelerationstation/services/dashboard_state.dart';
import 'package:accelerationstation/widgets/confirm_button.dart';
import 'package:accelerationstation/widgets/match_timer.dart';
import 'package:accelerationstation/widgets/pose_selector.dart';
import 'package:flutter/material.dart';

class Dashboard extends StatefulWidget {
  final DashboardState dashboardState;

  const Dashboard({
    super.key,
    required this.dashboardState,
  });

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  bool _redAlliance = false;

  @override
  void initState() {
    super.initState();

    widget.dashboardState.isRedAlliance().listen((event) {
      if (event != _redAlliance) {
        setState(() {
          _redAlliance = event;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Focus(
        skipTraversal: true,
        canRequestFocus: false,
        descendantsAreFocusable: false,
        descendantsAreTraversable: false,
        child: Stack(
          children: [
            // Align(
            //   alignment: Alignment.bottomCenter,
            //   child: Padding(
            //     padding: const EdgeInsets.only(bottom: 15),
            //     child: MatchTimer(
            //       dashboardState: widget.dashboardState,
            //     ),
            //   ),
            // ),
            Align(
              alignment: Alignment.center,
              child: PoseSelector(
                dashboardState: widget.dashboardState,
                redAlliance: _redAlliance,
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Padding(
                padding: EdgeInsets.only(bottom: 15),
                child: ConfirmButton(
                  dashboardState: widget.dashboardState,
                  redAlliance: _redAlliance,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}