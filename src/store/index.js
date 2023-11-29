import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import todosReducer from './reducers/todosReducer';

const rootReducer = combineReducers({
    todos: todosReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
