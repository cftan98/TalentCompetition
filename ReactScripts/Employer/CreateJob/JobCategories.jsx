import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown } from 'semantic-ui-react'
import { jobCategories } from '../common.js'

export class JobCategories extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        
    };

    handleChange(event) {
        var data = Object.assign({}, this.props.categories);
        //required
        const name = event.target.name;
        let value = event.target.value;
        const id = event.target.id;

        data[name] = value;
        if (name == "category") {
            data["subCategory"] = "";
        }
        var updateData = {
            target: { type: event.target.type, id: event.target.id, name: "categories", value: data }
        }

        //update props here
        this.props.handleChange(updateData);
    }

    render() {
        //let categories = jobCategories.map(x => x.Name);
        let selectedCategory = this.props.categories.category;
        let selectedSubCategory = this.props.categories.subCategory;
        let subcategoryOptions = undefined;

        let categoryOptions = jobCategories.map(x => <option value={x.Name} key={x.Code}>{x.Name}</option>);

        if (selectedCategory != undefined && selectedCategory !="") {
            var subCatList = jobCategories.find(x => x.Name == selectedCategory).SubCategories.map(x =>
                <option value={x.Name} key={x.Code}>{x.Name}</option>);
            subcategoryOptions = (<select
                className="ui search dropdown"
                onChange={this.handleChange}
                name="subCategory"
                value={selectedSubCategory}>
                {subCatList}
            </select>)
        }

        return (
            <div className="ui form">
                <select className="ui search dropdown" onChange={this.handleChange} name="category" value={selectedCategory}>
                    <option value="">Please Select</option>
                {categoryOptions}
                </select>
                <br />
                {subcategoryOptions === undefined ? null : subcategoryOptions}
            </div>
        )
    }
}