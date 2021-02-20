import React from 'react';
import PropTypes from 'prop-types';

export const CheckBox = (props) => (
    <div className="field">
        <div className={`ui checkbox ${props.isChecked ? 'check' : ''}`}>
            <input
                type="checkbox"
                name={props.setName}
                onChange={props.controlFunc} />
            <label htmlFor={props.setName}>{props.title}{props.children}</label>
        </div>
    </div>
)

CheckBox.propTypes = {
    inputType: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
    setName: PropTypes.string.isRequired,
    selectedOptions: PropTypes.array,
    controlFunc: PropTypes.func.isRequired,
};