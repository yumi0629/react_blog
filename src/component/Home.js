import React, {Component} from "react";
import {Layout, Menu, Row, Col} from "antd";
import '../styles/ant-theme.less';
import RightPage from "./RightPage";
import ArticleListPage from "./ArticleListPage";

const {Content, Sider} = Layout;

function TabMenu() {
    const tabs = [
        '文章',
        '生活',
        '关于我',
    ];
    return (
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['0']}
              style={{fontSize: '150%'}}>
            {tabs.map((tab, index) => {
                return <Menu.Item key={index}>{tab}</Menu.Item>;
            })}
        </Menu>
    );
}

class Home extends Component {
    render() {
        return (
            <Layout>
                <Row className="row-top" align="middle" type="flex" style={{backgroundColor: '#ffffff', height: 70}}>
                    <Col span={6}>{
                        <Row align="middle">
                            <Col span={6}/>
                            <img className="logo" src="images/yumi_header.png" alt="" width="60px" height="60px"/>
                            <img className="logo" src="images/yumi_logo.png" alt="" width="120px" height="36px"/>
                        </Row>
                    }</Col>
                    <Col span={24 - 6}><TabMenu/></Col>
                </Row>
                <Layout>
                    <Content style={{margin: 30, height: '100%'}}>
                        <ArticleListPage/>
                    </Content>
                    <Sider width={440} style={{backgroundColor: '#ffffff'}}>
                        <div style={{margin: 0}}>
                            <RightPage/>
                        </div>
                    </Sider>
                </Layout>

            </Layout>
        );
    }
}

export default Home;
