import React, { useState } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';

function CloseModal(props) {
    const { open, toggleClose, CloseJobId } = props;

    const closeJob = () => {
        //var link = 'http://localhost:51689/listing/listing/closeJob';
        var link = 'https://talentservicestalent20210219130256.azurewebsites.net/listing/listing/closeJob';
        var cookies = Cookies.get('talentAuthToken');
        console.log(JSON.stringify(CloseJobId));
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json; charset=utf-8'
            },
            dataType: 'json',
            type: "post",
            data: JSON.stringify(CloseJobId),
            success: function (res) {
                if (res.success == true) {
                    console.log(res);
                    toggleClose();
                    window.location = "/ManageJobs";
                } else {
                    console.log(res);
                }
            }
        })

    }

    return (
        <Modal
            size={'small'}
            open={open}
        >
            <Modal.Header>Close job</Modal.Header>
            <Modal.Content>
                <p>Are you sure?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => toggleClose()}>
                    No
          </Button>
                <Button positive onClick={() => closeJob()}>
                    Yes
          </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default CloseModal