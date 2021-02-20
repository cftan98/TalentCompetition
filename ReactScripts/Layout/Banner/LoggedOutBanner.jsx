/*
 * Displays the Banner for a logged-out user.
 * This is unlikely to be the correct choice for direct use in a page
 * unless the user will NEVER view it while logged in;
 * consider either AuthenticatingBanner or AdaptiveBanner instead
 */

import React from 'react';
import { GeneralModal } from '../GeneralModal.jsx';

export default class LoggedOutBanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalState: false,
            formType: '',
            isEmailVerified: true,
            reloadVersion: null
        };

        //modified 
        this.toggleModal = this.toggleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModalWithoutEvent = this.closeModalWithoutEvent.bind(this);
    }

    toggleModal(modalState, formType) {
        //let modalState = this.state.modalOpen;
        //modalState = !modalState ? true : false;
        this.setState({
            modalState,
            formType
        });//triggers generalModal
    }

    closeModal(e) {
        //this condition is required for a bug where the modal closes
        //during transtion from login -> forgot password. 
        if (e.target.name != "forgotpassword-link") {
            this.setState({ modalState: false })
        }
    }

    closeModalWithoutEvent() {
        this.setState({ modalState: false });
    }

    render() {
        return (
            <React.Fragment>
                <div className="ui secondary menu inverted">
                    <div className="right item">
                        <a className="item" onClick={() => this.toggleModal(true, 'login')}>
                            Sign In
                        </a>
                        <button
                            className="ui green basic button"
                            onClick={() => this.toggleModal(true, 'register')}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
                <div id="modal-section">
                    <GeneralModal
                        open={this.state.modalState}
                        formType={this.state.formType}
                        toggleModal={this.toggleModal}
                        reload={this.props.reload}
                        closeModal={this.closeModal}
                        closeModalWithoutEvent={this.closeModalWithoutEvent}
                    />
                </div>
            </React.Fragment>
        );
    }
}