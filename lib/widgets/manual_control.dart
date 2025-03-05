import 'package:flutter/material.dart';
import 'package:accelerationstation/services/dashboard_state.dart';

class ManualControlIndicator extends StatelessWidget {
  final DashboardState dashboardState;

  const ManualControlIndicator({
    super.key,
    required this.dashboardState,
  });

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<bool>(
      stream: dashboardState.isManualControl(),
      builder: (context, snapshot) {
        bool isManualControl = snapshot.data ?? false; // Default to false (red)

        return Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              "Manual Control: ",
              style: TextStyle(
                color: Colors.white,
                fontFamily: "Cascadia Code",
                fontSize: 40,
                fontWeight: FontWeight.bold,
              ),
            ),
            Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isManualControl ? Colors.green : Colors.red,
                border: Border.all(color: Colors.white, width: 4)
              ),
            ),
          ],
        );
      },
    );
  }
}
