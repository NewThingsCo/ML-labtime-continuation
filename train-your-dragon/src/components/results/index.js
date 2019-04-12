import React from "react";
import {connect} from "react-redux";
import {BrandText, Container} from '../style';


const mapStateToProps = state => {
    return {
        currentOutput: state.modelTrainingReducer.currentOutput
    }
};

class Results extends React.Component {

    render() {
        const {currentOutput} = this.props;

        if(!currentOutput.output){
            return null;
        }

        const outputText = "Result : " + currentOutput.output + " Certainty : " + currentOutput.certainty + "%";
        return (
            <Container>
                <BrandText>{outputText}</BrandText>
            </Container>
        );
    }
}

export default connect(mapStateToProps, null)(Results);
