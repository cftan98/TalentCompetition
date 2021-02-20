/*
 * A Page Banner that automatically switches between logged-out and logged-in
 * modes depending on authentication status.
 * For pages that should only be accessible when logged-in, use
 * AuthenticatingBanner instead
 */

import React from 'react'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import LoggedInBanner from './LoggedInBanner.jsx'
import LoggedOutBanner from './LoggedOutBanner.jsx'

export default class AdaptiveBanner extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            userRole:'',
            loggedIn: false
        }

        this.isUserAuthenticated = this.isUserAuthenticated.bind(this)
        this.reload = this.reload.bind(this)
        this.isLoggedIn = this.isLoggedIn.bind(this)
    }

    componentDidMount() {
        this.isUserAuthenticated()
    }
      
    reload() {
        this.isUserAuthenticated()
    }

    isLoggedIn() {
        return this.state.loggedIn
    }

    isUserAuthenticated() {
        var cookies = Cookies.get('talentAuthToken')
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/isUserAuthenticated',
            url: 'https://talentservicesprofile20210219125952.azurewebsites.net/profile/profile/isUserAuthenticated',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                if (res.isAuthenticated) {
                    this.setState({
                        username: res.username,
                        loggedIn: true,
                        userRole:res.type
                    })
                }
                else {
                    this.setState({
                        username: '',
                        loggedIn: false,
                        userRole: res.type
                    })
                }
            }.bind(this),
            error: function (res) {
                this.setState({
                    username: '',
                    loggedIn: false
                })
            }.bind(this)
        })
    }
    render() {
        return this.state.loggedIn ? <LoggedInBanner username={this.state.username} userRole={this.state.userRole} /> : <LoggedOutBanner reload={this.reload} />
    }
}
AdaptiveBanner.propTypes = {
    reload: PropTypes.func.isRequired
}