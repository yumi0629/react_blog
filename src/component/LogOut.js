import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Col, Modal, Row, Typography} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import SignIn from './Home';
import {getUserInfo} from "../action/githubAction";

const {confirm} = Modal;

function showConfirm() {
    confirm({
        title: 'Do you want to delete these items?',
        icon: <ExclamationCircleOutlined/>,
        content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
            return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {
        },
    });
}

class LogOut extends Component {
    componentDidMount() {
        this.props.dispatch(getUserInfo());
    }

    render() {
        const {user} = this.props;
        if (user == null)
            return <SignIn/>;
        return (
            <Button
                type="primary"
                shape="round"
                icon={<img src={user.avatarUrl} alt="" width={20} height={20}/>}
                size="large"
                style={{fontWeight: "500",}}
                onClick={showConfirm}>
                Log Out
            </Button>
        );
    }
}

const mapStateToProps = state => ({
    user: state.githubReducer.user,
});

export default connect(mapStateToProps)(LogOut);

