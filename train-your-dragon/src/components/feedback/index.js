import React from "react";
import {connect} from "react-redux";
import {Button, Container} from '../style';
import {trainModelWithInput} from "./actions";


const mapStateToProps = state => {
    return {
        currentOutput: state.modelTrainingReducer.currentOutput,
        currentInput: state.modelTrainingReducer.currentInput
    }
};

const mapDispatchToProps = dispatch => {
    return {
        trainModelWithInput: toBeAdded => dispatch(trainModelWithInput(toBeAdded))
    };
};

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.handleCorrectClick = this.handleCorrectClick.bind(this);
        this.handleIncorrectClick = this.handleIncorrectClick.bind(this);
    }


    handleCorrectClick( event ){
        event.preventDefault();
        const {currentInput, currentOutput, trainModelWithInput} = this.props

        const trainingOutput = currentOutput === "Donald Trump" ? {trump : 1} : {kardashian : 1}
        const toBeAdded = {
            currentInput,
            output: trainingOutput
        };

        trainModelWithInput(toBeAdded);
    }

    handleIncorrectClick( event ){
        event.preventDefault();
        const {currentInput, currentOutput, trainModelWithInput} = this.props

        const trainingOutput = currentOutput === "Donald Trump" ? {kardashian : 1} : {trump : 1}
        const toBeAdded = {
            input: currentInput,
            output: trainingOutput
        };

        trainModelWithInput(toBeAdded);
    }

    render() {
        const {currentOutput} = this.props;

        if(!currentOutput.output){
            return null;
        }

        return (
            <Container>
                <Button onClick={this.handleCorrectClick}>Correct!</Button>
                <Button onClick={this.handleIncorrectClick}>Fake News!</Button>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);