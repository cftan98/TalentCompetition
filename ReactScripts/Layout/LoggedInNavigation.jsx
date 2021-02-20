import React from 'react';
import ReactDOM from 'react-dom';
import NavigationBar from './NavigationBar.jsx';
import Cookies from 'js-cookie';

export class LoggedInNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: ''
        }
        this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    };

    componentDidMount() {
        this.isUserAuthenticated();
    }

    isUserAuthenticated() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/isUserAuthenticated',
            url: 'https://talentservicesprofile20210219125952.azurewebsites.net/profile/profile/isUserAuthenticated',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                if (res.isAuthenticated) {
                    this.setState({
                        userType: res.type
                    })
                }
            }.bind(this),
            error: function (res) {
                console.log("Not logged in!!")
            }.bind(this)
        })
    }

    render() {
        // Hardcoded values for now, so I can shift this to a (mostly) parameterized design
        // and keep current functionality.
        const placeholder = [
            {
                label: "2",
                href: "",
                type: "placeholder"
            },

        ]

        const talentData = [
            {
                label: "Profile",
                href: "/TalentProfile",
                type: "link"
            },
            {
                label: "View Employer Feed",
                href: "/EmployerFeed",
                type: "link"
            },
            {   //makes sure that the talent navigation menu is the same height as the recruiter/employer menu
                type: "placeholder",
                label: "1",
                href: "",
                right: true
            }
        ]
        const recruitmentData = [
            {
                label: "View Talent Feed",
                href: "/Feed",
                type: "link"
            },
            {
                label: 'View Talent Watchlist',
                href: '/Watchlist',
                type: 'link'
            },
            {
                label: "Employer Profile",
                href: "/EmployerProfile",
                type: "link"
            },
            {
                label: "Talent Matching",
                href: "/TalentMatching",
                type: "link"
            },
            {
                label: "Manage Jobs",
                href: "/ManageJobs",
                type: "link"
            },
            {
                label: "Manage Clients",
                href: "/ManageClient",
                type: "link"
            },
            {
                type: "button",
                label: "Post a Job",
                href: "/PostJob",
                right: true
            }
        ];

        const empData = [
            {
                label: "View Talent Feed",
                href: "/Feed",
                type: "link"
            },
            {
                label: 'View Talent Watchlist',
                href: '/Watchlist',
                type: 'link'
            },
            {
                label: "Employer Profile",
                href: "/EmployerProfile",
                type: "link"
            },
            {
                label: "Manage Jobs",
                href: "/ManageJobs",
                type: "link"
            },
            {
                type: "button",
                label: "Post a Job",
                href: "/PostJob",
                right: true
            }
        ]

        let userType = this.props.role.toLowerCase()

        let navdata = [];
        switch (userType) {
            case 'employer':
                navdata = empData
                break
            case 'recruiter':
                navdata = recruitmentData
                break
            case 'talent':
                navdata = talentData
                break;
            default:
                navdata = placeholder
        }

        return (
            <NavigationBar data={navdata} />
        )
    };
}