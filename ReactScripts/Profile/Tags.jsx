import React from 'react';
import ReactDOM from 'react-dom';

import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export class Tags extends React.Component {

    constructor(props) {
        super(props);
        let tags = props.Tags

        this.state = {
            tags: tags,
            dataArray: []
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.Tags) {
            return {
                tags: nextProps.Tags
            }
        }
        return null;
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        let data = {}
        data.tags = this.state.tags.slice();
        data.tags.push(tag);
        this.props.updateStateData(data);
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        this.setState({ tags: newTags });

    }

    render() {
        const tags = this.state.tags;
        return (

            <div className="row-padded">
                <ReactTags
                    tags={tags}
                    autofocus={false}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />
            </div>

        )
    }
}

Tags.defaultProps = {
    Tags: []
}
