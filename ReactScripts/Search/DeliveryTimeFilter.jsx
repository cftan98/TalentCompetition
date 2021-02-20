/* DeliveryTime section */
import React from 'react';

export class DeliveryTimeFilter extends React.Component {
    render() {
        return (
            <div>
                <div className="ui divider"></div>
                <h5>Delivery Time</h5>
                <div className="grouped fields">
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input name="delivery_time" tabIndex="0" className="hidden" type="radio"></input>
                            <label>Up to 24 hours</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input name="delivery_time" tabIndex="0" className="hidden" type="radio"></input>
                            <label>Up to 3 days</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input name="delivery_time" tabIndex="0" className="hidden" type="radio"></input>
                            <label>Up to 7 days</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input name="delivery_time" tabIndex="0" className="hidden" type="radio"></input>
                            <label>Any</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

