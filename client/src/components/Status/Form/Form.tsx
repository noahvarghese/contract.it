import React, {
    DragEvent,
    useState,
    useCallback,
    useEffect,
    useMemo,
} from "react";
import { connect } from "react-redux";
import { State } from "../../../store/types/state";
import { ModalOptions } from "../../../store/types/modals";
import { SetModals } from "../../../store/actions";
import { CustomAction } from "../../../store/reducers";
import { StatusOptions } from "../../../store/types/statuses";
import Input from "../../elements/Input";
import File from "../../../assets/img/file.png";
import "./Form.css";

interface StatusFormProps {
    modals: ModalOptions;
    setModals: (modals: ModalOptions) => CustomAction;
    statusList: StatusOptions[];
    status: StatusOptions;
}

const StatusForm: React.FC<StatusFormProps> = ({
    modals,
    setModals,
    status,
    statusList,
}) => {
    const [fileRef, setFileRef] = useState<HTMLInputElement | null>(null);
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

    const currentStatus = statusList.find((st) => st.id === status.id)!;

    const data = useMemo(
        () => ({
            action: "Create",
            image: File,
            label: "",
        }),
        []
    );

    useEffect(() => {
        if (currentStatus) {
            data.image = currentStatus.image!;
            data.label = currentStatus.label!;
            data.action = "Update";
        }

        return () => {};
    });

    const setImagePreview = (): void => {
        if (fileRef && fileRef.files) {
            if (fileRef.files.length > 0) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (imageRef && e.target && e.target.result) {
                        imageRef.setAttribute(
                            "src",
                            e.target.result.toString()
                        );
                    }
                };

                try {
                    reader.readAsDataURL(fileRef.files[0]);
                } catch (e) {
                    if (imageRef) {
                        imageRef.setAttribute("src", File);
                    }
                    console.error(e);
                }
            }
        }
    };

    const hideModal = () => {
        setModals({
            ...modals,
            showCreateStatus: false,
            showUpdateStatus: false,
        });
    };

    const onDrag = (e: DragEvent) => {
        if (fileRef) {
            fileRef.files = e.dataTransfer.files;
            setImagePreview();
        }
    };

    const fileRefChanged = useCallback(
        (node: HTMLInputElement) => setFileRef(node),
        [setFileRef]
    );

    const imageRefChanged = useCallback((node) => setImageRef(node), [
        setImageRef,
    ]);

    return (
        <div className="card modal" id="CreateStatus">
            <div className="headerContainer">
                <h1>{data.action} Status</h1>
            </div>
            <Input
                id="statusLabel"
                name="Status"
                type="string"
                currentValue={data.label}
            />
            <div className="labelContainer">
                <label htmlFor="file" id="fileLabel">
                    <span className="label">Image</span>
                    <div id="dragAndDrop">
                        <div className="imgContainer">
                            <img
                                src={data.image}
                                alt="file"
                                ref={imageRefChanged}
                            />
                        </div>
                        <div id="fileInputLabel">
                            <span>Drag and Drop here</span>
                            <span>or</span>
                            <span>Browse Files</span>
                        </div>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            accept="image/png, image/jpeg"
                            // onDrag={onDrag}
                            onDrop={onDrag}
                            onChange={setImagePreview}
                            ref={fileRefChanged}
                        />
                    </div>
                </label>
            </div>
            <div className="btnContainer">
                <button type="reset" className="btn" onClick={hideModal}>
                    Cancel
                </button>
                <button type="submit" className="btn">
                    {data.action}
                </button>
            </div>
        </div>
    );
};

export default connect(
    ({ modals, statuses, current: { status } }: State) => ({
        modals,
        statusList: statuses,
        status,
    }),
    (dispatch) => ({
        setModals: (modals: ModalOptions) => dispatch(SetModals(modals)),
        setCurrentStatus: (status: StatusOptions) => dispatch(Set),
    })
)(StatusForm);
