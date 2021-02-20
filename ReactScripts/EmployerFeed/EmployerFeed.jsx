import React from 'react';
import ReactDOM from 'react-dom';
import { AuthenticatingBanner } from '../Layout/Banner/AuthenticatingBanner.jsx';
import { LoggedInNavigation } from '../Layout/LoggedInNavigation.jsx';
import LoggedInBanner from '../Layout/Banner/LoggedInBanner.jsx';
import TalentCard from '../TalentFeed/TalentCard.jsx';
import TalentProfile from '../EmployerFeed/TalentProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import Opportunity from './Opportunity.jsx';
import Job from './Job.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadNumber: 5,
            loaderData: loaderData
        }
        this.init = this.init.bind(this);
    };

    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        this.init();
        window.addEventListener('scroll', this.handleScroll);
    };

    handleScroll() {
        const win = $(window);
        if ((($(document).height() - win.height()) == Math.round(win.scrollTop())) || ($(document).height() - win.height()) - Math.round(win.scrollTop()) == 1) {
            $("#load-more-loading").show();
            //load ajax and update states
            //call state and update state;
        }
    };
    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui grid talent-feed container">
                    <div className="four wide column">
                        <TalentProfile />
                    </div>
                    <div className="eight wide column">
                        <Opportunity />
                        <Opportunity />
                        <Job />
                        <Job />
                        <p id="load-more-loading">
                            <img src="/images/rolling.gif" alt="Loading…" />
                        </p>
                    </div>
                    <div className="four wide column">
                        <div className="ui card">
                            <FollowingSuggestion />
                        </div>
                    </div>
                </div>
            </BodyWrapper>
        )
    }
}