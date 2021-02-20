import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, Button } from 'semantic-ui-react'
import { Location } from '../../Employer/CreateJob/Location.jsx';

export const searchOptions = {
    name: '',
    location: { country: '', city: '' }
}

export class SearchOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = searchOptions
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentDidMount() {
        $('.ui.accordion')
            .accordion();
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
            let data = { target: { name: 'searchOptions', value: this.state } }
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
                            <div className="ui form">
                                <div className="ui icon fluid input">
                                    <input
                                        className="prompt"
                                        type="text"
                                        placeholder="Company Name"
                                        value={this.state.name}
                                        name="name"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <br />
                                <Location location={this.state.location} handleChange={this.handleChange} />
                                <button className="ui teal button" onClick={this.onSubmit}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
