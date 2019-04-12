import {MusicRNN, MusicVAE, Player, sequences} from "@magenta/music";
import {PLAY_WITH_RNN, PLAY_WITH_VAE} from "./actions";


const initialState = {
    audioContext: new (window.AudioContext || window.webkitAudioContext)(),
    player: new Player()
};


const musicReducer = (state = initialState, action) => {
    const {player} = state

    switch (action.type) {
        case PLAY_WITH_RNN:
            const {tune} = action

            const music_rnn = new MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn')

            music_rnn.initialize().then(function(){
                if(player.isPlaying()){
                    player.stop()
                }

                const qns = sequences.quantizeNoteSequence(tune, 4)
                const rnn_steps = 200
                const rnn_temperature = 2.5
                music_rnn
                    .continueSequence(qns, rnn_steps, rnn_temperature)
                    .then((sample) => player.start(sample))

                player.stop()

            });

            return ({
                ...state
            })
        case PLAY_WITH_VAE:
            const music_vae = new MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_16bar_small_q2')
            const {sampleCount} = action
            console.log("attempting to intialize model")
            music_vae.initialize().then(
                function () {
                    if (player.isPlaying()) {
                        player.stop()
                    }

                    const temperature = 100 - sampleCount // the more certain the less variance
                    music_vae
                        .sample(sampleCount, temperature, null, 4, 120)
                        .then((sample) => {
                            console.log("attempting to play sample")

                            player.start(sample[0])
                        })

                    player.stop()
                })
            return ({
                ...state
            })
        default:
            return state;
    }
};

export default musicReducer;