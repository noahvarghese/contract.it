import React from "react";
import "../assets/css/Input.css";

interface InputProps {
    id: string;
    name: string;
    type: string;
    currentValue: string | undefined;
    list?: string;
    //   changeValue: (newValue: number) => void;
}

const Input = ({
    //   changeValue,
    id,
    name,
    type,
    currentValue,
    list
}: InputProps) => {
    return (
        <div className="inputContainer">
            <input
                id={id}
                type={type}
                name={id}
                defaultValue={currentValue}
                list={list}
                required
            // onChange={(e) => changeValue(Number(e.currentTarget.value))}
            />
            <label htmlFor={id}><span>{name}</span></label>
        </div>
    );
};

export default Input;