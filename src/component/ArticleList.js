import {List, Typography} from "antd";
import React, {Component} from "react";
import {connect} from "react-redux";
import {list} from "../action/articleAction";
import {formatTime} from "../util/dateHelper";
import {Link} from "react-router-dom";
import {articleDetail} from "../route/routeName";

class ArticleList extends Component {
    componentDidMount() {
        this.props.dispatch(list());
    }

    render() {
        const {articles} = this.props;

        return (
            <List
                itemLayout="vertical"
                size="large"
                dataSource={articles}
                renderItem={
                    item => {
                        let url = item.originalUrl;
                        let postId = url.substring(url.lastIndexOf('/') + 1);
                        let path = {
                            pathname: articleDetail + '/' + postId,
                            state: {
                                title: item.title,
                            },
                        };
                        return (
                            <Link to={path}>
                                <List.Item style={{borderRadius: 8, backgroundColor: "white", marginBottom: 30}}
                                           key={item.title}>
                                    <List.Item.Meta
                                        style={{fontSize: 20}}
                                        title={
                                            <Typography.Paragraph
                                                style={{fontSize: 20, fontWeight: 700}}>
                                                {item.title}
                                            </Typography.Paragraph>}
                                        description={formatTime(item.createdAt)}/>
                                    <Typography.Paragraph
                                        style={{fontSize: 15}}
                                        ellipsis={{rows: 2}}>
                                        {item.content}
                                    </Typography.Paragraph>
                                    <Typography.Paragraph
                                        style={{fontSize: 14, color: "#BDBDBD", textAlign: "right"}}>
                                        阅读全文
                                    </Typography.Paragraph>
                                </List.Item>
                            </Link>
                        )
                    }
                }/>
        );
    }
}

const mapStateToProps = state => ({
    articles: state.articleReducer.articles,
    loading: state.articleReducer.loading,
    error: state.articleReducer.error
});

export default connect(mapStateToProps)(ArticleList);
