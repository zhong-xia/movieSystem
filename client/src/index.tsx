import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { store } from './redux/store';
// import MovieAction from './redux/actions/MovieAction';
// import * as serviceWorker from './serviceWorker';
// import { MovieService } from './services/MovieService';

import "antd/dist/antd.css"

// store.subscribe(()=> {
//     console.log(store.getState());
// })

// store.dispatch(MovieAction.setLoadingAction(true));

// store.dispatch(MovieAction.SetConditionAction({
//     page:2
// }))

// store.dispatch(MovieAction.fetchMovies({
//     page: 2
// })).then(()=>{
//     store.dispatch(MovieAction.deleteMovie("5e114d2a78be4d31e83dcfb3"));
// })


//路由


//界面  antd: UI库





ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

// MovieService.add({
//     name: "abc",
//     timeLong: 33,
//     types: ["喜剧"],
//     areas: ["大陆"],
//     isHot: true,
//     isClassic: false,
//     isComing: true
// }).then(data => {
    
// })

// MovieService.getMovies({
//     page:2
// }).then(movies => {
//     movies.data.forEach(m => {
//         console.log(m.name, m.types)
//     })
// })