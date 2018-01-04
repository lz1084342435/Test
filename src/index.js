import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import App from './App';
import Title from './Title';
import Product from './Product';    
import Client from './Client';
import Order from './Order';
import SupplierNames from './SupplierNames';
import OrderApply from './orderApply';
import store from '../src/components/store';
import registerServiceWorker from './registerServiceWorker';
import Route from './Route';
// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Title />, document.getElementById('root'));
// ReactDOM.render(<Product />, document.getElementById('root'));
// ReactDOM.render(<Client />,document.getElementById('root'));
// ReactDOM.render(<Order />,document.getElementById('root'));
// ReactDOM.render(<SupplierNames />,document.getElementById('root'));
// ReactDOM.render(<OrderApply />,document.getElementById('root'));
ReactDOM.render(
    <Provider
        store={store}
    >
        <Route />
    </Provider>,
    document.getElementById('root')

);
registerServiceWorker();
