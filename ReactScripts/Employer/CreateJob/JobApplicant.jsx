import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown } from 'semantic-ui-react'
import { countryOptions } from '../common.js'


export class JobApplicant extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };
    componentDidMount() {
    };
    handleChange(event) {
        var data = Object.assign({}, this.props.applicantDetails);

        //required
        const name = event.target.name;
        const value = event.target.value;
        const id = event.target.id;

        var subData = data[id];
        if (event.target.type == "checkbox") {
            if (event.target.checked == true) {
                subData.push(name);
            }
            else if (subData.includes(name)) {
                const index = subData.indexOf(name);
                if (index !== -1) {
                    subData.splice(index, 1);
                }
            }
        }
        else {
            subData[name] = value;
        }
        data[id] = subData;
        var data = {
            target: { name: "applicantDetails", value: data }
        }

        this.props.updateStateData(data);
    }
    render() {
        const applicantDetails = this.props.applicantDetails;
        const qualifications = applicantDetails.qualifications;
        const visaStatus = applicantDetails.visaStatus;
        return (
            <div className="ui segment form">
                <h5>
                    Ideal Candidate:
                </h5>
                Years of Experience:
                <div className="fields">
                    <div className="field">
                        <input type="number"
                            max={25}
                            min={0}
                            value={applicantDetails.yearsOfExperience.years}
                            name="years"
                            id="yearsOfExperience"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="field">
                        <input type="number"
                            max={12}
                            min={0}
                            value={applicantDetails.yearsOfExperience.months}
                            name="months"
                            id="yearsOfExperience"
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                Qualification:
                <br />
                <div className="fields">
                    <br />
                    <div className="field">
                        <div className="ui multi checkbox">
                            <input type="checkbox"
                                name="diploma"
                                id="qualifications"
                                onChange={this.handleChange}
                                checked={qualifications.includes("diploma")}
                            />
                            <label>Diploma</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui checkbox">
                            <input type="checkbox"
                                name="graduate"
                                id="qualifications"
                                onChange={this.handleChange}
                                checked={qualifications.includes("graduate")}
                            />
                            <label>Graduate</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui checkbox">
                            <input type="checkbox"
                                name="postGraduateDiploma"
                                id="qualifications"
                                onChange={this.handleChange}
                                checked={qualifications.includes("postGraduateDiploma")}
                            />
                            <label>Post-graduate Diploma</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui checkbox">
                            <input type="checkbox"
                                id="qualifications"
                                name="postGraduate"
                                onChange={this.handleChange}
                                checked={qualifications.includes("postGraduate")}
                            />
                            <label>Post Graduate</label>
                        </div>
                    </div>
                </div>
                Visa Status:
                <div className="fields">
                    <br />
                    <div className="field">
                        <div className="ui checkbox">
                            <input type="checkbox" name="student"
                                id="visaStatus"
                                onChange={this.handleChange}
                                checked={visaStatus.includes("student")}
                            />
                            <label>Student</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui checkbox">
                            <input type="checkbox" name="openJobSearch"
                                id="visaStatus"
                                onChange={this.handleChange}
                                checked={visaStatus.includes("openJobSearch")} />
                            <label>Open work</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui checkbox">
                            <input type="checkbox" name="parmanentResident"
                                id="visaStatus"
                                onChange={this.handleChange}
                                checked={visaStatus.includes("parmanentResident")} />
                            <label>Permanent resident</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui checkbox">
                            <input type="checkbox" name="citizen"
                                id="visaStatus"
                                onChange={this.handleChange}
                                checked={visaStatus.includes("citizen")} />
                            <label>Citizen</label>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}