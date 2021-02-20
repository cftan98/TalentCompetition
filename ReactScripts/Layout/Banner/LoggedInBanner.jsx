/*
 * Handles displaying the banner for a logged-in user.
 * Does NOT do any authentication checks - use AuthenticatingBanner or AdaptiveBanner for that
 */


import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import { userNavigation } from '../../Account/UserNavigation.jsx'

export default class LoggedInBanner extends React.Component {
    constructor(props) {
        super(props)

        this.signOut = this.signOut.bind(this);
    }
    componentDidMount() {
        $('.ui.dropdown')
            .dropdown()
            ;
    }
    signOut() {
        Cookies.remove('talentAuthToken');
        window.location = '/Home';
    }
    render() {
        return (
            <div>
                <div className="ui secondary menu">
                    <a className="item" href="/">Talent Logo</a>
                    <div className="ui small icon input search-box">
                        <input type="text" placeholder="Search"></input>
                        <i className="search icon"></i>
                    </div>
                    <div className="right item">
                        <a className="item">Notification</a>
                        <div className="ui dropdown item">
                            Hi {this.props.username}
                            <div className="menu">
                                <div className="item" onClick={() => window.location = userNavigation(this.props.userRole)}>
                                    <i className="user icon" />My Profile</div>
                                <div className="ui divider" style={{ padding: 0, margin: 0 }}></div>
                                <div className="item" onClick={()=>window.location="/AccountSettings"}><i className="cogs icon" />Account Settings</div>
                            </div>
                        </div>

                        <button className="ui teal button" onClick={this.signOut}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
