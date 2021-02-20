import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Card, Button, Label } from 'semantic-ui-react';
import moment, { duration } from 'moment';
import CloseModal from './CloseModal.jsx';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1, //Not use
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1, //Not use
            activeIndex: "", //Not use
            currentpage: 1, //current page number for cards
            numberOfCardsPerPage: 3,
            openCloseModal: false,
            CloseJobId: undefined
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
        this.changeDisplayCards = this.changeDisplayCards.bind(this);
        this.toggleClose = this.toggleClose.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.editJob = this.editJob.bind(this);
        this.changefilter = this.changefilter.bind(this);
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        this.loadData(() =>
            this.setState({ loaderData })
        )

        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
    };

    loadData(callback) {
        //var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var link = 'https://talentservicestalent20210219130256.azurewebsites.net/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        // your ajax call and other logic goes here
        const databody = {
            'activePage': this.state.activePage,
            'sortbyDate': this.state.sortBy.date,
            'showActive': this.state.filter.showActive,
            'showClosed': this.state.filter.showClosed,
            'showDraft': this.state.filter.showDraft,
            'showExpired': this.state.filter.showExpired,
            'showUnexpired': this.state.filter.showUnexpired
        };
        console.log(this.state.sortBy.date);

        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            type: "get",
            data: databody,
            success: function (res) {
                if (res.success == true) {
                    //console.log(res);
                    this.setState({
                        loadJobs: res.myJobs
                    })
                } else {
                    alert(res);
                }

            }.bind(this)
        })
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    changeDisplayCards(e, { activePage }) {
        this.setState({ currentpage: activePage })
    }

    toggleClose(id) {
        this.setState({
            CloseJobId: id,
            openCloseModal: !this.state.openCloseModal
        })
    }

    changeSort(e, data) {
        const sortDate = data.value === "Newest first" ? "desc" : "asc"
        if (this.state.sortBy.date !== sortDate) { // if select a different sort compared to original sort method is true
            this.setState({
                sortBy: {
                    date: sortDate
                }
            }, function () { //callback function is needed since async and await is diable in the app i think.
                this.loadData(() =>
                    this.setState({ loaderData })
                )   // refresh the page
            }.bind(this));
        }
    }

    changefilter(e, data) {
        const num = Number(data.value[data.value.length - 1]);
        if (this.state.numberOfCardsPerPage !== num) {
            this.setState({
                numberOfCardsPerPage: num
            }, function () { //callback function is needed since async and await is diable in the app i think.
                this.loadData(() =>
                    this.setState({ loaderData })
                )   // refresh the page
            }.bind(this));
        }
    }

    editJob(id) {
        console.log(id);
        //var link = 'http://localhost:51689/listing/listing/GetJobByToEdit';
        var link = 'https://talentservicestalent20210219130256.azurewebsites.net/listing/listing/GetJobByToEdit';
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            type: "get",
            data: { 'id': id },
            success: function (res) {
                if (res.success == true) {
                    console.log(res);
                } else {
                    alert(res);
                }
            }.bind(this)
        })
    }

    render() {
        const jobs = this.state.loadJobs;
        const filter_1 = [
            {
                key: 'Job per page: 2',
                text: 'Job per page: 2',
                value: 'Job per page: 2',
                content: 'Job per page: 2'
            },
            {
                key: 'Job per page: 3',
                text: 'Job per page: 3',
                value: 'Job per page: 3',
                content: 'Job per page: 3'
            }
        ]
        const filter_2 = [
            {
                key: 'Newest first',
                text: 'Newest first',
                value: 'Newest first',
                content: 'Newest first',
            },
            {
                key: 'Oldest first',
                text: 'Oldest first',
                value: 'Oldest first',
                content: 'Oldest first',
            }
        ]
        if (jobs.length === 0) {
            return (
                <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                    <div className="ui container">
                        <div className='ui grid'>
                            <div className="row">
                                <div className="eight wide column">
                                    <h1 className="ui header">List of Jobs:</h1>
                                </div>
                            </div>
                            <div className='row'>
                                <Dropdown icon='filter' text='Filter: Choose filter' className='three wide column'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item text='None' />
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Icon name='calendar' />
                                <span>Sort by date: {' '}</span>
                                <Dropdown
                                    inline
                                    options={filter_2}
                                    defaultValue={filter_2[0].value}
                                    onChange={(e, data) => this.changeSort(e, data)}
                                />
                            </div>
                        </div>
                        <div className="ui grid">
                            <div className="row">
                                <div className="column">
                                    <p>No jobs found</p>
                                </div>
                            </div>
                        </div>
                        <div className="ui grid">
                            <div className="centered row">
                                <Pagination
                                    boundaryRange={0}
                                    defaultActivePage={this.state.currentpage}
                                    firstItem={{
                                        'aria-label': 'First item',
                                        content: '«',
                                    }}
                                    lastItem={{
                                        'aria-label': 'Last item',
                                        content: '»',
                                    }}
                                    siblingRange={1}
                                    totalPages={0}
                                />
                            </div>
                        </div>
                    </div>
                </BodyWrapper>
            )
        } else {
            const lastCardIndex = this.state.currentpage * this.state.numberOfCardsPerPage;
            const firstCardIndex = lastCardIndex - this.state.numberOfCardsPerPage;
            const cardsDisplaying = jobs.slice(firstCardIndex, lastCardIndex); //cards displaying at current page
            const totalPageNumber = Math.ceil(jobs.length / this.state.numberOfCardsPerPage)
            return (
                <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                    <div>
                        <CloseModal open={this.state.openCloseModal} toggleClose={() => this.toggleClose(this.state.CloseJobId)} CloseJobId={this.state.CloseJobId} />
                        <div className="ui container">
                            <div className='ui grid'>
                                <div className="row">
                                    <div className="eight wide column">
                                        <h1 className="ui header">List of Jobs: </h1>
                                    </div>
                                </div>
                                <div className='row'>
                                    <Icon name='filter' />
                                    <span>Filter: {' '}</span>
                                    <Dropdown
                                        inline
                                        options={filter_1}
                                        defaultValue={filter_1[1].value}
                                        onChange={(e, data) => this.changefilter(e, data)}
                                    />
                                    <Icon name='calendar' />
                                    <span>Sort by date: {' '}</span>
                                    <Dropdown
                                        inline
                                        options={filter_2}
                                        defaultValue={filter_2[0].value}
                                        onChange={(e, data) => this.changeSort(e, data)}
                                    />

                                </div>
                            </div>
                            <div className="ui grid">
                                <div className="row">
                                    <div className="column">
                                        <Card.Group itemsPerRow={this.state.numberOfCardsPerPage}>
                                            {cardsDisplaying.map((job) => {
                                                let location = job.location.country + ", " + job.location.city;
                                                if (job.location.country === "" || job.location.city === "") location = "Unknown location";
                                                let summary = job.summary;
                                                if (summary === "") summary = 'No description';
                                                let title = job.title;
                                                if (title === "") title = "No title";
                                                const expire = moment() > new Date(job.expiryDate) ? "Expired" : "Open";
                                                const color = expire === "Expired" ? "red" : "green"
                                                return (
                                                    <Card key={job.id} style={{ height: "300px" }}>
                                                        <Card.Content>
                                                            <Card.Header>{title}</Card.Header>
                                                            <Label as='a' color='black' ribbon='right'>
                                                                <Icon name='user' size='large' /> 0
                                                            </Label>
                                                            <Card.Meta>
                                                                <p>{location}</p>
                                                            </Card.Meta>
                                                            <Card.Description>
                                                                {summary}
                                                            </Card.Description>
                                                        </Card.Content>
                                                        <Card.Content extra>
                                                            <Button color={color} size='mini'>
                                                                {expire}
                                                            </Button>
                                                            <Button.Group floated='right' size='mini'>
                                                                <Button basic color='blue' onClick={() => this.toggleClose(job.id)}>
                                                                    <Icon name='dont' />
                                                                Close
                                                            </Button>
                                                                <Button basic color='blue' onClick={() => this.editJob(job.id)}><Icon name='edit' />Edit</Button>
                                                                <Button basic color='blue'><Icon name='copy' />Copy</Button>
                                                            </Button.Group>

                                                        </Card.Content>
                                                    </Card>
                                                )
                                            })}

                                        </Card.Group>
                                    </div>
                                </div>
                            </div>
                            <div className="ui grid">
                                <div className="centered row">
                                    <Pagination
                                        boundaryRange={0}
                                        defaultActivePage={1}
                                        firstItem={null}
                                        lastItem={null}
                                        siblingRange={1}
                                        totalPages={totalPageNumber}
                                        onPageChange={this.changeDisplayCards}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </BodyWrapper>
            )
        }

    }
}