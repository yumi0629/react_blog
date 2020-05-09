import React, {useState} from "react";
import {Button, Col, Modal, Row, Typography} from "antd";
import {GithubFilled} from "@ant-design/icons";
import {clientId, githubAuthorizeUrl, redirectUri} from "../network/Api";

export default function SignIn() {
    const [state, setState] = useState({
        visible: false,
    });
    return (
        <div>
            <Button
                type="primary"
                shape="round"
                icon={<GithubFilled style={{marginRight: 8}}/>}
                size="large"
                style={{backgroundColor: "#303030", fontWeight: "500", borderColor: "#303030"}}
                onClick={() => {
                    setState({visible: true,});
                }}>
                Log In
            </Button>
            <Modal
                visible={state.visible}
                onCancel={() => {
                    setState({visible: false});
                }}
                footer={null}>
                <Col align="middle">
                    <Typography.Title
                        level={3}
                        style={{marginTop: 30, marginBottom: 30,}}>
                        SIGN IN
                    </Typography.Title>
                    <Button
                        type="primary"
                        shape="round"
                        icon={<GithubFilled style={{marginRight: 10}}/>}
                        size="large"
                        style={{backgroundColor: "#303030", fontWeight: "500", borderColor: "#303030"}}
                        onClick={() => {
                            let url =
                                githubAuthorizeUrl + 'client_id=' + clientId + '&redirect_uri=' + redirectUri;
                            window.location.href = url;
                        }}>
                        Sign with Github
                    </Button>
                    <Row justify="center"
                         style={{marginTop: 40, marginBottom: 30}}>
                        <Typography.Paragraph
                            level={3}>
                            New to Github?
                        </Typography.Paragraph>
                        <a href="https://www.github.com"
                           style={{fontWeight: "500",}}>
                            Create an account
                        </a>
                    </Row>
                </Col>
            </Modal>
        </div>
    );
}
