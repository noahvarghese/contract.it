import React, {
    DragEvent,
    useState,
    useCallback,
    useEffect,
    useMemo,
    MouseEvent
} from "react";
import { connect } from "react-redux";
import Input from "../../Input/Input";
import File from "../../../assets/img/file.png";
import "./Form.css";
import { CustomAction } from "../../../types/CustomAction";
import { StatusBuilder, StatusOptions } from "../../../types/Status";
import { State } from "../../../types/State";
import permalink, { statusImageLink } from "../../../lib/Permalink";
import { getFormData } from "../../../lib/Functions";

interface StatusFormProps {
    showDefault: () => CustomAction;
    setCurrentStatus: (status: StatusOptions) => CustomAction;
    statusList: StatusOptions[];
    status: StatusOptions;
    setStatusList: (statusList: StatusOptions[]) => CustomAction;
}

const StatusForm: React.FC<StatusFormProps> = ({
    showDefault,
    setCurrentStatus,
    status,
    statusList,
    setStatusList
}) => {
    const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);
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

    const hideModal = () => {
        if (status.id) {
            // unset status
            setCurrentStatus(StatusBuilder())
        }
        showDefault();
    }

    const submit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (formRef) {
            const body = getFormData(formRef);
            const url = `${permalink}/api/statuses/${status.id ?? ""}`;
            const method = status.id ? "PUT" : "POST";
            console.log(url, method, body);

            const result = await fetch(url, { method, body });

            if (result.status === 200) {
                const data = await fetch(`${permalink}/api/statuses`, { method: "GET" }).then(res => res.json());
                if (Array.isArray(data)) {
                    const statuses = data.map((status: StatusOptions) => {
                        status.image = statusImageLink(status.image!);
                        return StatusBuilder(status);
                    });
                    setStatusList(statuses);
                }
            }

            // fetch request
        }

        hideModal();
    }

    useEffect(() => {
        if (currentStatus) {
            data.image = currentStatus.image!;
            data.label = currentStatus.label!;
            data.action = "Update";
        }

        return () => { };
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

    const formRefChanged = useCallback((node) => setFormRef(node), [setFormRef]);

    return (
        <div className="card modal" id="CreateStatus">
            <form ref={formRefChanged}>
                <div className="headerContainer">
                    <h1>{data.action} Status</h1>
                </div>
                <Input
                    id="label"
                    name="Status"
                    type="string"
                    currentValue={data.label}
                />
                <div className="labelContainer">
                    <label htmlFor="image" id="fileLabel">
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
                                name="image"
                                id="image"
                                accept="image/png, image/jpeg"
                                // onDrag={onDrag}
                                onDrop={onDrag}
                                onChange={setImagePreview}
                                ref={fileRefChanged}
                                required
                            />
                        </div>
                    </label>
                </div>
                <div className="btnContainer">
                    <button type="reset" className="btn" onClick={hideModal}>
                        Cancel
                </button>
                    <button type="submit" className="btn" onClick={submit}>
                        {data.action}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default connect(
    ({ modals, statusList, current: { status } }: State) => ({
        modals,
        statusList,
        status,
    }),
    (dispatch) => ({
        showDefault: () =>
            dispatch({ type: "SHOW_DEFAULT", payload: undefined }),
        setCurrentStatus: (status: StatusOptions) =>
            dispatch({ type: "SET_CURRENT_STATUS", payload: status }),
        setStatusList: (statusList: StatusOptions[]) =>
            dispatch({ type: "REPLACE_STATUS_LIST", payload: statusList })
    })
)(StatusForm);
