import Image from "../../assets/img/image.png";
import Close from "../../assets/img/delete.png";
import "./Infobox.css";

interface InfoboxProps {
    name: string;
    address: string;
    phone: string;
    email: string;
    status: {
        image: string;
        label: string;
    };
}

export const Infobox = (props: InfoboxProps): string => {
    const { name, address, phone, email, status } = props;
    const phoneLink = `tel:${phone}`;
    const emailLink = `mailto${email}`;

    return `<div class="Infobox">
                <div class="header">
                    <h1>Customer</h1>
                    <button type="button" class="closeBtn">
                        <img src=${Close} alt="Close" class="closeBtn" />
                    </button>
                </div>
                <div class="contents">
                    <span>${name}</span>
                    <span class="links">
                        <a href=${emailLink}>${email}</a>
                    </span>
                    <span class="links">
                        <a href=${phoneLink}>${phone}</a>
                    </span>
                    <span>${address}</span>
                    <span class="status">
                        <img src=${status.image} alt=${status.label} />
                        ${status.label}
                    </span>
                </div>
                <div class="btnContainer">
                    <button type="button" class="imageBtn" id="imageJobBtn">
                        <img src=${Image} class="imageBtn" alt="Images" />
                    </button>
                    <button
                        type="button"
                        class="deleteBtn"
                        id="deleteJobBtn"
                    >
                        Delete
                    </button>
                    <button type="button" class="editBtn" id="editJobBtn">
                        Edit
                    </button>
                </div>
            </div>`;
};
