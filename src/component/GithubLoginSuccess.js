import React, {Component} from 'react';
import {Spin, Typography, Col} from 'antd';
import {HttpContainer} from "../util/widgets";
import {connect} from "react-redux";
import {getUserToken} from "../action/githubAction";
import {withRouter} from 'react-router';

class GithubLoginSuccess extends Component {

    componentDidMount() {
        let code = this.props.location.search.substring(1);
        this.props.dispatch(getUserToken(code));
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        const {loading, error} = this.props;
        if (!loading) {
            this.timer = setTimeout(
                () => {
                    this.props.history.push('/');
                },
                3000
            );
        }
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                <HttpContainer
                    isLoading={loading}
                    component={
                        error == null
                            ? <Col align="middle">
                                <img src="images/login_success.png" alt=""/>
                                <div style={{height: 20}}/>
                                <Typography.Paragraph
                                    style={{fontSize: 25,}}>
                                    授权成功，正在跳转至首页
                                </Typography.Paragraph>
                                <Spin size="large"/>
                            </Col>
                            : <Col align="middle" style={{marginTop: 40}}>
                                <img src="images/login_success.png" alt=""/>
                                <div style={{height: 20}}/>
                                <Typography.Paragraph
                                    style={{fontSize: 25,}}>
                                    授权失败，请重试
                                </Typography.Paragraph>
                            </Col>
                    }/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.githubReducer.loading,
    error: state.githubReducer.error
});

export default withRouter(connect(mapStateToProps)(GithubLoginSuccess));
