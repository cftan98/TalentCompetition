import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx'
import { Select } from '../Form/Select.jsx'
import { CheckBox } from '../Form/CheckBox.jsx'
import { userNavigation } from './UserNavigation.jsx'
import { FormErrors } from '../Form/FormErrors.jsx'
import Cookies from 'js-cookie'

export class EmailVerification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            formErrors: { email: '' },
            emailValid: false,
            formValid: true,
            isLoading: false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.verifyEmail = this.verifyEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.isLoadingChange = this.isLoadingChange.bind(this);
    };

    componentDidMount() {
        this.setState({ email: this.props.email });
    }

    handleUserInput(event) {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value
        }, () => { this.validateField(name, value) })
    };
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        var formValid = this.state.formValid;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            default:
                break;
        }

        if (emailValid != null) {
            formValid = true
        }
        else {
            formValid = false
        }

        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            formValid: formValid
        });
    };
    errorClass(error) {
        return (error.length === 0 ? false : true);
    };
    verifyEmail() {
        this.setState({ isLoading: true });
        $.ajax({
            //url: 'http://localhost:60998/authentication/authentication/resendVerificationLink',
            url: 'https://talentservicesidentity20210219125552.azurewebsites.net/authentication/authentication/resendVerificationLink',
            type: 'POST',
            data: JSON.stringify(this.state.email),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                if (response.isSuccess) {
                    TalentUtil.notification.show(response.message, "success", null, null);
                    this.setState({ isLoading: false }, () => this.props.closeModal());
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
                    <div className="field">
                        <div className={`fluid ui teal button ${this.state.formValid ? '' : 'disabled'}`} onClick={this.verifyEmail}>Send Verification Email</div>
                    </div>
                </form>
            </div>
        );
    }
}