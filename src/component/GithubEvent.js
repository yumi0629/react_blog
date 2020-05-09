import React, {Component} from 'react';
import {Typography, Layout, Timeline} from "antd";
import {formatTime, formatToDay} from "../util/dateHelper";
import {connect} from "react-redux";
import {getGithubEvents} from '../action/githubAction';
import {
    PlusCircleFilled,
    EyeFilled,
    UpCircleFilled,
    QuestionCircleFilled,
    MessageFilled,
    ContactsFilled
} from '@ant-design/icons';

function Title() {
    return (
        <Typography.Text
            style={{
                fontSize: 22, color: '#ff4081', fontWeight: "700",
                marginTop: 40, marginLeft: 10, marginRight: 16
            }}>
            Github Events
        </Typography.Text>
    );
}

function Empty() {
    return (
        <Typography.Text
            style={{
                fontSize: 17, color: '#ff4081', fontWeight: "700",
                marginTop: 20, marginLeft: 10, marginRight: 16, marginBottom: 20,
            }}>
            没有任何Github活动数据哦~
        </Typography.Text>
    );
}

function Top(props) {
    if (props.hasEvents) {
        return (
            <Typography.Text
                style={{
                    fontSize: 18,
                    color: '#ff4081',
                    fontWeight: "500",
                    marginTop: 20,
                    marginLeft: 10,
                    marginRight: 16,
                    marginBottom: 30,
                }}>
                {props.eventToday} commits today.
            </Typography.Text>
        )
    }
    return <Empty/>;
}

function getTodayCommits(events) {
    if (events == null) return 0;
    let today = formatToDay(new Date());
    return events.filter(event =>
        formatToDay(event.created_at) === today
    ).length
}

function getEventDetail(event) {
    switch (event.type) {
        case 'CreateEvent':
            return event.payload.description;
        case 'WatchEvent':
            return event.repo.name;
        case 'PushEvent':
            return event.payload.commits[0].message;
        case 'IssuesEvent':
            return event.payload.issue['title'];
        case 'IssueCommentEvent':
            return event.payload.issue['title'];
        case 'MemberEvent':
            return event.repo.name;
        default:
            return event.repo.name;
    }
}

function getEventString(event) {
    switch (event.type) {
        case 'CreateEvent':
            return 'Create a repository ' + event.repo.name;
        case 'WatchEvent':
            return event.payload.action;
        case 'PushEvent':
            return 'Commit to repository ' + event.repo.name;
        case 'IssuesEvent':
            return 'Create a issue on ' + event.repo.name;
        case 'IssueCommentEvent':
            return 'Comment on issue';
        case 'MemberEvent':
            return 'Add member ' + event.payload.member['login'] + ' to';
        default:
            return 'Update ';
    }
}

function getIcon(eventType) {
    switch (eventType) {
        case 'CreateEvent':
            return <PlusCircleFilled style={{color: '#ff4081'}}/>;
        case 'WatchEvent':
            return <EyeFilled style={{color: '#ff4081'}}/>;
        case 'PushEvent':
            return <UpCircleFilled style={{color: '#ff4081'}}/>;
        case 'IssuesEvent':
            return <QuestionCircleFilled style={{color: '#ff4081'}}/>;
        case 'IssueCommentEvent':
            return <MessageFilled style={{color: '#ff4081'}}/>;
        case 'MemberEvent':
            return <ContactsFilled style={{color: '#ff4081'}}/>;
        default:
            return <PlusCircleFilled style={{color: '#ff4081'}}/>;
    }
}

class GithubEvent extends Component {

    componentDidMount() {
        this.props.dispatch(getGithubEvents());
    }

    render() {
        const {events} = this.props;
        let hasEvents = events != null && events.length !== 0;
        return (
            <Layout style={{backgroundColor: "white", margin: 20, borderRadius: 8, paddingLeft: 30, paddingRight: 20}}>
                <Title/>
                <Top
                    hasEvents={hasEvents}
                    eventToday={getTodayCommits(events)}/>
                {
                    hasEvents
                        ? <Timeline style={{marginRight: 16}}>
                            {
                                events.map(
                                    (item) => {
                                        let detail = getEventDetail(item);
                                        return <Timeline.Item
                                            key={item.id}
                                            dot={getIcon(item.type)}>
                                            <Typography.Paragraph
                                                style={{fontSize: 16, color: "#303030"}}>
                                                {getEventString(item)}
                                            </Typography.Paragraph>
                                            {
                                                detail == null || detail === ""
                                                    ? null
                                                    : <Typography.Paragraph
                                                        style={{fontSize: 15}}
                                                        ellipsis={{rows: 2}}>
                                                        {detail}
                                                    </Typography.Paragraph>
                                            }
                                            <Typography.Paragraph
                                                style={{fontSize: 14, color: "#BDBDBD"}}>
                                                {formatTime(item.created_at)}
                                            </Typography.Paragraph>
                                        </Timeline.Item>
                                    }
                                )
                            }
                        </Timeline>
                        : null
                }
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    events: state.githubReducer.events,
    loading: state.githubReducer.loading,
    error: state.githubReducer.error
});

export default connect(mapStateToProps)(GithubEvent);
