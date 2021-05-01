import React, { Component } from 'react';
import awardImage from '../media/shoppies.png';
import NominationContext from '../context/Nominations';
import { Fragment } from 'react';
export default class Header extends Component {
    render() {
        return (
            <Fragment>
                <header className="header">
                    <div className="header-logo">
                        <img src={awardImage} alt="" /> <h1>Shoppies</h1>
                    </div>
                    <div className="header-text">
                        <a href="https://github.com/farhan-mohammed/scr-img">
                            <i class="github icon"></i>
                        </a>
                        <NominationContext.Consumer>
                            {({ nom, clearNominations }) =>
                                nom.length >= 5 ? (
                                    <div
                                        className="cpy cpy-response"
                                        onClick={() => {
                                            clearNominations();
                                            alert('Thank you for your nominations!');
                                        }}
                                    >
                                        Click to submit your nominations!
                                    </div>
                                ) : (
                                    ''
                                )
                            }
                        </NominationContext.Consumer>
                    </div>
                </header>
            </Fragment>
        );
    }
}
