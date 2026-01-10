import 'package:flutter/material.dart';
import 'package:accelerationstation/services/dashboard_theme.dart';
import 'package:accelerationstation/services/dashboard_state.dart';

class PoseCheckbox extends StatelessWidget {
  final int id;
  final String label;
  final int? selectedId;
  final bool redAlliance;
  final DashboardState dashboardState;
  final ValueChanged<int> onSelected;

  const PoseCheckbox({
    super.key,
    required this.id,
    required this.label,
    required this.selectedId,
    required this.redAlliance,
    required this.dashboardState,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context) {
    final bool isSelected = selectedId == id;
    final Color activeColor = redAlliance ? Colors.red : Colors.indigo;

    return GestureDetector(
      onTap: () {
        dashboardState.setPoseId(id);
        onSelected(id);
      },
      behavior: HitTestBehavior.opaque,
      child: Stack(
        alignment: Alignment.center,
        children: [
          Transform.scale(
            scale: 5,
            child: Checkbox(
              value: isSelected,
              splashRadius: 9,
              activeColor: activeColor,
              checkColor: Colors.transparent,
              shape: const CircleBorder(),
              side: const BorderSide(width: 0.5, color: Colors.grey),
              onChanged: (_) {
                dashboardState.setPoseId(id);
                onSelected(id);
              },
            ),
          ),
          IgnorePointer(
            child: Text(
              label,
              style: const TextStyle(
                fontFamily: DashboardTheme.font,
                fontSize: 52,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}
