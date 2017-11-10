import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Title from './Title';
import Product from './Product';    
import Client from './Client';
import Order from './Order';
import SupplierNames from './SupplierNames';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Title />, document.getElementById('root'));
// ReactDOM.render(<Product />, document.getElementById('root'));
// ReactDOM.render(<Client />,document.getElementById('root'));
ReactDOM.render(<Order />,document.getElementById('root'));
// ReactDOM.render(<SupplierNames />,document.getElementById('root'));
registerServiceWorker();
