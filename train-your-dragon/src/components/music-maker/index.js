import React from "react";
import {connect} from "react-redux";
import {BrandText, Button, Container} from '../style';
import {playWithRNN, playWithVae} from "./actions";


const mapStateToProps = state => {
    return {
        currentOutput: state.modelTrainingReducer.currentOutput,
        audioContext : state.musicReducer.audioContext,
        player: state.musicReducer.player
    }
};

const mapDispatchToProps = dispatch => {
    return {
        startPlayWithRnn: certainty => dispatch(playWithRNN(certainty)),
        startPlayWithVae: sampleCount => dispatch(playWithVae(sampleCount))
    };
};

class MusicMaker extends React.Component {
    constructor(props) {
        super(props);

        this.twinkleTwinkleLittleTrump = this.twinkleTwinkleLittleTrump.bind(this);
        this.playWithRnn = this.playWithRnn.bind(this);
        this.playWithVae = this.playWithVae.bind(this)
    }

    twinkleTwinkleLittleTrump(certainty) {
        function calculatePitch(initial, certainty){
            return (initial + certainty) / 2
        }

        return {
            notes: [
                {pitch: calculatePitch(60 , certainty), startTime: 0.0, endTime: 0.5},
                {pitch: calculatePitch(60 , certainty), startTime: 0.5, endTime: 1.0},
                {pitch: calculatePitch(67 , certainty), startTime: 1.0, endTime: 1.5},
                {pitch: calculatePitch(67 , certainty), startTime: 1.5, endTime: 2.0},
                {pitch: calculatePitch(69 , certainty), startTime: 2.0, endTime: 2.5},
                {pitch: calculatePitch(69 , certainty), startTime: 2.5, endTime: 3.0},
                {pitch: calculatePitch(67 , certainty), startTime: 3.0, endTime: 4.0},
                {pitch: calculatePitch(65 , certainty), startTime: 4.0, endTime: 4.5},
                {pitch: calculatePitch(65 , certainty), startTime: 4.5, endTime: 5.0},
                {pitch: calculatePitch(64 , certainty), startTime: 5.0, endTime: 5.5},
                {pitch: calculatePitch(64 , certainty), startTime: 5.5, endTime: 6.0},
                {pitch: calculatePitch(62 , certainty), startTime: 6.0, endTime: 6.5},
                {pitch: calculatePitch(62 , certainty), startTime: 6.5, endTime: 7.0},
                {pitch: calculatePitch(60 , certainty), startTime: 7.0, endTime: 8.0},
            ],
            totalTime: 8
        }
    }

    playWithRnn(event){
        event.preventDefault();
        const {currentOutput, startPlayWithRnn} = this.props
        const {certainty} = currentOutput
        const tune = this.twinkleTwinkleLittleTrump(certainty)

        startPlayWithRnn(tune)
    }

    playWithVae(event) {
        event.preventDefault();
        const {currentOutput, startPlayWithVae} = this.props
        const {certainty} = currentOutput

        startPlayWithVae(certainty)
    }

    render() {
        const {currentOutput} = this.props;

        if(!currentOutput.output){
            return null;
        }

        return (
            <Container>
                <BrandText>Turn it into sweet sweet music</BrandText>
                <Button onClick={this.playWithRnn}>Play with RNN</Button>
                <Button onClick={this.playWithVae}>Play with Vae</Button>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicMaker);