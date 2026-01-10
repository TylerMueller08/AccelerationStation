import 'package:accelerationstation/services/dashboard_state.dart';
import 'package:accelerationstation/widgets/pose_checkbox.dart';
import 'package:flutter/material.dart';

class PoseSelector extends StatefulWidget {
  final DashboardState dashboardState;
  final bool redAlliance;

  const PoseSelector({
    super.key,
    required this.dashboardState,
    required this.redAlliance
  });

  @override
  State<PoseSelector> createState() => _PoseSelectorState();
}

class _PoseSelectorState extends State<PoseSelector> {
  int _selectedPoseId = -1;

  final List<_PoseDefinition> _poses = const [
    _PoseDefinition(id: 1, label: 'A', leftPercent: 0.5, topPercent: 0.5),
    _PoseDefinition(id: 2, label: 'B', leftPercent: 0.75, topPercent: 0.5),
    _PoseDefinition(id: 3, label: 'C', leftPercent: 0.5, topPercent: 0.25),
  ];

  @override
  Widget build(BuildContext context) {
  return LayoutBuilder(
    builder: (context, constraints) {
      final imageWidth = constraints.maxWidth;
      final imageHeight = constraints.maxHeight;

      return Stack(
        children: [
          Align(
            alignment: const Alignment(0, -0.5),
            child: Image.asset('images/blue_reef.png')
          ),
          for (final pose in _poses)
            Positioned(
              left: pose.leftPercent * imageWidth - 20,
              top: pose.topPercent * imageHeight - 35,
              child: PoseCheckbox(
                id: pose.id,
                label: pose.label,
                selectedId: _selectedPoseId,
                redAlliance: widget.redAlliance,
                dashboardState: widget.dashboardState,
                onSelected: (id) {
                  setState(() => _selectedPoseId = id);
                },
              ),
            ),
          ],
        );
      },
    );
  }
}

class _PoseDefinition {
  final int id;
  final String label;
  final double leftPercent;
  final double topPercent;

  const _PoseDefinition({
    required this.id,
    required this.label,
    required this.leftPercent,
    required this.topPercent,
  });
}