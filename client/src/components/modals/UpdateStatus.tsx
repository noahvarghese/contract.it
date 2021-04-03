import React from 'react';
import { connect } from "react-redux";
import { State } from "../../store/types/state";
import { ModalOptions } from "../../store/types/modals";
import { SetModals } from "../../store/actions";
import Input from "../elements/Input";
import File from "../../assets/img/file.png";
import { CustomAction } from '../../store/reducers';
import "../../assets/css/CreateStatus.css";
import { StatusOptions } from '../../store/types/statuses';

interface UpdateStatusProps {
    modals: ModalOptions;
    statuses: StatusOptions[],
    status: StatusOptions,
    setModals: (modals: ModalOptions) => CustomAction;
}

const UpdateStatus: React.FC<UpdateStatusProps> = ({ modals, status, statuses, setModals }) => {
    const currentStatus = statuses.find((st) => st.id === status.id)!;

    const hideModal = () => {
        setModals({
            ...modals,
            showCreateStatus: false
        })
    }
    return (
        <div className="card modal" id="UpdateStatus">
            <div className="headerContainer">
                <h1>Update Status</h1>
            </div>
            <Input id="statusLabel" name="Status" type="string" currentValue={currentStatus.label} />
            <div className="labelContainer">
                <label htmlFor="file" id="fileLabel">
                    <span className="label">Image</span>
                    <div id="dragAndDrop">
                        <div className="imgContainer">
                            <img src={currentStatus.image} alt="file" />
                        </div>
                        <div id="fileInputLabel">
                            <span>Drag and Drop here</span><span>or</span><span>Browse Files</span>
                        </div>
                        <input type="file" name="file" id="file" accept="image/png, image/jpeg" />
                    </div>
                </label>
            </div>
            <div className="btnContainer">
                <button type="reset" className="btn" onClick={hideModal}>
                    Cancel
                    </button>
                <button type="submit" className="btn">
                    Create
                </button>
            </div>
        </div>
    );
}

export default connect(
    ({ modals, statuses, current: { status } }: State) => ({ modals, statuses, status }),
    (dispatch) => ({
        setModals: (modals: ModalOptions) => dispatch(SetModals(modals))
    })
)(UpdateStatus);
