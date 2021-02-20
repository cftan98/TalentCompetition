import React, { Component } from "react";
import Cookies from 'js-cookie';

export default class AccountSetting extends React.Component {
    constructor(props) {
        super(props);
        this.changePassword = this.changePassword.bind(this);
    }
    changeState(object) {
        this.props.changeState(object);
    }
    changePassword(e, field) {
        let password = this.props.password;
        let name = e.target.name;
        let value = e.target.value;
        password[name] = value;
        this.props.changeState({ password: password });
    }
    render() {
        return (
            <div className="ui grid">
                <br />
                <h4 className="ui header">
                    <i className="settings icon"></i>
                    <div className="content">
                        Account Settings
                    </div>
                </h4>
                <div className='ui row'>
                    <div className="ui four wide column">
                        <h4 className="ui header">
                            <div className="content">Name</div>
                            <div className="sub header">
                                {
                                    this.props.userRole == "talent" ?
                                        "Change your name" : "Change your company's name"
                                }
                            </div>
                        </h4>
                    </div>
                    <div className="ui twelve wide column">
                        {
                            !this.props.changeName ?
                                <span>
                                    {
                                        this.props.userRole == "talent" ?
                                            this.props.userName.split(",")[0] + " " + this.props.userName.split(",")[1]
                                            : this.props.userName
                                    }
                                    <button className="ui basic button user-setting-edit" onClick={() => this.changeState({ changeName: true })}>
                                        <i className="pencil icon" />
                                    </button>
                                </span>
                                : <div className="ui form">
                                    {this.props.userRole == "talent" ?
                                        <div className="two fields">
                                            <div className="field">
                                                <input type="text" name="first-name" placeholder="First Name" value={this.props.userName.split(",")[0]} onChange={this.props.handleInputChange} />
                                            </div>
                                            <div className="field">
                                                <input type="text" name="last-name" placeholder="Last Name" value={this.props.userName.split(",")[1]} onChange={this.props.handleInputChange} />
                                            </div>
                                            <button type="button" className="ui mini teal button" onClick={(e) => this.props.save(e, "name")}>Save</button>
                                            <button
                                                type="button" className="ui mini button"
                                                onClick={() => this.changeState({ changeName: false, userName: this.props.userNameOriginal })}>
                                                Cancel
                                            </button>
                                        </div>
                                        : <div className="two fields">
                                            <div className="field">
                                                <input type="text" name="company name" placeholder="Company Name" value={this.props.userName} onChange={this.props.handleInputChange} />
                                            </div>
                                            <div className="field">
                                                <button type="button" className="ui teal button" onClick={(e) => this.props.save(e, "name")}>Save</button>
                                                <button
                                                    type="button" className="ui button"
                                                    onClick={() => this.changeState({ changeName: false, userName: this.props.userNameOriginal })}>
                                                    Cancel
                                               </button>
                                            </div>
                                        </div>
                                    }
                                </div>

                        }

                    </div>
                </div>
                <div className='ui row'>
                    <div className="ui four wide column">
                        <h4 className="ui header">
                            <div className="cotent">Password</div>
                            <div className="sub header">Change your password</div>
                        </h4>
                    </div>
                    <div className="ui six wide column" >
                        {
                            !this.props.changePassword ?
                                <div className="ui items">
                                    <div className="item">
                                        <div className="content">
                                            <a onClick={() => this.changeState({ changePassword: true })}>
                                                Change Password
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="ui form error">
                                    <div className="field">
                                        <input type="password" name="currentPassword" placeholder="Enter your current password" onChange={this.changePassword} />
                                    </div>
                                    <div className="field">
                                        <input type="password" name="newPassword" placeholder="Enter your new password" onChange={this.changePassword} />
                                    </div>
                                    <div className="field">
                                        <input type="password" name="confirmPassword" placeholder="Confirm your new password" onChange={this.changePassword} />
                                    </div>
                                    {
                                        this.props.passwordError != "" ?
                                        < div className="ui error message">                                       
                                        <p>{this.props.passwordError}</p>
                                            </div> : null
                                    }
                                    <button className="ui teal button" type="button" onClick={(e) => this.props.save(e, "password")} >Save</button>
                                    <button className="ui button" type="button"
                                        onClick={() => this.changeState({ changePassword: false, password: { currentPassword: "", newPassword: "", confirmPassword: "" }, passwordError: "" })}>Cancel</button>
                               </div>
                        }
                    </div>
                </div>
            </div >
        )
    }
}