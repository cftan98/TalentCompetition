/*This is edit client modal on ManageClient*/

import _ from 'lodash'
import React from 'react'
import Cookies from 'js-cookie';
import { Modal, Grid, Menu, Segment, Icon, Button } from 'semantic-ui-react';
import { IndividualDetailSection, CompanyDetailSection } from '../../Profile/ContactDetail.jsx';
import Skill from '../../Profile/Skill.jsx';
import PhotoUpload from '../../Profile/PhotoUpload.jsx';
import VideoUpload from '../../Profile/VideoUpload.jsx'

class ClientProfileModal extends React.Component {
    constructor(props) {
        super(props);
        

        
    }
    
   

    loadData(id) {
        if (id != undefined) {
            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                //url: 'http://localhost:60290/profile/profile/getEmployerProfile?id=' + id + '&role=' + 'employer',
                url: 'https://talentservicesprofile20210219125952.azurewebsites.net/profile/profile/getEmployerProfile?id=' + id + '&role=' + 'employer',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "GET",
                contentType: "application/json",
                dataType: "json",
                success: function (res) {
                    let employerData = null;
                    if (res.employer) {
                        employerData = res.employer                        
                    }
                    this.updateWithoutSave(employerData)
                }.bind(this),
                error: function (res) {
                    console.log(res.status)
                }
            })
        }
    }


    

    saveData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/saveClientProfile',
            url: 'https://talentservicesprofile20210219125952.azurewebsites.net/profile/profile/saveClientProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(this.state.employerData),
            success: function (res) {
                if (res.success) {
                    TalentUtil.notification.show("Employer details saved successfully", "success", null, null);
                }
                else {
                    TalentUtil.notification.show("Error while saving Employer details", "error", null, null);
                }
            }.bind(this),
            error: function (res) {
                TalentUtil.notification.show("Error while saving Employer details", "error", null, null);
            }.bind(this)
        })
    }

  

    render() {

      
    }
}

export default ClientProfileModal
