import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as uiReducer} from 'redux-ui'
import modelTrainingReducer from "./components/train-model/reducer";

export default combineReducers({
  modelTrainingReducer: modelTrainingReducer,
  router,
  ui: uiReducer
})
