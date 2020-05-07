import React, {Component} from 'react';
import {Row, Typography, Layout} from "antd";
import {CrownFilled} from "@ant-design/icons";
import {connect} from "react-redux";
import {getAbout} from "../action/aboutAction";

class AboutMe extends Component {
    componentDidMount() {
        this.props.dispatch(getAbout());
    }

    render() {
        const {abouts} = this.props;
        let components = [];
        const block40 = <div style={{height: 40}}/>;
        const block20 = <div style={{height: 20}}/>;
        abouts.forEach(
            item => {
                components.push(
                    <Row align="middle">
                        <CrownFilled style={{color: '#ff4081'}}/>
                        <div style={{width: 20}}/>
                        <Typography.Text
                            style={{fontSize: 17, color: '#ff4081', fontWeight: "700"}}>
                            {item.title}
                        </Typography.Text>
                    </Row>
                );
                components.push(block20);
                components.push(
                    <Typography.Paragraph
                        style={{fontSize: 15}}>
                        {item.content}
                    </Typography.Paragraph>
                );
                components.push(block40);
                if (item.image != null) {
                    let images = [];
                    item.image.forEach(image => {
                        images.push(
                            <img
                                src={image} alt="" width='20%' height='20%'/>
                        );
                        images.push(<div style={{width: 30}}/>);
                    });
                    components.push(<Row>{images}</Row>);
                }
            }
        );
        return (
            <Layout style={{padding: 30, backgroundColor: "white", borderRadius: 8}}>
                {components}
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    abouts: state.aboutReducer.abouts,
    loading: state.aboutReducer.loading,
    error: state.aboutReducer.error
});

export default connect(mapStateToProps)(AboutMe);
