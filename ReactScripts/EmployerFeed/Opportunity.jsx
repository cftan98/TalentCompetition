import React from 'react';

export default class Opportunity extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="ui raised link job card">
                <div className="content">
                    <div className="header">Opportunities</div>
                    <div className="meta">
                        <span className="category">This company interested in your profile</span>
                    </div>
                    <div className="description">
                        <p>Jenny is a student studying Media Management at the New School</p>
                        <p>Jenny is a student studying Media Management at the New School</p>
                        <p>Jenny is a student studying Media Management at the New School</p>
                        <p>Jenny is a student studying Media Management at the New School</p>
                    </div>
                </div>
                <div className="extra content">
                    <div className="left floated">
                        <i className="thumbs up icon interested"></i>
                    </div>
                    <div className="right floated author">
                        <img className="ui avatar image" src="https://semantic-ui.com/images/avatar/small/matt.jpg" /> Company Z
                    </div>
                </div>
            </div>
        );
    }
}