import React from "react";
import { connect } from "react-redux";
import { CustomAction } from "../../types/CustomAction";
import { State } from "../../types/State";
import MobileNav from "../Nav/MobileNav";
import MobileInfobox from "./MobileInfobox";
import "./MobileOverlay.css";

interface MobileOverlayProps {
    modals: any;
    showCreateJob: () => CustomAction;
}

const MobileOverlay: React.FC<MobileOverlayProps> = ({
    modals,
    showCreateJob,
}) => {
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
        case "SHOW_MOBILE_INFOBOX":
            elements = <MobileInfobox />;
            break;
        default:
            elements = (
                <>
                    <MobileNav />
                    <button type="button" id="create" onClick={showCreateJob}>
                        Create
                    </button>
                </>
            );
            break;
    }
    return <div className="MobileOverlay">{elements}</div>;
};

export default connect(
    ({ modals }: State) => ({ modals }),
    (dispatch) => ({
        showCreateJob: () =>
            dispatch({ type: "SHOW_JOB_FORM", payload: undefined }),
    })
)(MobileOverlay);
