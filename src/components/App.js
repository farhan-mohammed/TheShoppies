import React, { Component } from 'react';
import Header from './Header';
import Body from './Body';
import { NominationsStore } from '../context/Nominations';
export default class App extends Component {
    render() {
        return (
            <div className="container">
                <NominationsStore>
                    <Header />
                    <Body />
                </NominationsStore>
            </div>
        );
    }
}
