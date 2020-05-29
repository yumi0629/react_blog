import React, {Component} from "react";
import Comment from './Comment';
import {HttpContainer} from '../util/widgets'
import {Col, Row, Typography} from "antd";
import {connect} from "react-redux";
import {getLifeDetail} from "../action/lifeAction";

class LifeDetail extends Component {
    componentDidMount() {
        let postId = this.props.match.params.postId;
        this.props.dispatch(getLifeDetail(postId));
    }

    render() {
        const {detail, loading, error} = this.props;
        let width = (document.body.clientWidth || document.documentElement.clientWidth) / 5;
        return (
            <div style={{padding: 30, backgroundColor: "white", borderRadius: 8}}>
                <HttpContainer
                    isLoading={loading}
                    error={error}
                    component={
                        <div>
                            <Row>
                                <img className="logo" src="images/yumi_header.png" alt="" width="60px" height="60px"/>

                                <Col span={22} style={{marginLeft: 16}}>
                                    <Typography.Text
                                        style={{fontSize: 14,}}>
                                        {detail.created}
                                    </Typography.Text>

                                    <Typography.Text
                                        style={{fontSize: 14, color: "#BDBDBD", marginLeft: 10}}>
                                        {detail.content}
                                    </Typography.Text>
                                </Col>

                            </Row>

                            <Row>
                                {
                                    detail.images == null
                                        ? <div/>
                                        : detail.images.map((image) => {
                                            return <div style={{width: width, height: width, margin: 20}}>
                                                <img src={image} alt=""
                                                     style={{width: width, height: width, objectFit: "cover"}}/>
                                            </div>

                                        })
                                }

                            </Row>
                        </div>
                    }/>
                <div style={{height: 30}}/>
                <Comment type={1} postId={this.props.match.params.postId}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    detail: state.lifeReducer.detail,
    loading: state.lifeReducer.loading,
    error: state.lifeReducer.error
});

export default connect(mapStateToProps)(LifeDetail);
