import React from "react";
import { connect } from "react-redux";
import Delete from "../../../assets/img/delete.png";
import Edit from "../../../assets/img/edit.png";
import { CustomAction } from "../../../types/CustomAction";
import { StatusBuilder, StatusOptions } from "../../../types/Status";
import "./ListItem.css";

interface ListItemProps {
    status: StatusOptions;
    ShowDelete: () => CustomAction;
    ShowUpdate: () => CustomAction;
    SetCurrentStatus: (status: StatusOptions) => CustomAction;
}

const ListItem: React.FC<ListItemProps> = ({
    status,
    ShowDelete,
    ShowUpdate,
    SetCurrentStatus,
}) => {
    const showDelete = () => {
        const id = status.id;
        ShowDelete();
        SetCurrentStatus(StatusBuilder({ id }));
    };

    const showUpdate = () => {
        const id = status.id;
        ShowUpdate();
        SetCurrentStatus(StatusBuilder({ id }));
    };

    return (
        <div className="FilterCrud" data-id={status.id}>
            <div className="content">
                <div className="imgContainer">
                    <img src={status.image} alt={status.label} />
                </div>
                <span>{status.label}</span>
            </div>
            <div className="btnContainer">
                <button type="button" onClick={showUpdate}>
                    <img src={Edit} alt="edit" />
                </button>
                <button type="button" onClick={showDelete}>
                    <img src={Delete} alt="delete" />
                </button>
            </div>
        </div>
    );
};

export default connect(
    () => ({}),
    // ({ current: { status } }: State) => ({
    //     status,
    // }),
    (dispatch) => ({
        ShowDelete: (): CustomAction =>
            dispatch({ type: "SHOW_DELETE_STATUS", payload: undefined }),
        ShowUpdate: (): CustomAction =>
            dispatch({ type: "SHOW_STATUS_FORM", payload: undefined }),
        SetCurrentStatus: (status: StatusOptions): CustomAction =>
            dispatch({ type: "SET_CURRENT_STATUS", payload: status }),
    })
)(ListItem);
