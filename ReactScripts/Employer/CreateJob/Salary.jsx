import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown } from 'semantic-ui-react'
import { jobCategories } from '../common.js'

export class Salary extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

    };

    handleChange(event) {
        var data = Object.assign({}, this.props.salary);
        //required
        const name = event.target.name;
        let value = event.target.value;
        //const id = event.target.id;        
        data[name] = value;

        if (name == "from" && parseInt(value) > parseInt(this.props.salary.to)) {
            data["to"] = value;
        }

        var updateData = {
            target: {  name: "salary", value: data }
        }
        //update props here
        this.props.handleChange(updateData);
    }

    render() {      
        return (
            <div className="ui form">
                <input type="range"
                    min="0"
                    max="119000"
                    step="1000"
                    value={this.props.salary.from}
                    onChange={this.handleChange}
                    name="from"
                /> {"    "}
                <label>{this.props.salary.from}</label>
                <br />
                to
                <br />
                <input type="range"
                    min={this.props.salary.from}
                    max="120000"
                    step="1000"
                    value={this.props.salary.to}
                    onChange={this.handleChange}
                    name="to"
                />{"    "}
                <label>{this.props.salary.to}</label>
            </div>
        )
    }
}