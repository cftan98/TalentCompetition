import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Dropdown } from 'semantic-ui-react'
import { countryOptions } from '../common.js'
import { JobCategories } from './JobCategories.jsx';
import { Salary } from './Salary.jsx';
import { Location } from './Location.jsx';

export class JobDetailsCard extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.updateJob = this.updateJob.bind(this);
    };
    componentDidMount() {

    };

    handleChange(event) {
        var data = Object.assign({}, this.props.jobDetails);
        
        //required
        const name = event.target.name;
        const value = event.target.value;
        const id = event.target.id;

        if (event.target.type == "checkbox") {
            var subData = data[id];
            if (event.target.checked == true) {
                subData.push(name);
            }
            else if (subData.includes(name)) {
                const index = subData.indexOf(name);
                if (index !== -1) {
                    subData.splice(index, 1);
                }
            }
            data[id] = subData;
        }
        else {
            data[name] = value;
        }

        var updateData = {
            target: { name: "jobDetails", value: data }
        }

        this.props.updateStateData(updateData);
    }

    handleChangeDate(date, name) {
        if (name == 'expiryDate') {
            this.props.updateStateData({ target: { name: "expiryDate", value: date } });
        }
        else {
            var data = Object.assign({}, this.props.jobDetails);

            data[name] = date;
            var updateData = {
                target: { name: "jobDetails", value: data }
            }
            this.props.updateStateData(updateData);
        }        
    }
    updateJob() {
        this.props.createJob();
    }
    render() {
        const { jobDetails } = this.props;
        const { jobType } = jobDetails;
        //expires in 14 days by default
        const expiryDate = this.props.expiryDate instanceof moment ? this.props.expiryDate : moment().add(14, 'days');
        return (
            <div className="ui segment">
                <div className="content">
                    <div className="header">
                        Job Details
                     </div>
                </div>

                <div className="content">
                    <div className="ui form">
                        <div className="ui small feed">
                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        *Category:
                                        <JobCategories
                                            categories={jobDetails.categories}
                                            handleChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        *JobType: <br />
                                        <div className="ui form">
                                            <div className="ui multi checkbox grouped fields">
                                                <div className="ui checkbox field">
                                                    <input type="checkbox"
                                                        name="fullTime"
                                                        id="jobType"
                                                        onChange={this.handleChange}
                                                        checked={jobType.includes("fullTime")}
                                                    />
                                                    <label>Full-Time</label>
                                                </div>
                                                <div className="ui checkbox field">
                                                    <input type="checkbox" name="partTime"
                                                        id="jobType"
                                                        onChange={this.handleChange}
                                                        checked={jobType.includes("partTime")}
                                                    />
                                                    <label>Part-Time</label>
                                                </div>
                                                <div className="ui checkbox field">
                                                    <input type="checkbox" name="contract"
                                                        id="jobType"
                                                        onChange={this.handleChange}
                                                        checked={jobType.includes("contract")}
                                                    />
                                                    <label>Contract</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        *Start Date:
                                        <br />
                                        <DatePicker
                                            selected={jobDetails.startDate}
                                            onChange={(date) => this.handleChangeDate(date, "startDate")}
                                            minDate={moment()}
                                        />
                                    </div>
                                    <div className="summary">
                                        End Date:
                                        <br />
                                        <DatePicker
                                            selected={jobDetails.endDate}
                                            onChange={(date) => this.handleChangeDate(date, "endDate")}
                                            minDate={moment()}
                                        />
                                    </div>
                                    <div className="summary">
                                        *Expiry Date:
                                        <br />
                                        <DatePicker
                                            selected={expiryDate}
                                            onChange={(date) => this.handleChangeDate(date, "expiryDate")}
                                            minDate={moment()}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        Salary Per Annum:
                                        <br />
                                        <Salary salary={jobDetails.salary} handleChange={this.handleChange}/>
                                    </div>
                                </div>
                            </div>
                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        *Location:
                                        <Location location={jobDetails.location} handleChange={this.handleChange}/>
                                    </div>
                                </div>
                            </div>
                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        <button type="button" className="fluid ui teal button" onClick={this.props.createClick}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}