import React, {Component} from "react";
import {Button, Col, Input, Tag, List, Row, Typography} from "antd";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {list, showReplyHint, hideReplyHint, contentOnChange, addComment} from "../action/commentAction";
import {EditFilled} from "@ant-design/icons";

const {TextArea} = Input;

class Comment extends Component {

    componentDidMount() {
        let type = this.props.type;
        let postId = this.props.postId;
        this.props.dispatch(list(type, postId));
    }

    render() {
        const {user, comments, enable, reply, content} = this.props;
        return (
            <div>
                <Row align="middle">
                    <div style={{width: 4, height: 20, marginRight: 16, backgroundColor: "#ff4081"}}/>
                    <Typography.Text
                        style={{fontSize: 20, color: "#303030"}}>
                        评论
                    </Typography.Text>
                </Row>
                <List
                    itemLayout="vertical"
                    size="large"
                    style={{marginTop: 20}}
                    dataSource={comments}
                    renderItem={
                        item => {
                            return (
                                <List.Item style={{marginBottom: 10}}
                                           key={item.comment_id}>
                                    <Row>
                                        <img src={item.user_avatar} alt="" width={45} height={45}/>

                                        <Col span={22} style={{marginLeft: 16}}>
                                            <Row align="middle" style={{marginBottom: 8}}>
                                                <Typography.Text
                                                    style={{fontSize: 14,}}>
                                                    {item.user_name}
                                                </Typography.Text>
                                                <Typography.Text
                                                    style={{fontSize: 14, color: "#BDBDBD", marginLeft: 10}}>
                                                    {item.created}
                                                </Typography.Text>
                                            </Row>
                                            <span style={{
                                                fontSize: 14,
                                                color: "#ff4081",
                                                display: item.reply_id === -1 ? "none" : "visible",
                                            }}>{`@${item.reply_user_name}：`}</span>

                                            <span style={{fontSize: 14, whiteSpace: "pre-line"}}> {item.comment} </span>
                                        </Col>

                                    </Row>
                                    <div align="right"
                                         style={{marginTop: 8}}>
                                        <span
                                            onClick={() => {
                                                this.props.dispatch(showReplyHint({
                                                    replyId: item.comment_id,
                                                    replyUserId: item.user_id,
                                                    replyUserName: item.user_name,
                                                }));
                                            }}>
                                        <Typography.Text
                                            style={{
                                                fontSize: 14,
                                                color: "#ff4081",
                                                cursor: "pointer",
                                            }}>
                                            扔个大师球捕获他？
                                        </Typography.Text>
                                    </span>
                                    </div>
                                </List.Item>
                            );
                        }
                    }>
                </List>
                <Row style={{marginTop: 40, marginLeft: 22,}}>
                    <img src={user == null ? 'images/yumi_header.png' : user.avatar_url} alt="" width={45} height={45}/>

                    <Col span={22} style={{marginLeft: 20,}} align="right">
                        <Row style={{marginBottom: 10}}>
                            <Tag
                                closable={true}
                                visible={reply != null}
                                color="#ff4081"
                                onClose={() => {
                                    this.props.dispatch(hideReplyHint());
                                }}
                                style={{
                                    fontSize: 14,
                                }}>
                                @{reply == null ? "" : reply.replyUserName}
                            </Tag>
                        </Row>
                        <TextArea
                            autoSize={{minRows: 5, maxRows: 5}}
                            allowClear={true}
                            placeholder={enable ? '请输入评论' : '请先登录哦~'}
                            disabled={!enable}
                            maxLength={300}
                            value={content}
                            onChange={(event) => {
                                this.props.dispatch(contentOnChange(event.target.value));
                            }}>
                        </TextArea>
                        <Button
                            type="primary"
                            icon={<EditFilled/>}
                            disabled={!enable}
                            style={{fontWeight: "500", marginTop: 110}}
                            onClick={() => {
                                let user = JSON.parse(sessionStorage.getItem('user'));
                                this.props.dispatch(addComment(
                                    this.props.type,
                                    {
                                        comment: content,
                                        article_id: this.props.postId,
                                        user_id: user.id.toString(),
                                        user_name: user.name,
                                        user_avatar: user.avatar_url,
                                        reply_id: reply == null ? -1 : reply.replyId,
                                        reply_user_id: reply == null ? "" : reply.replyUserId,
                                        reply_user_name: reply == null ? "" : reply.replyUserName,
                                    }
                                ));
                            }}>
                            发表评论
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

Comment.propTypes = {
    type: PropTypes.number,
    postId: PropTypes.string
};

const mapStateToProps = state => ({
    user: state.commentReducer.user,
    comments: state.commentReducer.comments,
    enable: state.commentReducer.enable,
    reply: state.commentReducer.reply,
    content: state.commentReducer.content,
});

export default connect(mapStateToProps)(Comment);

