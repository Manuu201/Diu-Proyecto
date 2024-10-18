import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/layout'; // Importa el componente Layout
import reportWebVitals from './reportWebVitals';


document.body.innerHTML = '<div id="root"></div>';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Layout/>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
