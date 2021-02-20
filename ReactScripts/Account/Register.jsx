import React from 'react';
import { SingleInput } from '../Form/SingleInput.jsx';
import { CheckBox } from '../Form/CheckBox.jsx';
import { RadioButton } from './RadioButton.jsx';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
]

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRemember: false,
            email: '',
            password: '',
            companyName: '',
            firstName: '',
            lastName: '',
            countryCode: '',
            mobileNumber: '',
            userRole: 'talent', //default user role is talent
            terms: false,
            formErrors: { firstName: '', lastName: '', companyName: '', mobileNumber: '', email: '', password: '', userRole: '' },
            formValid: false,
            isLoading: false,
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.isLoadingChange = this.isLoadingChange.bind(this);
        this.register = this.register.bind(this);
    };
    register() {
        var self = this;
        this.setState({ isLoading: true });
        var registerModel = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            companyName: this.state.companyName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.password,
            userRole: this.state.userRole,
            terms: this.state.terms
        };

        $.ajax({
            //url: 'http://localhost:60998/authentication/authentication/signup',
            url: 'https://talentservicesidentity20210219125552.azurewebsites.net/authentication/authentication/signup',
            type: 'POST',
            data: JSON.stringify(registerModel),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                if (response.isSuccess) {
                    //Cookies.set('talentAuthToken', response.token.token);
                    TalentUtil.notification.show("Registration is successfull", "success", null, null);
                    self.setState({ isLoading: false });
                    this.props.closeModal();
                    //window.location = userNavigation(response.token.userRole);
                } else {
                    TalentUtil.notification.show(response.message, "error", null, null)
                    self.setState({ isLoading: false });
                }
            }.bind(this)
        });
    };
    handleUserInput(event) {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        if (event.target.type === 'checkbox') {
            this.setState({
                [name]: value
            }, () => this.validateField(name, value))
        }
        else {
            this.setState({
                [name]: value
            }, () => { this.validateField(name, value) })
        }
    };
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let fieldValid
        var formValid = this.state.formValid;
        switch (fieldName) {
            case 'email':
                fieldValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = fieldValid ? '' : ' is invalid';
                break;
            case 'companyName':
                fieldValid = value.length > 0;
                fieldValidationErrors.companyName = fieldValid ? '' : ' is required';
                break
            case 'firstName':
                fieldValid = value.length > 0;
                fieldValidationErrors.firstName = fieldValid ? '' : ' is required';
                break;
            case 'lastName':
                fieldValid = value.length > 0;
                fieldValidationErrors.lastName = fieldValid ? '' : ' is required';
                break;
            case 'password':
                fieldValid = value.length >= 6;
                fieldValidationErrors.password = fieldValid ? '' : ' is too short';
                break;
            case 'mobileNumber':
                fieldValid = value.length > 0;
                fieldValidationErrors.mobileNumber = fieldValid ? '' : ' is required';
                break;
            case 'userRole':
                fieldValid = value.length > 0;
                fieldValidationErrors.userRole = fieldValid ? '' : 'is required';
            default:
                break;
        }
        formValid = true;
        Object.keys(fieldValidationErrors).forEach(function (field) {
            if (fieldValidationErrors[field] != '') {
                formValid = false;
            }
            if (this.state.userRole == "talent") {
                if (!(this.state.firstName && this.state.lastName && this.state.email && this.state.password)) {
                    formValid = false;
                };
            }
            else {
                if (!(this.state.companyName && this.state.firstName && this.state.lastName && this.state.email && this.state.password)) {
                    formValid = false;
                }
            }
        }.bind(this));

        this.setState({
            formErrors: fieldValidationErrors,
            formValid: formValid
        });
    };
    errorClass(error) {
        return (error.length === 0 ? false : true);
    };
    isLoadingChange() {
        return this.state.isLoading == true ? 'loading' : '';
    };
    render() {
        return (
            <form className={`ui large form ${this.isLoadingChange()}`}>
                {
                    this.state.userRole == "talent" ? null :
                        <SingleInput
                            title="Company name"
                            inputType="text"
                            placeholder="Company name"
                            name="companyName"
                            isError={this.errorClass(this.state.formErrors.companyName)}
                            errorMessage="Please enter company name"
                            content={this.state.companyName}
                            controlFunc={this.handleUserInput}
                        />
                }
                <SingleInput
                    title="First name"
                    inputType="text"
                    placeholder="First name"
                    name="firstName"
                    isError={this.errorClass(this.state.formErrors.firstName)}
                    errorMessage="Please enter first name"
                    content={this.state.firstName}
                    controlFunc={this.handleUserInput}
                />
                <SingleInput
                    title="Last name"
                    inputType="text"
                    placeholder="Last name"
                    name="lastName"
                    isError={this.errorClass(this.state.formErrors.lastName)}
                    errorMessage="Please enter last name"
                    content={this.state.lastName}
                    controlFunc={this.handleUserInput}
                />

                <SingleInput
                    title="Email address"
                    inputType="text"
                    placeholder="Email address"
                    name="email"
                    isError={this.errorClass(this.state.formErrors.email)}
                    errorMessage="Please enter your email"
                    content={this.state.email}
                    controlFunc={this.handleUserInput}
                />
                <SingleInput
                    title="Password"
                    inputType="password"
                    placeholder="Password"
                    name="password"
                    isError={this.errorClass(this.state.formErrors.password)}
                    errorMessage="Please enter password"
                    content={this.state.password}
                    controlFunc={this.handleUserInput}
                />
                <RadioButton
                    userRole={this.state.userRole}
                    errorMessage="Please select User Type"
                    controlFunc={this.handleUserInput}
                    isError={this.errorClass(this.state.formErrors.userRole)}
                />
                <div className="inline field">
                    <CheckBox
                        isCheck={this.state.terms}
                        inputType="checkbox"
                        setName="terms"
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
                    >I agree to the <a href="/Home/TOC" target="_blank">terms and conditions</a></CheckBox>
                </div>
                <div className="field">
                    <div className={`fluid ui ${this.state.formValid ? '' : 'disabled'} teal button`} onClick={this.register} id="submit-btn">Join</div>
                </div>
            </form>
        )
    }
}
