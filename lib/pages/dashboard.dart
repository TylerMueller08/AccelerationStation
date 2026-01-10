import 'package:accelerationstation/services/dashboard_state.dart';
import 'package:accelerationstation/widgets/autonomous_selector.dart';
import 'package:accelerationstation/widgets/match_timer.dart';
import 'package:accelerationstation/widgets/footer_widgets.dart';
import 'package:accelerationstation/widgets/pose_selector.dart';
import 'package:flutter/material.dart';

class Dashboard extends StatelessWidget {
  final DashboardState dashboardState;

  const Dashboard({
    super.key,
    required this.dashboardState
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: StreamBuilder<bool>(
        stream: dashboardState.isRedAlliance(),
        initialData: false,
        builder: (context, snapshot) {
          final isRed = snapshot.data ?? false;

          return Stack(
            children: [
              Align(
                alignment: Alignment.topCenter,
                child: PoseSelector(
                  dashboardState: dashboardState,
                  redAlliance: isRed
                ),
              ),
              Align(
                alignment: Alignment.centerLeft,
                child: Padding(
                  padding: const EdgeInsets.only(left: 40),
                  child: FractionallySizedBox(
                    widthFactor: 0.275,
                    child: AutonomousSelector(
                      dashboardState: dashboardState,
                      redAlliance: isRed
                    )
                  ),
                ),
              ),
              Align(
                alignment: Alignment.bottomCenter,
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 24),
                  child: MatchTimer(dashboardState: dashboardState),
                ),
              ),
              FooterLeft(),
              FooterRight(dashboardState),
            ],
          );
        },
      ),
    );
  }
}