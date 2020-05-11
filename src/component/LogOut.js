import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import SignIn from './SignIn';
import {getUserInfo} from "../action/githubAction";

const {confirm} = Modal;

function showConfirm() {
    confirm({
        title: '确认要退出登录吗？',
        icon: <ExclamationCircleOutlined/>,
        content: '退出登录将删除所有用户数据，且无法使用评论功能哦~',
        onOk() {
            localStorage.clear();
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
                icon={<img src={user.avatar_url} alt="" width={28} height={28} style={{marginRight: 12}}/>}
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

