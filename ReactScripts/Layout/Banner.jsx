import React from 'react';
import AdaptiveBanner from './Banner/AdaptiveBanner.jsx'

export class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        }
        this.search = this.search.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.talLoad = this.talLoad.bind(this)
    }
    search() {
        window.location = "/Home/Search?searchTerm" + this.state.searchTerm;
    }

    handleSearchInputChange(event) {
        const value = event.target.value;
        this.setState({
            searchTerm: value
        })
    }

    talLoad() {
        window.location.href = '/TalentProfile'
    }

    render() {
        return (
            <div className="first-section">
                <AdaptiveBanner reload={this.talLoad} />
                <div className="section hero">
                    <div className="ui vertically divided grid">
                        <div className="two column row">
                            <div className="column">
                                <div className="home-title text-center">
                                    <h3>I am Employer</h3>
                                    <p>If you are looking new employees for your business, this is right place for you! Open free profile. Once you open your profile, you can start engaging with our talent pool</p>
                                    <a href="freelancer-search.html" className="btn btn-primary">Find Talent</a>
                                </div>
                            </div>
                            <div className="column">
                                <div className="home-title rightside text-center">
                                    <h3>I am Talent</h3>
                                    <p>Open a free account and fill out your profile information. Our AI engine will match you to desired employers in the fun way</p>
                                    <a href="job-search.html" className="btn btn-primary">Discover Opportunities</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

