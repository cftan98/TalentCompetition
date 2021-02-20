/* PriceRangeFilter section */
import React from 'react';

export class PriceRangeFilter extends React.Component {
    render() {
        return (
            <div>
                <div className="ui divider"></div>
                <h5>Price Range ($)</h5>
                <div className="two fields">
                    <div className="field">
                        <input name="price_range" placeholder="From" type="number"></input>
                    </div>
                    <div className="field">
                        <input name="price_range" placeholder="To" type="number"></input>
                    </div>
                    <button className="ui icon button">
                        <i className="angle right icon"></i>
                    </button>
                </div>
            </div>
        )
    }
}

