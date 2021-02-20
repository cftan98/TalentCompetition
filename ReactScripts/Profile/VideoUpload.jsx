import React from 'react'
import Cookies from 'js-cookie'
import { error } from 'util';
import { Progress } from 'semantic-ui-react'


export default class VideoUpload extends React.Component {
    constructor(props) {
        super(props)

        this.maxLength = 100 * 1024 * 1024; // 100MB - arbitary choice
        this.fileTypes = ['video/mp4']

     
    }

    render() {
        
    }
}