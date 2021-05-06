import { createStore } from 'redux';
import { addSearchItem } from '../reducer/reducer';

const store = createStore(addSearchItem);

export default store;