import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { Grid, Menu, Segment, Modal } from 'semantic-ui-react';
import { IndividualDetailSection } from '../Profile/ContactDetail.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import NotificationSetting from './NotificationSetting.jsx';
import AccountSetting from './AccountSetting.jsx';

export default class UserAccountSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderData: loaderData,
            activeItem: "account",
            changeName: false,
            changePassword: false,
            userRole: "",
            userName: "",
            userId: "",
            userNameOriginal: "",
            password: {
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            },
            passwordError: "",
            open: false

        }

        this.init = this.init.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.getUserRole = this.getUserRole.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);
        this.changeState = this.changeState.bind(this);
    }
    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent", "Employer", "Recruiter");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }
    componentDidMount() {
        this.init();
        this.getUserRole();
    };
    save(e, field) {
        const cookies = Cookies.get('talentAuthToken');
        if (field == "name") {
            $.ajax({
                //url: 'http://localhost:60998/authentication/authentication/changeUserName?userName=' + this.state.userName,
                url: 'https://talentservicesidentity20210219125552.azurewebsites.net/authentication/authentication/changeUserName?userName=' + this.state.userName,
                type: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json; charset=utf-8'
                },
                success: function (res) {
                    TalentUtil.notification.show("Successfully changed user name", "success");
                    this.setState({
                        userName: res.newName.result,
                        userNameOriginal: res.newName.result,
                        changeName: false
                    });
                }.bind(this),
                error: function () {
                    TalentUtil.notification.show("Error while retrieving data", "error");
                }
            });
        }
        if (field == "password") {
            let data = this.state.password;
            $.ajax({
                //url: 'http://localhost:60998/authentication/authentication/changePassword',
                url: 'https://talentservicesidentity20210219125552.azurewebsites.net/authentication/authentication/changePassword',
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json; charset=utf-8'
                },
                success: function (res) {
                    if (res.success.success) {
                        TalentUtil.notification.show(res.success.message, "success");
                        this.setState({
                            passwordError: "",
                            changePassword: false
                        })
                    }
                    else {
                        TalentUtil.notification.show(res.success.message, "error");
                        this.setState({
                            passwordError: res.success.message
                        });
                    }
                }.bind(this),
                error: function (res) {
                    console.log(res);
                    TalentUtil.notification.show("Error while saving data", "error");
                }
            });
        }
        if (field == "deactivate") {
            $.ajax({
                //url: 'http://localhost:60998/authentication/authentication/deactivateAccount',
                url: 'https://talentservicesidentity20210219125552.azurewebsites.net/authentication/authentication/deactivateAccount',
                type: "POST",
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json; charset=utf-8'
                },
                success: function (res) {
                    TalentUtil.notification.show("Success. Your account will be deactivated once you sign out", "success");
                    this.setState({
                        open: false
                    })
                }.bind(this),
                error: function (res) {
                    TalentUtil.notification.show("Error while deactivating your account", "error");
                }
            });
        }
    }
    getUserRole() {
        const cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60998/authentication/authentication/getAccountSettingInfo',
            url: 'https://talentservicesidentity20210219125552.azurewebsites.net/authentication/authentication/getAccountSettingInfo',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json; charset=utf-8'
            },
            success: function (res) {
                this.setState({
                    userRole: res.userRole,
                    userName: res.userName.result,
                    userNameOriginal: res.userName.result,
                    userId: res.userId
                })
            }.bind(this),
            error: function () {
                TalentUtil.notification.show("Error while retrieving data", "error");
            }
        });
    }
    handleItemClick(e, { name }) {
        this.setState({
            activeItem: name
        });
    }
    handleInputChange(e) {
        if (this.state.userRole == "talent") {
            let firstName = this.state.userName.split(',')[0];
            let lastName = this.state.userName.split(',')[1];
            if (e.target.name == "first-name") {
                this.setState({
                    userName: e.target.value + ',' + lastName
                });
            }
            else {
                this.setState({
                    userName: firstName + ',' + e.target.value
                });
            }
        }
        else {
            this.setState({
                userName: e.target.value
            });
        }
    }
    close() {
        this.setState({
            open: false
        })
    }
    changeState(object) {
        this.setState(object);
    }
    render() {
        const activeItem = this.state.activeItem;
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <section className="page-body">
                    <div className="ui container">
                        <div className="ui grid">
                            <div className="six wide column">
                                <Menu fluid vertical tabular>
                                    <Menu.Item name='account' active={activeItem === 'account'} onClick={this.handleItemClick} />
                                    <Menu.Item name='notification' active={activeItem === 'notification'} onClick={this.handleItemClick} />
                                    <Menu.Item
                                        name='deactivate'
                                        active={activeItem === 'deactivate'}
                                        onClick={this.handleItemClick}
                                    />
                                </Menu>
                            </div>
                            <div className="ten wide stretched column">
                                <div className="ui segment">
                                    {
                                        this.state.activeItem == 'account' ?
                                            <AccountSetting
                                                userRole={this.state.userRole} userName={this.state.userName}
                                                userNameOriginal={this.state.userNameOriginal}
                                                handleInputChange={this.handleInputChange} save={this.save}
                                                changeName={this.state.changeName} changeState={this.changeState}
                                                changePassword={this.state.changePassword} password={this.state.password}
                                                passwordError={this.state.passwordError}
                                            />

                                            : this.state.activeItem == 'notification' ?

                                                <NotificationSetting userRole={this.state.userRole} />

                                                : <div className="ui grid">
                                                    <br />
                                                    <h4 className="ui header">
                                                        <i className="user times icon"></i>
                                                        <div className="content">
                                                            Deactivate account
                                                    </div>
                                                    </h4>
                                                    <div className='ui row'>
                                                        <div className="ui ten wide column">
                                                            <h4 className="ui header">
                                                                <div className="content">
                                                                    Deactivate account
                                                                </div>
                                                                <div className="sub header">
                                                                    Once you deactivate your account your account will be locked.
                                                                    Your account will be reactivated automatically once you sign in.
                                                                </div>
                                                            </h4>
                                                        </div>
                                                        <div className="ui four wide column">
                                                            <button type="button" className="ui teal button" onClick={() => this.setState({ open: true })}>Deactivate</button>
                                                        </div>
                                                        <Modal size="tiny" open={this.state.open} onClose={this.close} className="confirmation-modal">
                                                            <Modal.Header>Deactivate Your Account</Modal.Header>
                                                            <Modal.Content>
                                                                <h5>Are you sure you want to deactivate your account?</h5>
                                                                <p>Once you deactivate your account your account will be locked.
                                                                    Your account will be reactivated automatically once you sign in.</p>
                                                            </Modal.Content>
                                                            <Modal.Actions>
                                                                <button className="ui teal button" onClick={(e) => this.save(e, "deactivate")}>Deactivate</button>
                                                                <button className="ui button" onClick={this.close}>Cancel</button>
                                                            </Modal.Actions>
                                                        </Modal>
                                                    </div>
                                                </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </section>
            </BodyWrapper>
        )
    }
}