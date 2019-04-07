import React from "react";
import {connect} from "react-redux";
import {Button, Container} from '../style';
import {executeInputOnModel, registerCurrentInput} from "../train-model/actions";


const mapStateToProps = state => {
    return {
        currentInput: state.modelTrainingReducer.currentInput,
        testDisabled: state.modelTrainingReducer.testDisabled
    }
};

const mapDispatchToProps = dispatch => {
    return {
        registerCurrentInput: input => dispatch(registerCurrentInput(input)),
        executeInputOnModel : input => dispatch(executeInputOnModel(input))
    };
};

class UseModel extends React.Component {
    constructor() {
        super();
        this.handleExecuteInput = this.handleExecuteInput.bind(this);
        this.registerInput = this.registerInput.bind(this);
    }

    handleExecuteInput(event) {
        if(event !== undefined) event.preventDefault();
        const {currentInput} = this.props;
        this.props.executeInputOnModel(currentInput);
    }

    registerInput(event) {
        if(event !== undefined) event.preventDefault();
        let input = event.target.value;
        this.props.registerCurrentInput(input);
    }

    render() {
        const {testDisabled} = this.props;

        return (
            <Container>
                <input type="text" onChange={this.registerInput} disabled={testDisabled} />
                <Button onClick={this.handleExecuteInput}>Test that Tweet</Button>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UseModel);
