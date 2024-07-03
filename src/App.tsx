import React from "react";
import CloseButtonComponent from "./components/CloseButton";
import MinimizeButtonComponent from "./components/MinimizeButton";
import MaximizeButtonComponent from "./components/MaximizeButton";
import ToggleMenuComponent from "./components/ToggleMenuComponent";
import RobotConnectionComponent from "./components/RobotComponents/RobotConnection";
import RobotConnectingComponent from "./components/RobotComponents/RobotConnecting";
import RobotTimerComponent from "./components/RobotComponents/RobotTimer";
import AutoSelectorComponent from "./components/RobotComponents/AutoSelector";
import CANBusUtilizationComponent from "./components/RobotComponents/CANBusUtilization";
import FieldOrientationComponent from "./components/RobotComponents/FieldOrientation";
import CameraDisplayComponent from "./components/RobotComponents/CameraDisplay";
import ConnectionSettingsComponent from "./components/Connection";
import TitleRenameComponent from "./components/CustomComponents/TitleRename";
import SliderRenameComponent from "./components/CustomComponents/SliderRename";
import SmartDashboardItem from "./components/CustomComponents/StateComponent";

const App: React.FC = () => {
    return (
        <div>
            <div className="header">
                <div className="navigationBar">
                <div className="titleBar">
                    <ToggleMenuComponent/>
                    <div className="title">
                        Acceleration Station
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
                        <SmartDashboardItem componentId={1}/>
                        <SmartDashboardItem componentId={2}/>
                        <SmartDashboardItem componentId={3}/>
                        <SmartDashboardItem componentId={4}/>
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
                        <SmartDashboardItem componentId={5}/>
                        <SmartDashboardItem componentId={6}/>
                        <SmartDashboardItem componentId={7}/>
                        <SmartDashboardItem componentId={8}/>
                        <SmartDashboardItem componentId={9}/>
                        <SmartDashboardItem componentId={10}/>
                    </div>
                </div>
                <FieldOrientationComponent/>
            </div>
        </div>
    )
};

export default App;