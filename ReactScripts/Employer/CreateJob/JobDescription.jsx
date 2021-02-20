import React from 'react';
import CkEditor from "react-ckeditor-component";


export class JobDescription extends React.Component {
    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updatePropData = this.updatePropData.bind(this);
      
    };
    updateContent(newContent) {
        this.updatePropData(newContent);
    }

    onChange(evt) {
        var newContent = evt.editor.getData();
        this.updatePropData(newContent);
    }
    updatePropData(newContent) {
        var event = { target: { name: "description", value: newContent } }
        this.props.controlFunc(event);
    }
   
    render() {
        return (
            <section>
                <CkEditor
                    name="description"
                    activeClass="p10"
                    content={this.props.description}
                    events={{
                        "blur": this.onChange,
                        "afterPaste": this.onChange,
                        "change": this.onChange
                    }}
                />
            </section>
        )
    }
}