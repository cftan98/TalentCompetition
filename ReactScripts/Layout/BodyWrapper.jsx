import React from 'react';
import AuthenticatingBanner from '../Layout/Banner/AuthenticatingBanner.jsx';
import { LoggedInNavigation } from '../Layout/LoggedInNavigation.jsx';
import propTypes from 'prop-types'

export const loaderData = {
    isLoading: true,
    allowedUsers: []
};

export class BodyWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: '',
            err: 0
        }
        this.loadData = this.loadData.bind(this);
        this.loggedInUserType = this.loggedInUserType.bind(this);
    }

    loadData() {
        let { allowedUsers } = this.props.loaderData;
        if (allowedUsers != undefined && allowedUsers.length > 0) {
            var regex = new RegExp(allowedUsers.join("|"), "i");
            if (!regex.test(this.state.userRole)) {
                this.setState({ err: 403 }) //load error
            }
        }
    }

    loggedInUserType(userRole) {
        this.setState({ userRole }, () => this.loadData())
    }

    render() {
        let children = this.props.children;
        let isLoading = this.props.loaderData.isLoading;
        let reload = this.props.reload;
        let err = this.state.err
        if (this.state.err > 0)
            isLoading = false;
        const errorTemplate = <div className="ui container center aligned">
            <h3 style={{ alignSelf: "centre" }}> You are not authorized to view this page</h3>
            <br /><br />
        </div>;
        return (
            <div>
                <AuthenticatingBanner reload={reload} authenticationCallback={this.loggedInUserType} />
                <LoggedInNavigation role={this.state.userRole} />                
                {isLoading ?
                    <div style={{ 'height': '30rem' }}>
                        <div className="ui active loader">
                        </div>
                    </div>
                    : err === 0 ?
                        <div style={{minHeight:"250px"}}>
                            {children}</div> : errorTemplate
                        }
                        
            </div>
        )
    }
}

BodyWrapper.propTypes = {
    children: propTypes.element.isRequired,
    loaderData: propTypes.shape({
        isLoading: propTypes.bool.isRequired,
        allowedUsers: propTypes.arrayOf(propTypes.string).isRequired
    }).isRequired
}