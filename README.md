# Acceleration Station
Acceleration Station is a custom dashboard for FIRST Robotics Competition created by Team 4593 Rapid Acceleration. The low-resource, customizable dashboard communicates over WPILib's NetworkTable 4.0 protocol using [ntcore-ts-client](https://github.com/cjlawson02/ntcore-ts-client). Acceleration Station offers robot information, camera, autonomous selector, slider checks, and a playing field that reports the robot's odometry. The remaining of the dashboard may be customized to strings, numbers, or boolean variables published on SmartDashboard.

![Acceleration Station](https://i.imgur.com/gWwypVS.png)

## Features
* Robot Information
  * Connection Status
  * Time Remaining
  * CAN Utilization
* Robot States
  * Subscribe to any string/number/boolean variable from WPILib's SmartDashboard.
  * Robot Connecting status
* Camera
  * Editable Stream Feed
* Autonomous Selector
  * Editable autonomous list using [FRC PathPlanner](https://pathplanner.dev/home.html)
  * Autonomous deployed confirmation
* Sliders
  * Easily customizable
  * Ideas: Ready for Match? / Functions Checked? / Battery Placed?
* Playing Field
  * 2D Game Field showing robot's odometry
  * Editable robot length and width
  * Disappearing movement trail

![Acceleration Station NEW](https://i.imgur.com/Di3hqCA.png)

## Installation
### Downloading
Download the latest release of the executable file from the [GitHub Releases Page](https://github.com/TylerMueller08/AccelerationStation/releases). Run the AccelerationStation.exe file and follow the configuration settings.
### (Optional) Connecting with FRC Driver Station
1. Confirm that you have downloaded the Acceleration Station executable file on your computer.
2. Identify the path to the install app. The default location should be: `C:\Users\[YOUR USERNAME HERE]\AppData\Downloads`.
3. Follow WPILib's official documentation for Manually Setting the Driver Station to Start Custom Dashboard.
   * Browse to `C:\Users\Public\Documents\FRC` and open `FRC DS Data Storage.ini`.
   * Change `DashboardCmdLine` to equal `"C:\\Users\\[YOUR USERNAME HERE]\\Downloads\\AccelerationStation.exe"`, or whereever your executable file is located.

## Configuration
### Changing Team Number
To change the team number, you need to open the sidebar menu by clicking the icon on the upper left of the application. 
1. Select either `Team Number` or `Development` button.
   * If you selected `Team Number`, then enter the team number that aligns with your robot's roboRIO and FRC Driver Station.
   * If you selected `Development`, then enter the URI for the development server (typically `127.0.0.1`). You may use development mode for connecting to NetworkTables using WPILib's Robot Simulation.
2. Press the `Connect` button to connect to the robot.
3. Verify that you successfully connected to the robot by viewing `Connected To Robot` section under the Information subtitle.

### Changing Camera Feed
To change the camera feed, right click in the camera box under the Camera title on the lower left of the application.
1. Enter the IP Address of your robot's camera in the dialog box.
2. Press `Save` to continue.
3. Verify that you successfully connected to the robot's camera by opening the sidebar and confirming the Camera Address under the Information subtitle.
> [!NOTE]
> Camera will only display chosen feed when connected to the robot. Robots connected using WPILib's Robot Simulation and Development connection type will see a static image.

![Acceleration Station](https://i.imgur.com/ReRJjgR.png)

### Robot Information & SmartDashboard
To setup the `Time Remaining` and `CAN Utilization` information on the dashboard, you must publish them to SmartDashboard in `YOUR ROBOT CODE`. Here is an example in Java:
```
public void periodic() {
    SmartDashboard.putNumber("MatchTimeRemaining", Math.round(DriverStation.getMatchTime()));
    SmartDashboard.putNumber("CANBusUtilization", Math.round(CANInfo.BusUtilization * 100));
}
```

To setup custom string/number/boolean variables, you must publish them to SmartDashboard in `YOUR ROBOT CODE`, similar to the code above. Here is an example in Java:
```
public void periodic() {
    SmartDashboard.putString("ArmState", currentNeckState.name());
    SmartDashboard.putNumber("PrimaryEncoderValue", primaryNeckEncoder.get());
    SmartDashboard.putBoolean("DriverControllerConnected", DriverStation.isJoystickConnected(0));
}
```
The **first** argument is the label of the variable that is published to SmartDashboard.
The **second** argument is a reference to the variable in `YOUR ROBOT CODE`.

To add these custom values to the dashboard, right click on any `Example Label (ID)` in the dashboard.
1. Enter a Label - The label that will appear on the dashboard. You many name it anything.
2. Enter a Type - Select either String, Boolean, **OR** Number. It will correspond to the type of variable you published to SmartDashboard.
3. Enter the SmartDashboard Topic - The **second** argument in the code referenced above. It is case-sensitive.

For example, if I want to use the 3rd option in the code above, `DriverControllerConnected`, I would enter the following in the dialog box:
```
Label = Driver Controller
Type = Boolean
SmartDashboard Topic = DriverControllerConnected
```

## Further Updates
Acceleration Station was intended as an off-season project created by Tyler Mueller from FRC Team 4593 Rapid Acceleration. Further updates and ease of customization will be worked on prior to build and competition seasons. Please notify me of any issues and recommendations that arise. Good luck!
