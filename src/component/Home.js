import React, {Component} from "react";
import {Layout, Menu, Row, Col, BackTop} from "antd";
import '../styles/ant-theme.less';
import RightPage from "./RightPage";
import ArticleList from "./ArticleList";
import LifeList from "./LifeList";
import AboutMe from "./AboutMe";
import ArticleDetail from "./ArticleDetail";
import LifeDetail from "./lifeDetail";
import {Route, Switch, Redirect, Link} from "react-router-dom";
import {articleList, initialRoute, aboutMe, articleDetail, lifeList, lifeDetail} from '../route/routeName';
import LogOut from "./LogOut";
import SignIn from "./SignIn";

const {Content, Sider} = Layout;

function TabMenu() {

    const tabs = [
        {
            title: '文章',
            route: articleList,
        },
        {
            title: '生活',
            route: lifeList,
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
            style={{fontSize: '150%'}}>
            {tabs.map((tab, index) => {
                return <Menu.Item
                    key={index}
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
                    <Col span={10}><TabMenu/></Col>
                    <Col span={4}>{
                        localStorage.getItem('access_token')
                            ? <LogOut/>
                            : <SignIn/>
                    }</Col>
                </Row>
                <Layout>
                    <Content style={{margin: 30, height: '100%'}}>
                        <Route path={articleList} component={ArticleList}/>
                        <Route path={lifeList} component={LifeList}/>
                        <Route path={aboutMe} component={AboutMe}/>
                        <Route path={articleDetail + '/:postId'} component={ArticleDetail}/>
                        <Route path={lifeDetail + '/:postId'} component={LifeDetail}/>
                        <Switch>
                            <Redirect from={initialRoute} to={articleList}/>
                        </Switch>
                    </Content>
                    <Sider width={440} style={{backgroundColor: "transparent"}}>
                        <RightPage/>
                    </Sider>
                </Layout>
                <BackTop/>
            </Layout>
        );
    }
}

export default Home;
