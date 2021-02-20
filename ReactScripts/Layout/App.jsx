import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage.jsx';
import TalentFeed from '../TalentFeed/TalentFeed.jsx'
import EmployerFeed from '../EmployerFeed/EmployerFeed.jsx'
import TalentWatchlist from '../Watchlist/TalentWatchlist.jsx'
import TalentMatching from '../TalentMatching/TalentMatching.jsx'
import ManageJob from "../Employer/ManageJob/ManageJob.jsx"
import EmployerProfile from "../Profile/EmployerProfile.jsx"
import TalentProfile from "../Profile/AccountProfile.jsx"
import AccountSetting from "../Account/UserAccountSetting.jsx"
import CreateJob from "../Employer/CreateJob/CreateJob.jsx"
import TalentDetail from "../TalentFeed/TalentDetail.jsx";
import EmailConfirmation from "../UserSettings/EmailConfirmation.jsx";
import ResetPassword from "../Account/ResetPassword.jsx";
import VerifyClient from "../Account/VerifyClient.jsx";
import ManageClient from "../Recruiter/ManageClients/ManageClient.jsx";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="root">
                    <Switch>
                        <Route path="/Feed" component={TalentFeed}></Route>
                        <Route path="/EmployerFeed" component={EmployerFeed}></Route>
                        <Route path="/Watchlist" component={TalentWatchlist}></Route>
                        <Route path="/EmployerProfile" component={EmployerProfile}></Route> {/* can be reworked to a better architecture once new design is in place */}
                        <Route path="/TalentProfile" component={TalentProfile} />
                        <Route path="/TalentDetail" component={TalentDetail} />
                        <Route path="/TalentMatching" component={TalentMatching}></Route>
                        <Route path="/AccountSettings" component={AccountSetting} />
                        <Route path="/ManageJobs" component={ManageJob} />
                        <Route path="/PostJob/:copyId?" component={CreateJob} />
                        <Route path="/ManageClient" component={ManageClient}/>
                        <Redirect exact from="/" to="/Home"></Redirect>
                        <Route path="/Home" component={HomePage} />
                        <Route path="/TalentDetail" component={TalentDetail}></Route>
                        <Route path="/VerifyEmail" component={EmailConfirmation}></Route>
                        <Route path="/EditJob/:id" component={CreateJob} />
                        <Route path="/ResetPassword/:o/:p" component={ResetPassword} />
                        <Route path="/NewClient/:recruiterEmail/:clientEmail/:resetPasswordToken" component={VerifyClient}/>
                        {/* <Route component={NotFound} /> Can put a fallback component here to handle 404s */}
                    </Switch>
                </div>
            </Router>
        )
    }
}
