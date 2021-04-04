import React from "react";
import "./Blocker.css";

const Blocker = () => {
    React.useEffect(() => {
        if (document.body.style.position !== "") {
            document.body.style.position = "";
        }
    }, []);

    document.body.style.position = "sticky";

    return <div className="Blocker"></div>;
};

export default Blocker;
