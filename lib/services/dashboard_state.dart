import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:nt4/nt4.dart';

class DashboardState {
  static const String robotAddress = kDebugMode ? '127.0.0.1' : '10.45.93.2';

  late NT4Client client;

  late NT4Subscription matchTimeSub;
  late NT4Subscription redAllianceSub;

  late NT4Topic targetPosePub;
  late NT4Topic targetElevatorHeightPub;
  late NT4Topic selectedAutonPub;
  
  int _reefPose = 1;
  int _elevatorHeight = 1;
  String _selectedAuton = 'Do Nothing';

  bool connected = false;

  DashboardState() {
    client = NT4Client(
      serverBaseAddress: robotAddress,
      onConnect: () {
        Future.delayed(const Duration(milliseconds: 200), () => sendAll());
        connected = true;
      },
      onDisconnect: () => connected = false,
    );

    matchTimeSub = client.subscribePeriodic('/SmartDashboard/MatchTime', 1.0);
    redAllianceSub = client.subscribePeriodic('/FMSInfo/IsRedAlliance', 1.0);

    targetPosePub = client.publishNewTopic('/SmartDashboard/TargetDashboardPose', NT4TypeStr.typeInt);
    targetElevatorHeightPub = client.publishNewTopic('/SmartDashboard/TargetElevatorHeight', NT4TypeStr.typeInt);
    selectedAutonPub = client.publishNewTopic('/SmartDashboard/SelectedAutonomous', NT4TypeStr.typeStr);

    client.setProperties(targetPosePub, false, true);
    client.setProperties(targetElevatorHeightPub, false, true);
    client.setProperties(selectedAutonPub, false, true);

    Timer.periodic(const Duration(seconds: 1), (timer) {
      if (connected) {
        sendAll();
      }
    });
  }

  Stream<bool> connectionStatus() {
    return client.connectionStatusStream().asBroadcastStream();
  }

  Stream<double> matchTime() async* {
    await for (final value in matchTimeSub.stream()) {
      if (value is double) {
        yield value;
      }
    }
  }

  Stream<bool> isRedAlliance() async* {
    await for (final value in redAllianceSub.stream(yieldAll: true)) {
      if (value is bool) {
        yield value;
      }
    }
  }

  void setTargetPose(int reefPose) {
    if (reefPose <= 36 && reefPose >= 1) {
      _reefPose = reefPose;
      client.addSample(targetPosePub, _reefPose);
    }
  }

  void setTargetElevatorHeight(int elevatorHeight) {
    if (elevatorHeight <= 36 && elevatorHeight >= 1) {
      _elevatorHeight = elevatorHeight;
      client.addSample(targetElevatorHeightPub, _elevatorHeight);
    }
  }

  void setSelectedAutonomous(String selectedAuton) {
    _selectedAuton = selectedAuton;
    client.addSample(selectedAutonPub, _selectedAuton);
  }

  void sendAll() {
    client.addSample(targetPosePub, _reefPose);
    client.addSample(targetElevatorHeightPub, _elevatorHeight);
    client.addSample(selectedAutonPub, _selectedAuton);
  }
}