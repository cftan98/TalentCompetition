/*This is a landing page for clients with the reset password link*/

import React from 'react';
import { Container, Loader } from 'semantic-ui-react'
import { SingleInput } from '../Form/SingleInput.jsx'
import Cookies from 'js-cookie';
import { userNavigation } from './UserNavigation.jsx'

export default class VerifyClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resetPasswordToken: '',
            recruiterEmail: '',
            clientEmail: '',
            newPassword: '',
            confirmPassword: '',
            isLoading: false,
            formErrors: { newPassword: '', confirmPassword: '' },
            newPasswordValid: false,
            confirmPasswordValid: false,
            isResetSuccess: false,
            tokenValid: null
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.savePassword = this.savePassword.bind(this);
        this.isLoadingChange = this.isLoadingChange.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.checkToken = this.checkToken.bind(this);
    }

    componentWillMount() {
        this.queryString();
    }

    queryString() {
        let { recruiterEmail, clientEmail, resetPasswordToken } = this.props.match.params;
        this.setState({
            recruiterEmail,
            clientEmail,
            resetPasswordToken
        }, this.checkToken(recruiterEmail, clientEmail, resetPasswordToken))
    }
    checkToken(recruiterEmail, clientEmail, resetPasswordToken) {
        let data = {
            recruiterEmail, clientEmail, resetPasswordToken
        }
        //let url = `http://localhost:60998/authentication/authentication/verifyClientToken?recruiterEmail=${recruiterEmail}&clientEmail=${clientEmail}&resetPasswordToken=${resetPasswordToken}`;
        let url = `https://talentservicesidentity20210219125552.azurewebsites.net/authentication/authentication/verifyClientToken?recruiterEmail=${recruiterEmail}&clientEmail=${clientEmail}&resetPasswordToken=${resetPasswordToken}`;
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                console.log(response)
                if (response.success) {
                    if (response.isTokenValid) {
                        this.setState({
                            isLoading: false,
                            tokenValid: true
                        });
                    }
                    else {
                        this.setState({
                            isLoading: false,
                            tokenValid: false,
                        });
                    }
                } else {
                    this.setState({
                        isLoading: false,
                        tokenValid: false,

                    });
                    //TalentUtil.notification.show("Token is invalid", "error");
                }
            }.bind(this),
            fail: function () {
                this.setState({
                    isLoading: false
                });
                TalentUtil.notification.show("Error", "error");
            }.bind(this)
        });
    }
    handleUserInput(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        }, () => this.validateField(name, value));
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let newPasswordValid = this.state.newPasswordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;

        switch (fieldName) {
            case 'newPassword':
                newPasswordValid = value.length >= 6;
                fieldValidationErrors.newPassword = newPasswordValid ? '' : 'Password must be at least 6 characters.';
            case 'confirmPassword':
                confirmPasswordValid = this.state.newPassword == this.state.confirmPassword;
                fieldValidationErrors.confirmPassword = confirmPasswordValid ? '' : 'Does not match password.';
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            newPasswordValid: newPasswordValid,
            confirmPasswordValid: confirmPasswordValid
        });
    }

    validatePassword() {
        this.setState({ isLoading: true });
        this.validateField('newPassword', this.state.newPassword);
        this.validateField('confirmPassword', this.state.confirmPassword);
        if (this.state.newPassword == this.state.confirmPassword && this.state.newPasswordValid && this.state.confirmPasswordValid) {
            this.savePassword();
        }
        else {
            this.setState({ isLoading: false });
        }
    }

    savePassword() {
        let { newPassword, recruiterEmail, clientEmail, resetPasswordToken } = this.state;

        //let resetUrl = `http://localhost:60998/authentication/authentication/validateInvitation?recruiterEmail=${recruiterEmail}&clientEmail=${clientEmail}&resetPasswordToken=${resetPasswordToken}`;
        let resetUrl = `https://talentservicesidentity20210219125552.azurewebsites.net/authentication/authentication/validateInvitation?recruiterEmail=${recruiterEmail}&clientEmail=${clientEmail}&resetPasswordToken=${resetPasswordToken}`;

        $.ajax({
            url: resetUrl,
            type: 'POST',
            data: JSON.stringify(newPassword),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                if (response.isSuccess) {
                    Cookies.set('talentAuthToken', response.token.token);
                    TalentUtil.notification.show("Email Verification Successfull", "success", null, null)
                    this.setState({
                        isLoading: false,
                        isRedirect: true
                    });
                    window.location = userNavigation(response.token.userRole);
                    TalentUtil.notification.show(response.message, "success");

                } else {
                    this.setState({
                        isLoading: false
                    });
                    TalentUtil.notification.show(response.message, "error");
                }
            }.bind(this),
            fail: function () {
                this.setState({
                    isLoading: false
                });
                TalentUtil.notification.show("Error", "error");
            }.bind(this)
        });
    }

    isLoadingChange() {
        return this.state.isLoading == true ? 'loading' : '';
    };

    errorClass(error) {
        return (error.length === 0 ? false : true);
    };
    render() {
        console.log(this.state.tokenValid);
        return (
            <Container text>
                <br /> <br />
                <h2> Welcome Client please reset your password </h2>
                <br />
                {
                    this.state.tokenValid == null ?
                        <Loader active inline='centered' content='' />
                        :
                        this.state.tokenValid == false ?
                            <div>
                                <h3> Looks like this reset password link is expired. Please go back to the main site to request another link.</h3>
                                <h3> <a href="/Home"> Click here to be redirected back to the main site </a> </h3>
                                <br />
                            </div>
                            :
                            !this.state.isResetSuccess ?
                                <form className={`ui large form ${this.isLoadingChange()}`}>
                                    <div>
                                        <SingleInput
                                            title="New Password"
                                            inputType="password"
                                            placeholder="New Password"
                                            name="newPassword"
                                            isError={this.errorClass(this.state.formErrors.newPassword)}
                                            errorMessage={this.state.formErrors.newPassword}
                                            content={this.state.newPassword}
                                            controlFunc={this.handleUserInput}
                                        />
                                        <SingleInput
                                            title="Confirm Password"
                                            inputType="password"
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                            isError={this.errorClass(this.state.formErrors.confirmPassword)}
                                            errorMessage={this.state.formErrors.confirmPassword}
                                            content={this.state.confirmPassword}
                                            controlFunc={this.handleUserInput}
                                        />
                                        <br />
                                        <div className="field">
                                            <div className="fluid ui teal button" onClick={this.validatePassword}>
                                                RESET PASSWORD
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                </form>
                                : <div>
                                    <h3> Your password has been successfully changed </h3>
                                    <h3> <a href={userNavigation("employer")}> Click here to be redirected back to the main site </a> </h3>

                                    <br />
                                </div>
                }
            </Container>
        )
    }
}