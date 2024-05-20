import React from "react";
import CloseButtonComponent from "./components/CloseButton";
import MinimizeButtonComponent from "./components/MinimizeButton";
import MaximizeButtonComponent from "./components/MaximizeButton";
import ToggleMenuComponent from "./components/ToggleMenuComponent";
import RobotConnectionComponent from "./components/RobotInformation/RobotConnection";
import RobotConnectingComponent from "./components/RobotInformation/RobotConnecting";
import ArmStateComponent from "./components/RobotStates/ArmState";
import RobotTimerComponent from "./components/RobotInformation/RobotTimer";
import PrimaryEncoderComponent from "./components/RobotStates/PrimaryEncoder";
import SecondaryEncoderComponent from "./components/RobotStates/SecondaryEncoder";
import BottomLimitSwitchComponent from "./components/RobotStates/BottomLimitSwitch";
import TopLimitSwitchComponent from "./components/RobotStates/TopLimitSwitch";
import IntakeLimitSwitchComponent from "./components/RobotStates/IntakeLimitSwitch";

const App: React.FC = () => {
    return (
        <div>
            <div className="header">
                <div className="navigationBar">
                <div className="titleBar">
                    <ToggleMenuComponent/>
                    <div className="title">
                        Rapid Acceleration Station
                    </div>
                </div>
                <div className="titleBarButtons">
                    <MinimizeButtonComponent/>
                    <MaximizeButtonComponent/>
                    <CloseButtonComponent/>
                </div>
                </div>
            </div>
            <div className="sidebar">
                <h1 id="sidebarText">Dashboard</h1>
            </div>
            <div className="main">
                <div className="card">
                    <h1>Robot Information</h1>
                    <RobotConnectionComponent/>
                    <RobotTimerComponent/>
                    <p id="can-utilization">CAN Utilization: 0%</p>
                    </div>
                <div className="card">
                    <h1>Camera</h1>
                    <div id="camera"></div>
                </div>
                <div className="card">
                    <h1>Faults Detected</h1>
                    <div className="status-grid">
                        <p className="fault-name">Radio Connecting: </p>
                        <RobotConnectingComponent/>
                        <p className="fault-name">Driver Controller: </p>
                        <div className="fault-status"></div>
                        <p className="fault-name">Aux Controller: </p>
                        <div className="fault-status"></div>
                        <p className="fault-name">Primary Encoder: </p>
                        <div className="fault-status"></div>
                        <p className="fault-name">Backup Encoder: </p>
                        <div className="fault-status"></div>
                    </div>
                </div>
                <div className="card">
                    <h1>Auto Selector</h1>
                    <p>Select an Autonomous</p>
                    <select id="auto-selector">
                        <option>No Autonomous Found</option>
                    </select>
                </div>
                <div className="card">
                    <h1>Ready for Match</h1>
                    <div className="switch-grid">
                        <p className="switch-name">Functions</p>
                        <label className="switch">
                            <input type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                        <p className="switch-name">Battery</p>
                        <label className="switch">
                            <input type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <div className="card">
                    <h1>Robot States</h1>
                    <div className="states-grid">
                        <p className="state-name">Arm State: </p>
                        <ArmStateComponent/>
                        <p className="state-name">Primary Encoder: </p>
                        <PrimaryEncoderComponent/>
                        <p className="state-name">Secondary Encoder: </p>
                        <SecondaryEncoderComponent/>
                        <p className="state-name">Top Limit Switch: </p>
                        <TopLimitSwitchComponent/>
                        <p className="state-name">Bottom Limit Switch: </p>
                        <BottomLimitSwitchComponent/>
                        <p className="state-name">Intake Limit Switch: </p>
                        <IntakeLimitSwitchComponent/>
                    </div>
                </div>
                <div className="card"></div>
            </div>
        </div>
    )
};

export default App;