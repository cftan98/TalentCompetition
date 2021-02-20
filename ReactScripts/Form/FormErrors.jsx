import React from 'react';
import PropTypes from 'prop-types';

export const FormErrors = ({ formErrors }) =>
    <div className="ui error message">
        <ul className='list'>
            {Object.keys(formErrors).map((fieldName, i) => {
                if (formErrors[fieldName].length > 0) {
                    return (
                        <li key={i}>{fieldName} {formErrors[fieldName]}</li>
                    )
                } else {
                    return '';
                }
            })}
        </ul>
    </div>