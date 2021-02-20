import React from 'react'

export default class FormItemWrapper extends React.Component {

    render() {
        return (
            <div className='ui row tooltip-target'>
                <div className="ui four wide column">
                    <h3>{this.props.title}</h3>
                    <div className="tooltip">{this.props.tooltip}</div>
                </div>
                <div className="ui twelve wide column">
                    {
                        this.props.hideSegment ?
                            <div className='ui grid'>
                                <div className="row-padded">
                                    {this.props.children}
                                </div>
                            </div>
                            :
                            <div className='ui segment'>
                                <div className='ui grid'>
                                    {this.props.children}
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}