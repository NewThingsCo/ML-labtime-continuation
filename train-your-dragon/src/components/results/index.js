import React from "react";
import {connect} from "react-redux";
import {BrandText, Container} from '../style';


const mapStateToProps = state => {
    return {
        currentOutput: state.modelTrainingReducer.currentOutput,
        testDisabled: state.modelTrainingReducer.testDisabled
    }
};

class Results extends React.Component {
    render() {
        const {currentOutput} = this.props;

        const outputText = "Result : " + currentOutput.output + " Certainty : " + currentOutput.certainty + "%";
        return (
            <Container>
                <BrandText>{outputText}</BrandText>
            </Container>
        );
    }
}

export default connect(mapStateToProps, null)(Results);
