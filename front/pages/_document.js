import React from 'react';
import {Helmet} from 'react-helmet';
import Document, { Main, NextScript } from 'next/document';
import propTypes from 'prop-types';
import {ServerStyleSheet} from 'styled-components';
import GlobalStyle from '../components/styledComponents/GlobalStyle';

class MyDocument extends Document {
    static getInitialProps(context) {
        const sheet = new ServerStyleSheet();
        const page = context.renderPage((App)=>(props)=>
            sheet.collectStyles(
                <>
                    <GlobalStyle/>
                    <App {...props}/>
                </>
            )
        );
        const styleTags = sheet.getStyleElement();
        return {...page, helmet: Helmet.renderStatic(), styleTags};
    }
    render () {
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();
        return (
            <html {...htmlAttrs}>
                <head>
                    {this.props.styleTags}
                    {Object.values(helmet).map(el=>el.toComponent())}
                </head>
                <body {...bodyAttrs}>
                    <Main/>
                    {process.env.NODE_ENV === 'production'
                    && <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />}
                    <NextScript/>
                </body>
            </html>
        )
    }
}

MyDocument.propTypes = {
    helmet: propTypes.object.isRequired,
    styleTags: propTypes.object.isRequired
}

export default MyDocument;