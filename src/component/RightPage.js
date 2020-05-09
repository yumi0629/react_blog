import React, {Component} from "react";
import {Layout, Col, Row, Typography} from "antd";
import GithubEvent from './GithubEvent';
import '../styles/right-page.less'

function Introduction() {
    return (
        <div className="introduction">
            <Row align="middle">
                <Col span={9} align="middle">
                    <img className="logo" src="images/header.png" alt="" width="80px" height="80px"/>
                </Col>
                <Col span={1}/>
                <Col span={14}>
                    <img className="logo" src="images/introduction.png" alt="" width="75%" height="75%"/>
                    <p/>
                    <Row align="middle">
                        <img className="logo" src="images/qq.png" alt="" width="16" height="16"/>
                        <Typography style={{color: "white", fontWeight: "700",}}>
                            &nbsp;&nbsp;984542616
                        </Typography>
                    </Row>
                    <Row align="middle">
                        <img className="logo" src="images/github.png" alt="" width="16" height="16"/>
                        <a href="https://github.com/yumi0629"
                           style={{color: "white", fontWeight: "700",}}>
                            &nbsp;&nbsp;github.com/yumi0629
                        </a>
                    </Row>
                </Col>
            </Row>
        </div>

    );
}

class RightPage extends Component {
    render() {
        return (
            <Layout style={{marginTop: 10}}>
                <Introduction/>
                <GithubEvent/>
            </Layout>
        );
    }
}

export default RightPage;
