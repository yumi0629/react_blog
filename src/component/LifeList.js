import React, {Component} from "react";
import {connect} from "react-redux";
import {getLifeList} from "../action/lifeAction";
import AutoResponsive from "autoresponsive-react";
import {Layout, Typography} from "antd";
import {HttpContainer} from "../util/widgets";
import {Link} from "react-router-dom";
import {lifeDetail} from "../route/routeName";

class LifeList extends Component {
    componentDidMount() {
        this.props.dispatch(getLifeList());
    }

    getAutoResponsiveProps() {
        return {
            itemMargin: 20,
            itemClassName: 'item',
            gridWidth: 100,
            transitionDuration: '.5',
            containerWidth: (document.body.clientWidth || document.documentElement.clientWidth) - 322
        };
    }

    render() {
        const {lives, loading, error} = this.props;
        return (
            <Layout style={{padding: 30, borderRadius: 8}}>
                <HttpContainer
                    isLoading={loading}
                    error={error}
                    component={
                        <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
                            {
                                lives.map((life) => {
                                    let style = {
                                        position: "relative",
                                        width: (document.body.clientWidth || document.documentElement.clientWidth) / 5,
                                        height: (document.body.clientWidth || document.documentElement.clientWidth) / 3,
                                        background: "white",
                                        margin: 40,
                                        borderRadius: 8
                                    };
                                    let path = {
                                        pathname: lifeDetail + '/' + life.post_id
                                    };
                                    return (
                                        <Link to={path} style={style}>
                                            <div key={life.post_id}>
                                                <img src={life.images[0]} alt=""
                                                     style={{
                                                         position: "absolute",
                                                         width: "100%",
                                                         height: "100%",
                                                         objectFit: "cover",
                                                         left: 0,
                                                         right: 0,
                                                         top: 0,
                                                         bottom: 0,
                                                         borderRadius: 8
                                                     }}/>
                                                <Typography.Paragraph
                                                    style={{
                                                        position: "absolute",
                                                        width: "100%",
                                                        height: 60,
                                                        fontSize: 18,
                                                        fontWeight: 500,
                                                        lineClamp: 2,
                                                        overflow: "hidden",
                                                        padding: 10,
                                                        backdropFilter: "blur(10px)",
                                                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                                                        bottom: 0,
                                                        color: "white"
                                                    }}>
                                                    {life.content}
                                                </Typography.Paragraph>}
                                            </div>
                                        </Link>
                                    );
                                })
                            }
                        </AutoResponsive>}/>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    lives: state.lifeReducer.lives,
    loading: state.lifeReducer.loading,
    error: state.lifeReducer.error
});

export default connect(mapStateToProps)(LifeList);
