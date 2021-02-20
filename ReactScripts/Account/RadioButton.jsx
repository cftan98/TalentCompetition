import React from 'react';

export class RadioButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.controlFunc(e);
    }

    render() {
        const { userRole, isError, errorMessage } = this.props;
        let handleChange = this.handleChange;
        return (
            <div className="ui form">
                <div className="inline fields register">
                    <label htmlFor="loginType">Sign Up As:</label>
                    <div className={`ui buttons ${isError == true ? 'error' : ''} `}>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name="userRole" value='talent' tabIndex="0" checked={userRole == 'talent'} onChange={handleChange} />
                                <label>Talent</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name="userRole" tabIndex="0" value='employer' checked={userRole == 'employer'} onChange={handleChange} />
                                <label>Employer</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name="userRole" tabIndex="0" value='recruiter' checked={userRole == 'recruiter'} onChange={handleChange} />
                                <label>Recruiter</label>
                            </div>
                        </div>
                    </div>
                </div>
                {isError ? <div className="ui basic red pointing prompt label transition visible">{errorMessage}</div> : null}
            </div>
        )
    }
}