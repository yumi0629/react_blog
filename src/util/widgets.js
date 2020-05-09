import {Spin, Result} from 'antd';
import React, {Component} from "react";
import PropTypes from 'prop-types';

export class HttpContainer extends Component {

    render() {
        if (this.props.isLoading) {
            return <Loading/>;
        }
        let error = this.props.error;
        if (error != null)
            return <Error message={error.message}/>;
        return this.props.component;
    }
}

HttpContainer.propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.object,
    component: PropTypes.node,
};

export function Loading() {
    return (
        <Spin tip="Loading..." size="large"/>
    );
}

export function Error(props) {
    let message = props.message;
    return (
        <Result
            status="warning"
            title="There are some problems with your operation."
            subTitle={message}
        />
    );
}
