import { createStore } from 'redux';
import rootReducer from '../reducers/index';

var store;

export default function getStore() {
    if(store){
        return store;
    }
    store = createStore(rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );

    return store;
}