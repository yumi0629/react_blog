import {List, Typography} from "antd";
import React, {Component} from "react";
import {connect} from "react-redux";
import {list} from "../action/articleAction";
import {formatTime} from "../util/dateHelper";

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
                    item => (
                        <List.Item style={{borderRadius: 8, backgroundColor: "white", marginBottom: 30}}
                                   key={item.title}>
                            <List.Item.Meta
                                style={{fontSize: 20}}
                                title={
                                    <Typography.Title level={3}>
                                        {item.title}
                                    </Typography.Title>}
                                description={formatTime(item.createdAt)}/>
                            <Typography.Paragraph
                                style={{fontSize: 15}}
                                ellipsis={{rows: 2}}>
                                {item.content}
                            </Typography.Paragraph>
                        </List.Item>
                    )
                }/>
        );
    }
}

const mapStateToProps = state => ({
    articles: state.articleListReducer.articles,
    loading: state.articleListReducer.loading,
    error: state.articleListReducer.error
});

export default connect(mapStateToProps)(ArticleList);
