/* SellerRankFilter section */
import React from 'react';

export class SellerRankFilter extends React.Component {
    render() {
        return (
            <div>
                <div className="ui divider"></div>
                <h5>Seller Rank</h5>
                <div className="field">
                    <div className="ui checkbox">
                        <input name="seller_rank" value="rank_none" tabIndex="0" className="hidden" type="checkbox" ></input>
                        <label>New Seller (99)</label>
                    </div>
                </div>
                <div className="field">
                    <div className="ui checkbox">
                        <input name="seller_rank" value="rank_one_seller" tabIndex="0" className="hidden" type="checkbox" ></input>
                        <label>Rank One (20)</label>
                    </div>
                </div>
                <div className="field">
                    <div className="ui checkbox">
                        <input name="seller_rank" value="rank_two_seller" tabIndex="0" className="hidden" type="checkbox" ></input>
                        <label>Rank Two (20)</label>
                    </div>
                </div>
           </div>
        )
    }
}

