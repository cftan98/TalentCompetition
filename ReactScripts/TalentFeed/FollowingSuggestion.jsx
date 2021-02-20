import React from 'react';


export default class FollowingSuggestion extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="center aligned header">Follow Talent</div>
                <div className="ui items following-suggestion">
                    <div className="item">
                        <div className="ui image">
                            <img className="ui circular image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
                        </div>
                        <div className="content">
                            <a className="">Veronika Ossi</a>
                            <button className="ui primary basic button"><i className="icon user"></i>Follow</button>
                        </div>
                    </div>
                    <div className="item">
                        <div className="ui image">
                            <img className="ui circular image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
                        </div>
                        <div className="content">
                            <a className="">Veronika Ossi</a>
                            <button className="ui primary basic button"><i className="icon user"></i>Follow</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}