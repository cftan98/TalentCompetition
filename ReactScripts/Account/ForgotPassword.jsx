import React from 'react';
import { SingleInput } from '../Form/SingleInput.jsx'
import { Select } from '../Form/Select.jsx'
import { CheckBox } from '../Form/CheckBox.jsx'
import { FormErrors } from '../Form/FormErrors.jsx'

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            formErrors: { email: '' },
            isLoading: false,
            isResetSuccess: false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.isLoadingChange = this.isLoadingChange.bind(this);
    };

    handleUserInput(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    forgotPassword() {
        this.setState({ isLoading: true });
        var forgotPasswordModel = { email: this.state.email };

        $.ajax({
            //url: 'http://localhost:60998/authentication/authentication/forgetpassword',
            url: 'https://talentservicesidentity20210219125552.azurewebsites.net/authentication/authentication/forgetpassword',
            type: 'POST',
            data: JSON.stringify(forgotPasswordModel),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                if (response.isSuccess) {
                    this.setState({
                        isLoading: false,
                        isResetSuccess: true
                    });
                    TalentUtil.notification.show(response.msgText, "success");
                } else {
                    this.setState({
                        isLoading: false
                    });
                    TalentUtil.notification.show(response.msgText, "error");
                }
            }.bind(this)
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
                {!this.state.isResetSuccess ?
                    <div>
                        <SingleInput
                            title="Email address"
                            inputType="text"
                            placeholder="Email address"
                            name="email"
                            isError={this.errorClass(this.state.formErrors.email)}
                            errorMessage={this.state.formErrors.email}
                            content={this.state.email}
                            controlFunc={this.handleUserInput}
                        />
                        <div className="field">
                            <div className="fluid ui teal button" onClick={this.forgotPassword}>
                                Send Password Reset Link
                            </div>
                        </div>
                    </div>
                    : <div>
                        A recovery link has been sent to your inbox. <br />
                        Please use the link to recover your account. <br />
                        <br />
                    </div>
                }
            </form>
        )
    }
}