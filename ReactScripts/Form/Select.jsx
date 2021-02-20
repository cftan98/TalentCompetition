import React from 'react';
import PropTypes from 'prop-types';

export const Select = (props) => (
    <select
        name={props.name}
        value={props.selectedOption}
        onChange={props.controlFunc}>
        <option value="">{props.placeholder}</option>
        {props.options.map(opt => {
            return (
                <option
                    key={opt.value}
                    value={opt.value}>{opt.title}</option>
            );
        })}
    </select>
);

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    selectedOption: PropTypes.string,
    controlFunc: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};