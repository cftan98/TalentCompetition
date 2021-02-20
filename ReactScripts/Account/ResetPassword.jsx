import React from 'react';
import { Container, Form, Loader } from 'semantic-ui-react'
import { SingleInput } from '../Form/SingleInput.jsx'
import { Select } from '../Form/Select.jsx'
import { FormErrors } from '../Form/FormErrors.jsx'

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            email: '',
            newPassword: '',
            confirmPassword: '',
            isLoading: false,
            formErrors: { newPassword: '', confirmPassword: '' },
            newPasswordValid: false,
            confirmPasswordValid: false,
            isResetSuccess: false,
            tokenValid: null,
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
        this.setState({
            email: this.props.match.params.o,
            token: this.props.match.params.p
        }, this.checkToken(this.props.match.params.o, this.props.match.params.p))
    }
    checkToken(email, token) {
        let data = {
            Email: email,
            Token: token
        }
        //let url = `http://localhost:60998/authentication/authentication/verifyResetPasswordToken?o=${email}&p=${token}`;
        let url = `https://talentservicesidentity20210219125552.azurewebsites.net/authentication/authentication/verifyResetPasswordToken?o=${email}&p=${token}`;
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
                            tokenValid: true,

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
        let newPassword = this.state.newPassword;
        let email = this.state.email;
        let token = this.state.token;
        //let resetUrl = `http://localhost:60998/authentication/authentication/resetpassword?o=${email}&p=${token}`;
        let resetUrl = `https://talentservicesidentity20210219125552.azurewebsites.net/authentication/authentication/resetpassword?o=${email}&p=${token}`;

        $.ajax({
            url: resetUrl,
            type: 'POST',
            data: JSON.stringify(newPassword),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                if (response.isSuccess) {
                    this.setState({
                        isLoading: false,
                        isResetSuccess: true
                    });
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
                <h2> Account Recovery </h2>
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
                                    <h3> <a href="/Home"> Click here to be redirected back to the main site </a> </h3>
                                    <br />
                                </div>
                }
            </Container>
        )
    }
}