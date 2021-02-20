import React from 'react';
import { Modal } from 'semantic-ui-react';
import LoginForm from '../Account/Login.jsx';
import Register from '../Account/Register.jsx';
import ForgotPassword from '../Account/ForgotPassword.jsx';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
//import EmployerRegForm from '../Account/RegisterEmployer.jsx';

export class GeneralModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const formType = this.props.formType;
        const alternateLabel = formType === 'login' ? "Haven't got an account?" : "Already have an account?"
        const alternateLink = formType === 'login' ? "Register" : "Login";
        const form = formType === 'login' ? <LoginForm reload={this.props.reload} closeModal={this.props.closeModalWithoutEvent} />
            : formType === 'forgotpassword' ? <ForgotPassword />
                : <Register closeModal={this.props.closeModalWithoutEvent} />;
        const secondLink = formType === 'login' ?
            <span className="center aligned">
                Forgot password? <a name="forgotpassword-link" onClick={() => this.props.toggleModal(true, "forgotpassword")}>Reset my password</a>
            </span> : null;
        return (
            <Modal open={this.props.open} size='tiny' onClose={this.props.closeModal}
                className={formType == undefined ? "" : `${formType.toLowerCase()}-modal`}>
                <Modal.Content scrolling>
                    {form}
                    <div className="field text center form-footer">
                        <span className="center aligned">
                            {alternateLabel}
                            <a onClick={() => this.props.toggleModal(true, alternateLink.toLowerCase())}> {alternateLink}</a>
                        </span>
                        <br />
                        {secondLink}                        
                    </div>
                    
                </Modal.Content>
            </Modal>
        )
    }
}
