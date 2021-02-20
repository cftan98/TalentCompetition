import React from 'react';

export default class Job extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="ui raised link job card">
                <div className="content">
                    <div className="header">Junior Software Developer</div>
                    <div className="meta">
                        <span className="category">Full time</span>
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
                        <button className="ui blue basic button">Apply now</button>
                    </div>
                    <div className="right floated author">
                        <img className="ui avatar image" src="https://semantic-ui.com/images/avatar/small/matt.jpg" /> Company Z
                    </div>
                </div>
            </div>
        );
    }
}