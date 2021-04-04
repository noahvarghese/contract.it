import React from "react";
import "./Input.css";

interface InputProps {
    id: string;
    name: string;
    type: string;
    currentValue: string | undefined;
    list?: string;
    //   changeValue: (newValue: number) => void;
}

const Input: React.FC<InputProps> = ({
    id,
    name,
    type,
    currentValue,
    list,
}) => {
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
            <label htmlFor={id}>
                <span>{name}</span>
            </label>
        </div>
    );
};

export default Input;
