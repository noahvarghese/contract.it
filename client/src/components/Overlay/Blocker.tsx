/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
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
