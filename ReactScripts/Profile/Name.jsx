import React from 'react';
import Cookies from 'js-cookie';

export class Name extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: 0
        };
        this.update = this.update.bind(this);
    };

    update(event) {
        let data = {};
        data[event.target.name] = event.target.value;
        this.props.updateStateData(data);
        let name = event.target.value;
        this.setState({
            characters: name.length
        })
    }
    
    render() {
        const characterLimit = 80
        let characters = this.props.name ? this.props.name.length : 0;

        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>Company name</h3>
                    <div className="tooltip">Enter your company name.</div>
                </div>
                <div className="ten wide column">
                    <div className="field">
                        <textarea maxLength={characterLimit} autoFocus name="Name" rows="2" placeholder="Enter your company name" value={this.props.name} onChange={this.update} ></textarea>
                    </div>
                    <p>Characters remaining : {characters} / {characterLimit}</p>
                </div>
            </React.Fragment>
        )
    }
}
