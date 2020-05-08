import React, {Component} from 'react';
import {Row, Typography, Layout} from "antd";
import {CrownFilled} from "@ant-design/icons";
import {connect} from "react-redux";
import {getAbout} from "../action/aboutAction";
import {HttpContainer} from '../util/widgets'

class AboutMe extends Component {
    componentDidMount() {
        this.props.dispatch(getAbout());
    }

    render() {
        const {abouts, loading, error} = this.props;
        let components = [];
        abouts.forEach(
            (item, index) => {
                components.push(
                    <Row align="middle" key={"0" + index}>
                        <CrownFilled style={{color: '#ff4081'}}/>
                        <div style={{width: 20}}/>
                        <Typography.Text
                            style={{fontSize: 17, color: '#ff4081', fontWeight: "700"}}>
                            {item.title}
                        </Typography.Text>
                    </Row>
                );
                components.push(<div key={"1" + index} style={{height: 20}}/>);
                components.push(
                    <Typography.Paragraph
                        key={"2" + index}
                        style={{fontSize: 15}}>
                        {item.content}
                    </Typography.Paragraph>
                );
                components.push(<div key={"3" + index} style={{height: 40}}/>);
                if (item.image != null) {
                    let images = [];
                    item.image.forEach((image, i) => {
                        images.push(
                            <img
                                key={index + '1' + i} src={image} alt="" width='20%' height='20%'/>
                        );
                        images.push(<div key={index + '2' + i} style={{width: 30}}/>);
                    });
                    components.push(<Row key={"4" + index}>{images}</Row>);
                }
            }
        );
        return (
            <Layout style={{padding: 30, backgroundColor: "white", borderRadius: 8}}>
                <HttpContainer
                    isLoading={loading}
                    hasError={error != null}
                    component={components}/>
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
