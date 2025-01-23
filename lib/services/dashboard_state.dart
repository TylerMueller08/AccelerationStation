import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:nt4/nt4.dart';

class DashboardState {
  static const String robotAddress = kDebugMode ? '127.0.0.1' : '10.45.93.2';

  late NT4Client client;

  late NT4Subscription matchTimeSub;
  late NT4Subscription redAllianceSub;

  late NT4Topic targetPosePub;
  
  int _reefPose = 1;

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

    client.setProperties(targetPosePub, false, true);

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

  void sendAll() {
    client.addSample(targetPosePub, _reefPose);
  }
}