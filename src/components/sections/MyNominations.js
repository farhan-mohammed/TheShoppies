import React, { Component } from 'react';
import Movie from '../modules/Movie';
import NominationsContext from '../../context/Nominations';

import { CopyToClipboard } from 'react-copy-to-clipboard';
export default class AddNomations extends Component {
    renderShareLinkButton() {
        return (
            <NominationsContext.Consumer>
                {({ nom }) => {
                    let data = JSON.stringify(nom.map(({ imdbID }) => imdbID));
                    data = data
                        .substring(1, data.length - 1)
                        .replace(/,/g, 'MM')
                        .replace(/"/g, 'NN');
                    return (
                        <CopyToClipboard text={`${window.location.origin}?data=${data}`}>
                            <div className="cpy" role="button">
                                Copy Link
                            </div>
                        </CopyToClipboard>
                    );
                }}
            </NominationsContext.Consumer>
        );
    }
    renderMovies() {
        return (
            <NominationsContext.Consumer>
                {({ nom, removeNomination }) =>
                    nom.map((d) => (
                        <Movie
                            key={d.imdbID}
                            data={d}
                            onButton={() => removeNomination(d.imdbID)}
                            buttonText="Remove Nomination"
                            icon="minus square outline icon"
                        />
                    ))
                }
            </NominationsContext.Consumer>
        );
    }
    render() {
        return (
            <div className="main-m">
                <div className="main-m__li">
                    <h2>My Nomations</h2>
                    {this.renderShareLinkButton()}
                </div>
                <div className="movie-con ui list">{this.renderMovies()}</div>
            </div>
        );
    }
}
