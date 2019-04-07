import React from 'react'
import TrainModel from './components/train-model'
import UseModel from './components/use-model';
import Results from './components/results';

export class App extends React.Component {
    render() {
        return (
            <div className="App">
                <TrainModel />
                <UseModel />
                <Results />
            </div>
        )
    }
}

export default App;