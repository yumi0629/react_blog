import React, {Component} from "react";
import {Layout, Menu, Row, Col} from "antd";
import '../styles/ant-theme.less';
import RightPage from "./RightPage";
import ArticleListPage from "./ArticleList";
import AboutMe from "./AboutMe";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import {articleList, initialRoute, aboutMe} from '../route/routeName';

const {Content, Sider} = Layout;

function TabMenu() {
    const tabs = [
        {
            title: '文章',
            route: articleList,
        },
        {
            title: '生活',
            route: '/',
        },
        {
            title: '关于我',
            route: aboutMe,
        },
    ];
    return (
        <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['0']}
            style={{fontSize: '150%'}}
            onClick={(param) => {

            }}>
            {tabs.map((tab) => {
                return <Menu.Item
                    key={tab.route}
                    style={{fontWeight: "700"}}>
                    <Link to={tab.route}>
                        {tab.title}
                    </Link>
                </Menu.Item>;
            })}
        </Menu>
    );
}

class Home extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Row className="row-top" align="middle" type="flex"
                         style={{backgroundColor: "white", height: 70}}>
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

                            <Route path={articleList} component={ArticleListPage}/>
                            <Route path={aboutMe} component={AboutMe}/>
                            <Switch>
                                <Redirect from={initialRoute} to={articleList}/>
                            </Switch>
                        </Content>
                        <Sider width={440} style={{backgroundColor: '#ffffff',padding:20}}>
                            <RightPage/>
                        </Sider>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default Home;
