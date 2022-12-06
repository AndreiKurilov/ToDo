import { createStore, combineReducers } from 'redux';

import { project } from './reducers/projectReducer';

export default createStore(combineReducers({ project }));
