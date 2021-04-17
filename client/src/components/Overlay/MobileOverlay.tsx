import React from "react";
import { connect } from "react-redux";
import { CustomAction } from "../../types/CustomAction";
import { State } from "../../types/State";
import MobileNav from "../Nav/MobileNav";
import MobileInfobox from "./MobileInfobox";
import MobileJobForm from "../Job/Form/Form";
import MobileDeleteJob from "../Job/Delete/Delete";
import MobileStatusForm from "../Status/Form/Form";
import MobileStatusList from "../Status/List/List";
import MobileDeleteStatus from "../Status/Delete/Delete";
import MobileError from "../Error/Error";
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
        case "SHOW_JOB_FORM":
            elements = <MobileJobForm mobile={true} />;
            break;
        case "SHOW_STATUS_FORM":
            elements = <MobileStatusForm mobile={true} />;
            break;
        case "SHOW_DELETE_JOB":
            elements = <MobileDeleteJob mobile={true} />;
            break;
        case "SHOW_DELETE_STATUS":
            elements = <MobileDeleteStatus mobile={true} />;
            break;
        case "SHOW_STATUS_LIST":
            elements = <MobileStatusList mobile={true} />;
            break;
        case "SHOW_ERROR":
            elements = <MobileError mobile={true} />;
            break;
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
