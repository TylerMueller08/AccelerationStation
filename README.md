# Acceleration Station
Acceleration Station is a custom dashboard for FIRST Robotics Competition created by Team 4593 Rapid Acceleration. The low-resource, customizable dashboard communicates over WPILib's NetworkTable 4.0 protocol using [ntcore-ts-client](https://github.com/cjlawson02/ntcore-ts-client). Acceleration Station offers robot information, camera, autonomous selector, slider checks, and a playing field that reports the robot's odometry. The remaining of the dashboard may be customized to strings, numbers, or boolean variables published on SmartDashboard.

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

## Installation

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

## Customization

## Further Customization
