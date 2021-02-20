import React from 'react';

export default class TalentProfile extends React.Component {
    render() {
        return (
            <div className="ui card">
                <div className="content">
                    <div className="center aligned header">Talent name</div>
                    <div className="center aligned description">
                        <p>Jenny is a student studying Media Management at the New School</p>
                    </div>
                </div>
                <div className="extra content">
                    <div className="center aligned author">
                        <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
                    </div>
                </div>
            </div>
        )
    }
}