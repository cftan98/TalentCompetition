import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx'
import { Select } from '../Form/Select.jsx'
import { CheckBox } from '../Form/CheckBox.jsx'
import { userNavigation } from './UserNavigation.jsx'
import { FormErrors } from '../Form/FormErrors.jsx'
import Cookies from 'js-cookie'
import { EmailVerification } from './EmailVerification.jsx';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRemember: false,
            email: '',
            password: '',
            isEmailVerified: true,
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: true,
            isLoading: false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.login = this.login.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.isLoadingChange = this.isLoadingChange.bind(this);
    };
    handleUserInput(event) {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        if (event.target.type === 'checkbox') {
            this.setState({
                [name]: value
            })
        }
        else {
            this.setState({
                [name]: value
            }, () => { this.validateField(name, value) })
        }
    };
    
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        var formValid = this.state.formValid;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is minimum 6 character';
                break;
            default:
                break;
        }

        if (emailValid != null && passwordValid) {
            formValid = true
        }
        else {
            formValid = false
        }

        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            formValid: formValid
        });
    };
    errorClass(error) {
        return (error.length === 0 ? false : true);
    };
    login() {
        this.setState({ isLoading: true });

        var loginModel = {
            isRemember: this.state.isRemember,
            email: this.state.email,
            password: this.state.password
        }

        $.ajax({
            //url: 'http://localhost:60998/authentication/authentication/signin',
            url: 'https://talentservicesidentity20210219125552.azurewebsites.net/authentication/authentication/signin',
            type: 'POST',
            data: JSON.stringify(loginModel),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                if (response.isSuccess && response.isEmailVerified) {
                    Cookies.set('talentAuthToken', response.token.token)
                    window.location = userNavigation(response.token.userRole);
                    this.setState({ isLoading: false });
                    TalentUtil.notification.show("Login Successfull", "success", null, null)
                    this.props.reload();
                } 
                else if (response.isSuccess && !response.isEmailVerified) {
                    TalentUtil.notification.show(response.message, "error", null, null);
                    this.setState({ isEmailVerified: response.isEmailVerified })
                }
                else {
                    TalentUtil.notification.show(response.message, "error", null, null)
                    this.setState({ isLoading: false });
                }
            }.bind(this)
        });
    };

    handleSubmit(e) {
        e.preventDefault();
    };

    isFormValid() {
        return this.state.formValid == false ? 'error' : '';
    };

    isLoadingChange() {
        return this.state.isLoading == true ? 'loading' : '';
    };
    render() {
        let isEmailVerified = 
            this.state.isEmailVerified  ? <div>
                <form className={`ui large form ${this.isFormValid()} ${this.isLoadingChange()}`} onSubmit={this.handleSubmit}>
                    <SingleInput
                        inputType="text"
                        title="Email address"
                        placeholder="Email address"
                        name="email"
                        isError={this.errorClass(this.state.formErrors.email)}
                        content={this.state.email}
                        errorMessage="Please enter your email address"
                        controlFunc={this.handleUserInput} />
                    <SingleInput
                        title="Password"
                        inputType="password"
                        placeholder="Password"
                        name="password"
                        isError={this.errorClass(this.state.formErrors.password)}
                        errorMessage="Please enter your password"
                        content={this.state.password}
                        controlFunc={this.handleUserInput} />
                    <CheckBox
                        isCheck={this.state.terms}
                        inputType="checkbox"
                        setName="isRemember"
                        controlFunc={this.handleUserInput}
                        selectedOptions={[
                            {
                                value: 'false',
                                title: ''
                            }]}
                        options={
                            {
                                value: 'false',
                                title: ''
                            }
                        }
                    >Remember me?</CheckBox>
                    <div className="field">
                        <div className={`fluid ui teal button ${this.state.formValid ? '' : 'disabled'}`} onClick={this.login}>Login</div>
                    </div>
                </form>
            </div> :
                <EmailVerification email={this.state.email} closeModal={this.props.closeModal}/>;
        
        return (
            <span>{ isEmailVerified }</span>
        );
    }
}
{ /*
var LoginForm = React.createClass({
    getInitialState: function () {
        return {
            isRemember: false,
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: true,
            isLoading: false
        }
    },
    handleUserInput: function (event) {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        if (event.target.type === 'checkbox') {
            this.setState({
                [name]: value
            })
        }
        else {
            this.setState({
                [name]: value
            }, () => { this.validateField(name, value) })
        }
    },
    validateField: function (fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        var formValid = this.state.formValid;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                formValid = emailValid != null;
                break;
            case 'password':
                passwordValid = value.length >= 8;
                fieldValidationErrors.password = passwordValid ? '' : ' is minimum 8 character';
                formValid = passwordValid;
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            formValid: formValid
        }, this.validateForm);
    },
    errorClass: function (error) {
        return (error.length === 0 ? false : true);
    },
    login: function (event) {
        this.setState({ isLoading: true });

        var loginModel = {
            isRemember: this.state.isRemember,
            userName: this.state.email,
            password: this.state.password
        }

        $.ajax({
            url: '/Account/Login',
            type: 'POST',
            data: JSON.stringify(loginModel),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                if (response.Success) {
                    window.location = '/Home/About'
                } else {

                }
            }
        });
    },
    handleSubmit: function (event) {
        event.preventDefault();
    },
    isFormValid: function () {
        return this.state.formValid == false ? 'error' : '';
    },
    isLoadingChange: function () {
        return this.state.isLoading == true ? 'loading' : '';
    },
    render: function () {
        return (
            <div>
                <form className={`ui large form ${this.isFormValid()} ${this.isLoadingChange()}`} onSubmit={this.handleSubmit}>
                    <input type="input" hidden name="ReturnUrl" ref="returnUrl" />
                    <SingleInput
                        inputType="text"
                        title="Email address"
                        placeholder="Email address"
                        name="email"
                        isError={this.errorClass(this.state.formErrors.email)}
                        content={this.state.email}
                        errorMessage="Please enter your email address"
                        controlFunc={this.handleUserInput} />
                    <SingleInput
                        title="Password"
                        inputType="password"
                        placeholder="Password"
                        name="password"
                        isError={this.errorClass(this.state.formErrors.password)}
                        errorMessage="Please enter your password"
                        content={this.state.password}
                        controlFunc={this.handleUserInput} />
                    <CheckBox
                        isCheck={this.state.terms}
                        inputType="checkbox"
                        setName="isRemember"
                        controlFunc={this.handleUserInput}
                        selectedOptions={[
                            {
                                value: 'false',
                                title: ''
                            }]}
                        options={
                            {
                                value: 'false',
                                title: ''
                            }
                        }
                    >Remember me?</CheckBox>
                    <div className="field">
                        <div className="fluid ui teal button" onClick={this.login}>Login</div>
                    </div>
                </form>
            </div>
        );
    }
});
    */}