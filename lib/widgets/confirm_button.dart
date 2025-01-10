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

  @override
  Widget build(BuildContext context) {
    Color activeColor = widget.redAlliance ? Colors.red[700]! : Colors.indigo;

    return SizedBox(
      width: 150,
      height: 100,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          foregroundColor: Colors.white, backgroundColor: activeColor,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(25),
          ),
        ),
        onPressed: () async {
          setState(() {
            confirmed = true;
            widget.dashboardState.setConfirmedCondition(confirmed);
          });

          await Future.delayed(const Duration(seconds: 1));
          
          setState(() {
            confirmed = false;
            widget.dashboardState.setConfirmedCondition(confirmed);
          });
        },
        child: const Text(
          "Confirm",
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}