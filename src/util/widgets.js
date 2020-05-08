import {Spin, Result} from 'antd';
import React, {Component} from "react";

export class HttpContainer extends Component {
    render() {
        if (this.props.isLoading) {
            return <Loading/>;
        }
        if (this.props.hasError)
            return <Error/>;
        return (
            <div>
                {this.props.component}
            </div>
        );
    }
}

export function Loading() {
    return (
        <Spin tip="Loading..."/>
    );
}

export function Error() {
    return (
        <Result
            status="warning"
            title="There are some problems with your operation."
        />
    );
}
