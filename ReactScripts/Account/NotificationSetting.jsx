import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import { Grid, Menu, Segment } from 'semantic-ui-react';

export default class NotificationSetting extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <React.Fragment>
                {
                    this.props.userRole == "talent" ?
                        <div className="ui grid">
                            <br />
                            <h4 className="ui header">
                                <i className="bell outline icon"></i>
                                <div className="content">
                                    Notification Setting
                                                    </div>
                            </h4>
                            <div className='ui row'>
                                <div className="ui ten wide column">
                                    <h4 className="ui header">
                                        <div className="content">
                                            Job Notification
                                        </div>
                                        <div className="sub header">
                                            Notify me when there is a new job recommendation
                                        </div>
                                    </h4>
                                </div>
                                <div className="ui four wide column">
                                    <div className="ui toggle checkbox">
                                        <input type="checkbox" name="public" />
                                        <label>On</label>
                                    </div>
                                </div>
                            </div>
                            <div className='ui row'>
                                <div className="ui ten wide column">
                                    <h4 className="ui header">
                                        <div className="content">
                                            Employer Notification
                                        </div>
                                        <div className="sub header">
                                            Notify me when an employer shows interest in me
                                        </div>
                                    </h4>
                                </div>
                                <div className="ui four wide column">
                                    <div className="ui toggle checkbox">
                                        <input type="checkbox" name="public" />
                                        <label>On</label>
                                    </div>
                                </div>
                            </div>
                            <div className='ui row'>
                                <div className="ui ten wide column">
                                    <h4 className="ui header">
                                        <div className="content">
                                            Update Notification
                                                                </div>
                                        <div className="sub header">
                                            Notify me when there is an update
                                                                </div>
                                    </h4>
                                </div>
                                <div className="ui four wide column">
                                    <div className="ui toggle checkbox">
                                        <input type="checkbox" name="public" />
                                        <label>On</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : this.props.userRole == "employer" ?
                            <div className="ui grid">
                                <br />
                                <h4 className="ui header">
                                    <i className="bell outline icon"></i>
                                    <div className="content">
                                        Notification Setting
                                                    </div>
                                </h4>
                                <div className='ui row'>
                                    <div className="ui ten wide column">
                                        <h4 className="ui header">
                                            <div className="content">
                                                Talent Suggestion Notification
                                            </div>
                                            <div className="sub header">
                                                Notify me when there is a new talent suggestion
                                            </div>
                                        </h4>
                                    </div>
                                    <div className="ui four wide column">
                                        <div className="ui toggle checkbox">
                                            <input type="checkbox" name="public" />
                                            <label>On</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='ui row'>
                                    <div className="ui ten wide column">
                                        <h4 className="ui header">
                                            <div className="content">
                                                Recruiter Notification
                                            </div>
                                            <div className="sub header">
                                                Notify me when a recruiter send me an invitation
                                            </div>
                                        </h4>
                                    </div>
                                    <div className="ui four wide column">
                                        <div className="ui toggle checkbox">
                                            <input type="checkbox" name="public" />
                                            <label>On</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='ui row'>
                                    <div className="ui ten wide column">
                                        <h4 className="ui header">
                                            <div className="content">
                                                Update Notification
                                            </div>
                                            <div className="sub header">
                                                Notify me when there is an update
                                           </div>
                                        </h4>
                                    </div>
                                    <div className="ui four wide column">
                                        <div className="ui toggle checkbox">
                                            <input type="checkbox" name="public" />
                                            <label>On</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="ui grid">
                                <br />
                                <h4 className="ui header">
                                    <i className="bell outline icon"></i>
                                    <div className="content">
                                        Notification Setting
                                                    </div>
                                </h4>
                                <div className='ui row'>
                                    <div className="ui ten wide column">
                                        <h4 className="ui header">
                                            <div className="content">
                                                Employer Invitation Notification
                                                                </div>
                                            <div className="sub header">
                                                Notify me when an employer send me an invitation
                                                                </div>
                                        </h4>
                                    </div>
                                    <div className="ui four wide column">
                                        <div className="ui toggle checkbox">
                                            <input type="checkbox" name="public" />
                                            <label>On</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='ui row'>
                                    <div className="ui ten wide column">
                                        <h4 className="ui header">
                                            <div className="content">
                                                Employer Request Notification
                                                                </div>
                                            <div className="sub header">
                                                Notify me when there is a new request from an employer
                                                                </div>
                                        </h4>
                                    </div>
                                    <div className="ui four wide column">
                                        <div className="ui toggle checkbox">
                                            <input type="checkbox" name="public" />
                                            <label>On</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='ui row'>
                                    <div className="ui ten wide column">
                                        <h4 className="ui header">
                                            <div className="content">
                                                Update Notification
                                                                </div>
                                            <div className="sub header">
                                                Notify me when there is an update
                                                                </div>
                                        </h4>
                                    </div>
                                    <div className="ui four wide column">
                                        <div className="ui toggle checkbox">
                                            <input type="checkbox" name="public" />
                                            <label>On</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                }
            </React.Fragment>
        )
    }
}