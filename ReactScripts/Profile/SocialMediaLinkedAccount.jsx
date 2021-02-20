/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);


    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }



    render() {

    }

}