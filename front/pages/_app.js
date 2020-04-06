import React from 'react';
import Head from 'next/head';
import propTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../reducers';
import {initialState} from '../reducers/todo';

const DreamWitch = ({Component, store}) => {
    return (
        <>
            <Provider store={store}>
                <Head>
                    <title>DreamWitch</title>
                </Head>
                <Component/>
            </Provider>
        </>
    );
}

DreamWitch.propTypes = {
    Component: propTypes.elementType,
    store: propTypes.object
}

export default withRedux((initialState, options)=>{
    const middlewares = [];
    const enhancer = compose(applyMiddleware(...middlewares),
        !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    );
    const store = createStore(reducer, initialState, enhancer);
    return store;
})(DreamWitch);