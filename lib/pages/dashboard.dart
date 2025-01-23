import 'package:accelerationstation/services/dashboard_state.dart';
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
            Align(
              alignment: Alignment.bottomCenter,
              child: Padding(
                padding: const EdgeInsets.only(bottom: 15),
                child: MatchTimer(
                  dashboardState: widget.dashboardState,
                ),
              ),
            ),
            Align(
              alignment: Alignment.center,
              child: PoseSelector(
                dashboardState: widget.dashboardState,
                redAlliance: _redAlliance,
              ),
            ),
            Align(
              alignment: Alignment.bottomLeft,
              child: Padding(
                padding: const EdgeInsets.all(4.0),
                child: Text(
                  'Created by Tyler Mueller',
                  style: TextStyle(
                    color: Colors.grey,
                    fontSize: 13,
                  ),
                ),
              ),
            ),
            Align(
              alignment: Alignment.bottomRight,
              child: Padding(
                padding: const EdgeInsets.all(4.0),
                child: StreamBuilder(
                  stream: widget.dashboardState.connectionStatus(),
                  builder: (context, snapshot) {
                    bool connected = snapshot.data ?? false;

                    return Text(
                      'NetworkTables V4.1: ${connected ? 'Connected' : 'Disconnected'}',
                      style: TextStyle(
                        color: connected ? Colors.green : Colors.red,
                        fontSize: 13,
                      ),
                    );
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