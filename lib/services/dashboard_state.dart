import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:nt4/nt4.dart';

class DashboardState {
  static const String robotAddress = kDebugMode ? '127.0.0.1' : '10.45.93.2';

  late NT4Client client;

  late NT4Subscription matchTimeSub;
  late NT4Subscription redAllianceSub;

  late NT4Topic reefPosePub;
  late NT4Topic branchHeightPub;
  late NT4Topic confirmedPub;
  
  int _reefPose = 1;
  int _branchHeight = 1;
  bool _confirmed = false;

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

    reefPosePub = client.publishNewTopic('/SmartDashboard/TargetReefBranch', NT4TypeStr.typeInt);
    branchHeightPub = client.publishNewTopic('/SmartDashboard/TargetBranchHeight', NT4TypeStr.typeInt);
    confirmedPub = client.publishNewTopic('/SmartDashboard/ConfirmedCondition', NT4TypeStr.typeBool);

    client.setProperties(reefPosePub, false, true);
    client.setProperties(branchHeightPub, false, true);
    client.setProperties(confirmedPub, false, true);

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

  void setReefPose(int reefPose) {
    if (reefPose <= 12 && reefPose >= 1) {
      _reefPose = reefPose;
      client.addSample(reefPosePub, _reefPose);
    }
  }
  
  void setBranchHeight(int branchHeight) {
    if (branchHeight <= 4 && branchHeight >= 1) {
      _branchHeight = branchHeight;
      client.addSample(branchHeightPub, _branchHeight);
    }
  }

  void setConfirmedCondition(bool confirmed) {
    _confirmed = confirmed;
    client.addSample(confirmedPub, _confirmed);
  }

  void sendAll() {
    client.addSample(reefPosePub, _reefPose);
    client.addSample(branchHeightPub, _branchHeight);
    client.addSample(confirmedPub, _confirmed);
  }
}