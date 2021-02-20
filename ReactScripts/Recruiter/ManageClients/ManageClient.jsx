/*Landing page for manage client link */

import React from 'react';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import AddClient from './AddClient.jsx';
import ClientTable from './ClientTable.jsx';
import Cookies from 'js-cookie';
import ClientProfileModal from './ClientProfile.jsx';
import InviteClientModal from './InviteClient.jsx';

export default class ManageClient extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Recruiter");
        this.state = {
            loadClients: [],
            loaderData: loader,
            isAddClientOpen: false,
            isManageClientOpen: false,
            isInviteClientOpen: false,
            clientId: ''
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
    };


    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.loadData((callback) =>
            this.setState({ loaderData })
        );
    }

    componentDidMount() {
        this.init();
        this.loadData();
    };
    // loadData url: 'http://localhost:60290/profile/profile/getClientList',
    //deleteClient  url: 'http://localhost:60998/authentication/authentication/deactivateClientAccount?id=' + clientId,
    

    render() {
        
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
              
            </BodyWrapper>

        )
    }
}