/*
 * A Page Banner that will auto-redirect to the Home page if user is not logged-in
 * For pages that should remain accessible when logged out, use AdaptiveBanner
 */

import React from 'react'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import LoggedInBanner from './LoggedInBanner.jsx'
import { GeneralModal } from '../GeneralModal.jsx'


export default class AuthenticatingBanner extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            userRole:'',
            modalShow: false,
            modalLogin: true,
            url: window.location
        }

        this.isUserAuthenticated = this.isUserAuthenticated.bind(this)
        this.authenticate = this.authenticate.bind(this)
        this.toggleLogin = this.toggleLogin.bind(this)
        this.modalExit = this.modalExit.bind(this)
        this.reload = this.reload.bind(this)
    }

    authenticate() {
        this.setState({
            modalShow: true
        })
    }

    reload() {
        this.setState({
            modalShow: false
        })
        this.props.reload()
        this.isUserAuthenticated()
    }

    toggleLogin() {
        this.setState({
            modalLogin: !this.state.modalLogin
        })
    }

    modalExit() {
        window.location = '/Home'
    }

    componentDidMount() {
        this.isUserAuthenticated();
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
                        userRole:res.type
                    })
                    this.props.authenticationCallback(res.type)
                }
                else {
                    this.authenticate()
                }
            }.bind(this),
            error: function (res) {
                this.authenticate()
            }.bind(this)
        })
    }

    render() {
        return (
            <React.Fragment>
                <LoggedInBanner username={this.state.username} userRole={this.state.userRole} />
                <GeneralModal
                    open={this.state.modalShow}
                    login={this.state.modalLogin}
                    closeFunc={this.modalExit}
                    toggleLogin={this.toggleLogin}
                    reload={this.reload}
                />
            </React.Fragment>
        )
    }
}

AuthenticatingBanner.propTypes = {
    reload: PropTypes.func.isRequired,
    authenticationCallback: PropTypes.func.isRequired
}