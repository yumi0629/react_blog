import React, {Component} from "react";
import {connect} from "react-redux";
import {HttpContainer} from '../util/widgets'
import {Layout, Typography} from "antd";
import {detail} from "../action/articleAction";
import ReactMarkdown from 'react-markdown';
import CodeBlock from "./CodeBlock";
import {formatTime} from "../util/dateHelper";

class ArticleDetail extends Component {

    title = this.props.location.state.title;

    componentDidMount() {
        let postId = this.props.match.params.postId;
        this.props.dispatch(detail(postId));
    }

    render() {
        const {detail, loading, error} = this.props;
        return (
            <Layout style={{padding: 30, backgroundColor: "white", borderRadius: 8}}>
                <HttpContainer
                    isLoading={loading}
                    error={error}
                    component={
                        <div>
                            <Typography.Title
                                level={3}
                                style={{
                                    marginTop: 20,
                                    marginLeft: 10,
                                    marginRight: 16,
                                    marginBottom: 30,
                                }}>
                                {this.title}
                            </Typography.Title>
                            <Typography.Paragraph
                                style={{
                                    marginTop: 20,
                                    marginLeft: 10,
                                    marginRight: 16,
                                    marginBottom: 30,
                                    color: "#BDBDBD"
                                }}>
                                {formatTime(detail.createdAt)}
                            </Typography.Paragraph>
                            <ReactMarkdown
                                source={detail.content}
                                escapeHtml={false}
                                renderers={{
                                    code: CodeBlock,
                                }}
                            />
                        </div>
                    }/>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    title: "",
    detail: state.articleReducer.detail,
    loading: state.articleReducer.loading,
    error: state.articleReducer.error
});

export default connect(mapStateToProps)(ArticleDetail);
