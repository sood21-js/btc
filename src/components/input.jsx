import React from 'react';
import '../App.css';

const Input = ({ value, disabled = false, onChange }) => {
    console.log(value)
    return (
        <div className="input">
            <input
                type="text"
                value={value}
                disabled={disabled}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;
