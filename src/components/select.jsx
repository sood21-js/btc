import React from 'react';
import '../App.css';

const Select = ({ list, value, onChange }) => {
    console.log(value)
    return (
        <div className="select">
            <select name="select" onChange={onChange} value={value}>
                {list.map(opt => (
                    <option
                        value={opt.ticker}
                        key={opt.image}
                    >
                        {opt.ticker}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
