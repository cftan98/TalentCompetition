import React from 'react';
import Cookies from 'js-cookie';
import { userNavigation } from '../Account/UserNavigation.jsx'
import queryString from 'query-string'

export default class EmailConfirmation extends React.Component {
    constructor(props) {
        super(props);
        isVerified: true;
        console.log(this.props.location.search);
        const values = queryString.parse(this.props.location.search);
        console.log(values);

        this.state = {
            pagetype: values.pagetype,
            token: values.token
        }
        //console.log(this.props.match.params.pageType);
        //console.log(this.props.match.params.token);
    }
    componentDidMount() {
        //verifyEmail
        $.ajax({
           //url: 'http://localhost:60998/authentication/authentication/' + this.state.pagetype,
            url: 'https://talentservicesidentity20210219125552.azurewebsites.net/authentication/authentication/' + this.state.pagetype,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
                'Content-Type': 'application/json'
            },
            success: function (response) {
                if (response.isSuccess) {
                    Cookies.set('talentAuthToken', this.state.token);
                    TalentUtil.notification.show("Email Verification Successfull", "success", null, null)
                    debugger
                    window.location = userNavigation(response.currentRole);
                } else {
                    TalentUtil.notification.show(response.message, "error", null, null)
                    window.location = "/Home?VerificationModal=true";
                }
            }.bind(this),
            error: function (response) {
                TalentUtil.notification.show("OOPS!! Something went wrong", "error", null, null)
                window.location = "/Home?VerificationModal=true";
            }.bind(this)
        });
    }
    render() {
        return (
            <div className="ui segment center aligned">
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
                <p></p>
                <h1>Please Wait while we verify you email address.......</h1>
            </div>
        )
    }
}