import React, { Component } from 'react';
import Header from './Header';

import MyNominations from './sections/MyNominations';
import AddNominations from './sections/AddNominations';
import { NominationsStore } from '../context/Nominations';
export default class App extends Component {
    render() {
        return (
            <div className="container">
                <NominationsStore>
                    <Header />
                    <main className="main">
                        <MyNominations />
                        <AddNominations />
                    </main>
                </NominationsStore>
            </div>
        );
    }
}
