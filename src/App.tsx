import React from "react";
import CloseButtonComponent from "./components/CloseButton";
import MinimizeButtonComponent from "./components/MinimizeButton";
import MaximizeButtonComponent from "./components/MaximizeButton";
import ToggleMenuComponent from "./components/ToggleMenuComponent";
import RobotConnectionComponent from "./components/Robot/RobotConnection";
import RobotConnectingComponent from "./components/Robot/RobotConnecting";

const App: React.FC = () => {
    return (
        <div>
            <div className="header">
                <div className="navigationBar">
                <div className="titleBar">
                    <ToggleMenuComponent />
                    <div className="title">
                        Rapid Acceleration Station
                    </div>
                </div>
                <div className="titleBarButtons">
                    <MinimizeButtonComponent />
                    <MaximizeButtonComponent />
                    <CloseButtonComponent />
                </div>
                </div>
            </div>
            <div className="sidebar">
                <h1 id="sidebarText">Dashboard</h1>
            </div>
            <div className="main">
                <div className="card">
                    <h1>Robot Information</h1>
                    <RobotConnectionComponent />
                    <p id="timer">Time Remaining: 0:00</p>
                    <p id="can-utilization">CAN Utilization: 0%</p>
                    </div>
                <div className="card">
                    <h1>Camera</h1>
                    <div className="spinner">
                        
                    </div>
                    {/* <div id="camera"></div> */}
                </div>
                <div className="card">
                    <h1>Faults Detected</h1>
                    <div className="status-grid">
                        <p className="fault-name">Radio Connecting: </p>
                        <RobotConnectingComponent />
                        <p className="fault-name">Robot Code:</p>
                        <div className="fault-status"></div>
                        <p className="fault-name">Joysticks: </p>
                        <div className="fault-status"></div>
                        <p className="fault-name">Shooter Motors: </p>
                        <div className="fault-status"></div>
                        <p className="fault-name">Intake Motors: </p>
                        <div className="fault-status"></div>
                        <p className="fault-name">Primary Encoder: </p>
                        <div className="fault-status"></div>
                        <p className="fault-name">Backup Encoder: </p>
                        <div className="fault-status"></div>
                    </div>
                </div>
                <div className="card">
                    <h1>Auto Selector</h1>
                    <p>Select an Autonomous Below</p>
                    <select id="auto-selector">
                        <option>No Autonomous Found</option>
                    </select>
                </div>
                <div className="card">
                    <h1>Ready for Match</h1>
                    <div className="switch-grid">
                        <p className="switch-name">Arm States</p>
                        <label className="switch">
                            <input type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
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
                        <p className="state-text">Intake</p>
                        <p className="state-name">Movement: </p>
                        <p className="state-text">Traveling</p>
                        <p className="state-name">Primary Ec: </p>
                        <p className="state-text">0.0</p>
                        <p className="state-name">Backup Ec: </p>
                        <p className="state-text">0.0</p>
                        <p className="state-name">Bottom LS: </p>
                        <div className="fault-status"></div>
                        <p className="state-name">Top LS: </p>
                        <div className="fault-status"></div>
                        <p className="state-name">Intake LS: </p>
                        <div className="fault-status"></div>
                    </div>
                </div>
                <div className="card"></div>
            </div>
        </div>
    )
};

export default App;