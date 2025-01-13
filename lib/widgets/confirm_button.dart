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

  @override
  void initState() {
    super.initState();
  }

  void onConfirmPressed() {
    if (!confirmed) {
      setState(() {
        confirmed = true;
      });

      widget.dashboardState.setConfirmedCondition(true);

      Future.delayed(const Duration(seconds: 2), () {
        setState(() {
          confirmed = false;
        });

        widget.dashboardState.setConfirmedCondition(false);
      });
    }
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
        onPressed: onConfirmPressed,
        child: Text(
          confirmed ? "Confirmed" : "Confirm",
          style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}