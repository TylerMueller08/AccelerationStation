import 'package:accelerationstation/services/dashboard_state.dart';
import 'package:flutter/material.dart';

class ConfirmButton extends StatefulWidget {
  final DashboardState dashboardState;
  final bool redAlliance;

  const ConfirmButton({
    super.key,
    required this.dashboardState,
    required this.redAlliance,
  });

  @override
  State<ConfirmButton> createState() => ConfirmButtonState();
}

class ConfirmButtonState extends State<ConfirmButton> {
  bool confirmed = false;
  late bool completed;

  @override
  void initState() {
    super.initState();
    completed = widget.dashboardState.completed;

    widget.dashboardState.completedSub.stream().listen((value) {
      if (value is bool) {
        setState(() {
          completed = value;
          if (completed) {
            confirmed = false;
            widget.dashboardState.setConfirmedCondition(confirmed);
          }
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    Color activeColor = widget.redAlliance ? Colors.red[700]! : Colors.indigo;

    return SizedBox(
      width: 225,
      height: 80,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          foregroundColor: Colors.white, backgroundColor: activeColor,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(25),
          ),
        ),
        onPressed: () {
          if (!completed) {
            setState(() {
              confirmed = true;
            });
            widget.dashboardState.setConfirmedCondition(confirmed);
          }
        },
        child: Text(
          confirmed ? "Confirmed" : "Confirm",
          style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}