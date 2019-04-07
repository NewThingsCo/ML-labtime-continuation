import * as actions from "./actions";
import {execute, startTraining} from "../../utils/brain";


const initialState = {
    trainedNet: null,
    currentOutput: {},
    testDisabled: true,
    currentInput: ""
};


const modelTrainingReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FIRE_START_TRAINING:
            return ({
           ...state,
            trainedNet : startTraining(),
            testDisabled : false
        });
        case actions.REGISTER_INPUT:
            return ({
            ...state,
            currentInput: action.input
        });
        case actions.EXECUTE_INPUT_ON_MODEL:
            return({
                ...state,
                currentOutput: execute(action.input, state.trainedNet)
            });
        default:
            return state;
    }
};

export default modelTrainingReducer;