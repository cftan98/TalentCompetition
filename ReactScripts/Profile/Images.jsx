import React from 'react';
import Cookies from 'js-cookie';
export class Images extends React.Component {

    constructor(props) {
        super(props);

        this.loadImages = this.loadImages.bind(this);
        this.selectFileToUpload = this.selectFileToUpload.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.maxFileSize = 2097152;
        this.maxNoOfFiles = 5;
        this.acceptedFileType = ["image/gif", "image/jpeg", "image/png", "image/jpg"];

        this.state = {
            selectedFile: [],
            selectedFileName: [],
            imageSrc: [],
            imageId: [],
            selectedRemoveFileId: [],
            currentNoOfFiles: 0
        }
    };

    loadImages(Id) {

        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            //url: 'http://localhost:60290/profile/profile/getEmployerProfileImage/?id=' + Id,
            url: 'https://talentservicesprofile20210219125952.azurewebsites.net/profile/profile/getEmployerProfileImage/?id=' + Id,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {

                let imageSrcArr = [];
                let imageIdArr = [];
                let selectedFileArr = [];

                if (res.employerProfile.length > 0) {
                    for (var i = 0; i < res.employerProfile.length; i++) {
                        //imageSrcArr.push("http://localhost:60290/profile/profile/getEmployerProfileImages/?Id=" + res.employerProfile[i].fileName);
                        imageSrcArr.push("https://talentservicesprofile20210219125952.azurewebsites.net/profile/profile/getEmployerProfileImages/?Id=" + res.employerProfile[i].fileName);
                        imageIdArr.push(res.employerProfile[i].id);
                        selectedFileArr.push("");
                    }
                }

                this.setState({
                    imageSrc: imageSrcArr,
                    imageId: imageIdArr,
                    selectedFile: selectedFileArr,
                    selectedFileName: [],
                    selectedRemoveFileId: [],
                    currentNoOfFiles: res.employerProfile.length
                });
            }.bind(this)
        });
    }

    selectFileToUpload() {
        document.getElementById('selectFile').click();
    }

    fileSelectedHandler(event) {

        let localSelectedFile = this.state.selectedFile;
        let localSelectedFileName = this.state.selectedFileName;
        let localImageSrc = this.state.imageSrc;
        let localImageId = this.state.imageId;
        let localCurrentNoOfFiles = this.state.currentNoOfFiles;

        for (let i = 0; i < event.target.files.length; i++) {

            if (event.target.files[i].size > this.maxFileSize || this.acceptedFileType.indexOf(event.target.files[i].type) == -1) {
                TalentUtil.notification.show("Max file size is 2 MB and supported file types are *.jpg, *.jpeg, *.png, *.gif", "error", null, null);
            } else if (localCurrentNoOfFiles >= this.maxNoOfFiles) {
                TalentUtil.notification.show("Exceed Maximum number of files allowable to upload", "error", null, null);
            } else {
                localSelectedFile = localSelectedFile.concat(event.target.files[i]),
                localSelectedFileName = localSelectedFileName.concat(event.target.files[i].name),
                localImageSrc = localImageSrc.concat(window.URL.createObjectURL(event.target.files[i])),
                localImageId = localImageId.concat('0'),
                localCurrentNoOfFiles = localCurrentNoOfFiles + 1
            }
        }

        this.setState({
            selectedFile: localSelectedFile,
            selectedFileName: localSelectedFileName,
            imageSrc: localImageSrc,
            imageId: localImageId,
            currentNoOfFiles: localCurrentNoOfFiles
        })
    }

    removeFile(event) {
        let localselectedRemoveFileId = this.state.selectedRemoveFileId;
        let localSelectedFile = this.state.selectedFile;
        let localSelectedFileName = this.state.selectedFileName;
        let localImageSrc = this.state.imageSrc;
        let localImageId = this.state.imageId;
        let localCurrentNoOfFiles = this.state.currentNoOfFiles;

        localselectedRemoveFileId = localselectedRemoveFileId.concat(event.target.getAttribute('imageid'));
        localSelectedFile.splice(event.target.getAttribute('value'), 1);
        localSelectedFileName.splice(event.target.getAttribute('value'), 1);
        localImageSrc.splice(event.target.getAttribute('value'), 1);
        localImageId.splice(event.target.getAttribute('value'), 1);

        this.setState({
            selectedFile: localSelectedFile,
            selectedFileName: localSelectedFileName,
            imageSrc: localImageSrc,
            imageId: localImageId,
            selectedRemoveFileId: localselectedRemoveFileId,
            currentNoOfFiles: this.state.currentNoOfFiles - 1
        })
    }

    fileUploadHandler(Id) {
        let data = new FormData();
        for (var i = 0; i < this.state.selectedFile.length; i++) {
            if (this.state.selectedFile[i] != "") {
                data.append('file' + i, this.state.selectedFile[i]);
            }
        }

        data.append('Id', Id);
        data.append('FileRemoveId', this.state.selectedRemoveFileId);

        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            //url: 'http://localhost:60290/profile/profile/addEmployerProfileImages',
            //url: 'https://talentservicesprofile20210219125952.azurewebsites.net/profile/profile/addEmployerProfileImages',
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            type: "POST",
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.success) {
                    this.loadImages(Id);
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null);
                }
            }.bind(this),
            error: function (res, status, error) {
                //Display error
                TalentUtil.notification.show("There is an error when updating Images - " + error, "error", null, null);
            }
        });
    }

    render() {
        let showProfileImg = [];
        for (let i = 0; i < this.state.currentNoOfFiles; i++) {
            if (this.state.imageSrc[i] != null) {
                showProfileImg.push(<span><img style={{ height: 112, width: 112, borderRadius: 55 }} className="ui small" src={this.state.imageSrc[i]} alt="Image Not Found" /><i className="remove sign icon" onClick={this.removeFile} value={i} imageid={this.state.imageId[i]}></i></span>);
            }
        }

        if (this.state.currentNoOfFiles < this.maxNoOfFiles) {
            showProfileImg.push(<span><i className="huge circular camera retro icon" style={{ alignContent: 'right', verticalAlign: 'top' }} onClick={this.selectFileToUpload}></i></span>);
        }

        return (
            <div className="row">
                <div className="four wide column">
                    <h3>Images</h3>
                    <div className="tooltip">Upload images of your company here</div>
                </div>
                <div className="twelve wide column">
                    <section>
                        <div>
                            <label htmlFor="work_sample_uploader" className="profile-photo">
                                {showProfileImg}
                            </label>
                            <input id="selectFile" type="file" style={{ display: 'none' }} onChange={this.fileSelectedHandler} accept="image/*" multiple />
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}