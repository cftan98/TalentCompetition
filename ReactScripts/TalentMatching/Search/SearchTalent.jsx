import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, Button } from 'semantic-ui-react'
import { Location } from '../../Employer/CreateJob/Location.jsx';

export const searchTalentOptions = {
    name: '',
    location: { country: '', city: '' },
    visa: '',
    position: '',
    skill:''
}

export class SearchTalent extends React.Component {
    constructor(props) {
        super(props)
        this.state = searchTalentOptions
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentDidMount() {
        $('.ui.accordion').accordion();
    }

    onSubmit() {
        this.props.updateFilter();
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        }, () => {
            let data = { target: { name: 'searchTalentOptions', value: this.state } }
            this.props.updateStateData(data);
        });
    }

    render() {
        var error = this.props.error;
        return (
            <div className="ui accordion">
                <div className="">
                    <div className="title">
                        <i className="search icon"></i>
                        SEARCH
                    </div>
                    <div className="content" >
                        <div className="transition hidden">
                            <div className="ui grid">
                                <div className="ui three column row first">
                                    <div className="column">
                                        <div className="ui input searchTalent">
                                            <input
                                                className="prompt"
                                                type="text"
                                                placeholder="Talent Name"
                                                name="name"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="ui input searchTalent">
                                            <input                                                
                                                className="prompt"
                                                type="text"
                                                placeholder="Position"
                                                name="position"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="ui input searchTalent">
                                            <input
                                                className="prompt"
                                                type="text"
                                                placeholder="Skill"
                                                name="skill"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="ui three column row second">
                                    <div className="column">
                                        <div className="ui input searchTalent">
                                            <select
                                                className="ui right labeled dropdown"
                                                name="visa" onChange={this.handleChange}>
                                                <option value="">Select visa status</option>
                                                <option value="Citizen">Citizen</option>
                                                <option value="Permanent Resident">Permanent Resident</option>
                                                <option value="Work Visa">Work Visa</option>
                                                <option value="Student Visa">Student Visa</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="fluid column">
                                        <Location location={this.state.location} handleChange={this.handleChange} />
                                    </div>
                                    <div className="column">
                                        <div className="ui input searchTalent">
                                            <button className="ui teal button" onClick={this.onSubmit}>Search</button>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
