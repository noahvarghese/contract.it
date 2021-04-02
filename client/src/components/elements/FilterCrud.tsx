import React from 'react';
import { connect } from "react-redux";
import { State } from "../../store/types/state";
import { FilterOptions } from '../../store/types/filters';
import Delete from "../../assets/img/delete.png";
import Edit from "../../assets/img/edit.png";
import "../../assets/css/FilterCrud.css";
import { CustomAction } from '../../store/reducers';
import { StatusBuilder, StatusOptions } from '../../store/types/statuses';
import { SetDeleteStatus } from '../../store/actions';

interface FilterCrudProps {
    filter: FilterOptions;
    ShowDelete: (status: StatusOptions) => CustomAction;
}

const FilterCrud: React.FC<FilterCrudProps> = ({ filter, ShowDelete }) => {
    const showDelete = () => {
        const id = filter.id;
        ShowDelete(StatusBuilder({ id }));
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
                <button type="button">
                    <img src={Edit} alt="edit" />
                </button>
                <button type="button" onClick={showDelete}>
                    <img src={Delete} alt="delete" />
                </button>
            </div>
        </div>
    )
}

export default connect(
    ({ current: { status } }: State) => ({
        status
    }),
    (dispatch) => ({ ShowDelete: (status: StatusOptions): CustomAction => dispatch(SetDeleteStatus(status)) })
)(FilterCrud);
