/* SellerLanguageFilter section */
import React from 'react';

export class SellerLanguageFilter extends React.Component {
    render() {
        return (
            <div>
                <div className="ui divider"></div>
                <h5>Seller Language</h5>
                <div className="field">
                    <div className="ui checkbox">
                        <input name="seller_lang" value="en" tabIndex="0" className="hidden" type="checkbox"></input>
                        <label>English (99)</label>
                    </div>
                </div>
                <div className="field">
                    <div className="ui checkbox">
                        <input name="seller_lang" value="zh" tabIndex="0" className="hidden" type="checkbox" ></input>
                        <label>Chinese (20)</label>
                    </div>
                </div>
                <div className="field">
                    <div className="ui checkbox">
                        <input name="seller_lang" value="hi" tabIndex="0" className="hidden" type="checkbox" ></input>
                        <label>Hindi (20)</label>
                    </div>
                </div>
                <a href="#">Show More</a>
            </div>
        )
    }
}