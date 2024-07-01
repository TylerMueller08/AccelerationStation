import React from "react";
import CloseButtonComponent from "./components/CloseButton";
import MinimizeButtonComponent from "./components/MinimizeButton";
import MaximizeButtonComponent from "./components/MaximizeButton";
import ToggleMenuComponent from "./components/ToggleMenuComponent";
import RobotConnectionComponent from "./components/RobotInformation/RobotConnection";
import RobotConnectingComponent from "./components/Faults/RobotConnecting";
import ArmStateComponent from "./components/RobotStates/ArmState";
import RobotTimerComponent from "./components/RobotInformation/RobotTimer";
import PrimaryEncoderComponent from "./components/RobotStates/PrimaryEncoder";
import SecondaryEncoderComponent from "./components/RobotStates/SecondaryEncoder";
import BottomLimitSwitchComponent from "./components/RobotStates/BottomLimitSwitch";
import TopLimitSwitchComponent from "./components/RobotStates/TopLimitSwitch";
import IntakeLimitSwitchComponent from "./components/RobotStates/IntakeLimitSwitch";
import AutoSelectorComponent from "./components/AutoSelector/AutoSelector";
import DriverControllerConnectedComponent from "./components/Faults/DriverControllerConnected";
import AuxControllerConnectedComponent from "./components/Faults/AuxControllerConnected";
import CANBusUtilizationComponent from "./components/RobotInformation/CANBusUtilization";
import EncoderFailureDetectedComponent from "./components/Faults/EncoderFailureDetected";
import ManualControlEnabledComponent from "./components/Faults/ManualControlEnabled";
import FieldOrientationComponent from "./components/Field/FieldOrientation";
import CameraDisplayComponent from "./components/Camera/CameraDisplay";
import ConnectionSettingsComponent from "./components/Connection";
import TitleRenameComponent from "./components/Titles/TitleRename";
import SliderRenameComponent from "./components/Titles/SliderRename";

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
                <ConnectionSettingsComponent/>
            </div>
            <div className="main">
                <div className="card">
                    <TitleRenameComponent componentId={1}/>
                    <RobotConnectionComponent/>
                    <RobotTimerComponent/>
                    <CANBusUtilizationComponent/>
                    </div>
                <div className="card">
                    <TitleRenameComponent componentId={2}/>
                    <CameraDisplayComponent/>
                </div>
                <div className="card">
                    <TitleRenameComponent componentId={3}/>
                    <div className="status-grid">
                        <RobotConnectingComponent/>
                        <DriverControllerConnectedComponent/>
                        <AuxControllerConnectedComponent/>
                        <EncoderFailureDetectedComponent/>
                        <ManualControlEnabledComponent/>
                    </div>
                </div>
                <div className="card">
                    <TitleRenameComponent componentId={4}/>
                    <AutoSelectorComponent/>
                </div>
                <div className="card">
                    <TitleRenameComponent componentId={5}/>
                    <div className="switch-grid">
                        <SliderRenameComponent componentId={1}/>
                        <label className="switch">
                            <input type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                        <SliderRenameComponent componentId={2}/>
                        <label className="switch">
                            <input type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <div className="card">
                    <TitleRenameComponent componentId={6}/>
                    <div className="states-grid">
                        <ArmStateComponent/>
                        <PrimaryEncoderComponent/>
                        <SecondaryEncoderComponent/>
                        <TopLimitSwitchComponent/>
                        <BottomLimitSwitchComponent/>
                        <IntakeLimitSwitchComponent/>
                    </div>
                </div>
                <FieldOrientationComponent/>
            </div>
        </div>
    )
};

export default App;