import React from "react";
import { connect } from "react-redux";
import { State } from "../../types/State";
import MobileNav from "../Nav/MobileNav";
import "./MobileOverlay.css";

interface MobileOverlayProps {
    modals: any;
}

const MobileOverlay: React.FC<MobileOverlayProps> = ({ modals }) => {
    let elements;
    switch (modals) {
        // case "SHOW_JOB_FORM":
        //     elements = <MobileJobForm />;
        //     break;
        // case "SHOW_STATUS_FORM":
        //     elements = <MobileStatusForm />;
        //     break;
        // case "SHOW_DELETE_JOB":
        //     elements = <MobileDeleteJob />;
        //     break;
        // case "SHOW_DELETE_STATUS":
        //     elements = <MobileDeleteStatus />;
        //     break;
        // case "SHOW_STATUS_LIST":
        //     elements = <MobileStatusList />;
        //     break;
        // case "SHOW_ERROR":
        //     elements = <MobileError />;
        //     break;
        default:
            elements = <MobileNav />;
            break;
    }
    return <div className="MobileOverlay">{elements}</div>;
};

export default connect(
    ({ modals }: State) => ({ modals }),
    (_) => ({})
)(MobileOverlay);
