/* Toggle section */
import React from 'react';

export class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }

    update(event) {
        let data = {};
        data[event.target.name] = event.target.value == "true" ? true : false;
        this.props.updateStateData(data);
    }

    render() {
        return (
            <React.Fragment>
                <div className="inline fields">
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input name="displayProfile"
                                tabIndex="0"
                                type="radio"
                                value="true"
                                onChange={this.update}
                                checked={this.props.displayProfile == true}>
                            </input>
                            <label>Display profile</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                name="displayProfile"
                                tabIndex="0"
                                type="radio"
                                value="false"
                                onChange={this.update}
                                checked={this.props.displayProfile == false}>
                            </input>
                            <label>Hide profile</label>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}