import React from "react";
import { connect } from "react-redux";
import { State } from "../../../store/types/state";
import { FilterOptions } from "../../../store/types/filters";
import { CustomAction } from "../../../store/reducers";
import { StatusBuilder, StatusOptions } from "../../../store/types/statuses";
import { SetDeleteStatus, SetUpdateStatus } from "../../../store/actions";
import Delete from "../../../assets/img/delete.png";
import Edit from "../../../assets/img/edit.png";
import "./ListItem.css";

interface FilterCrudProps {
    filter: FilterOptions;
    ShowDelete: (status: StatusOptions) => CustomAction;
    ShowUpdate: (status: StatusOptions) => CustomAction;
}

const FilterCrud: React.FC<FilterCrudProps> = ({
    filter,
    ShowDelete,
    ShowUpdate,
}) => {
    const showDelete = () => {
        const id = filter.id;
        ShowDelete(StatusBuilder({ id }));
    };

    const showUpdate = () => {
        const id = filter.id;
        ShowUpdate(StatusBuilder({ id }));
    };

    return (
        <div className="FilterCrud" data-id={filter.id}>
            <div className="content">
                <div className="imgContainer">
                    <img src={filter.image} alt={filter.label} />
                </div>
                <span>{filter.label}</span>
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
    ({ current: { status } }: State) => ({
        status,
    }),
    (dispatch) => ({
        ShowDelete: (status: StatusOptions): CustomAction =>
            dispatch(SetDeleteStatus(status)),
        ShowUpdate: (status: StatusOptions): CustomAction =>
            dispatch(SetUpdateStatus(status)),
    })
)(FilterCrud);
