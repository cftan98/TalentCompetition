import React, { Component } from 'react'
import VideoUpload from './VideoUpload.jsx'

export class TalentVideoSection extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.updateForComponentId = this.updateForComponentId.bind(this)
    }

    updateForComponentId(data, id) {
        let newVideos = []
        let newValue = true;

        this.props.videos.forEach(x => console.log(x))

        this.props.videos.forEach(function (x) {

            if (x.videoName === id) {
                newVideos.push(Object.assign({}, data))
                newValue = false
            }
            else {
                newVideos.push(Object.assign({}, x))
            }
        })

        if (newValue) {
            newVideos.push(Object.assign({}, data))
        }

        this.props.updateProfileData({
            videos: newVideos
        })

        if (this.props.activeVideo === id) {
            this.props.updateProfileData({
                activeVideo: data.videoName
            })
        }
    }

    render() {
        let uploaders = this.props.videos.map(x =>
            <VideoUpload
                videoName={this.state.profileData.videoName}
                updateProfileData={this.updateForComponentId}
                //saveVideoUrl={'http://localhost:60290/profile/profile/updateTalentVideo'}
                saveVideoUrl={'https://talentservicesprofile20210219125952.azurewebsites.net/profile/profile/updateTalentVideo'}
            />
        )
        uploaders.push(<VideoUpload videoName='' updateProfileData={this.updateForComponentId} />)

        return (
            <React.Fragment>
                {uploaders}
            </React.Fragment>
        )
    }
}