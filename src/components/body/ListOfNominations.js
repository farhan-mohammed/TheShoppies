import React, { Component } from 'react';
import Movie from './Movie';
import NominationsContext from '../../context/Nominations';

import { CopyToClipboard } from 'react-copy-to-clipboard';
export default class AddNomations extends Component {
    // static contextType = NominationsContext;
    // removeItem = (id) => {
    //     console.log(id);
    //     console.log(this.context.filter(({ imdbID }) => id !== imdbID));
    //     this.context.update(this.context.filter(({ imdbID }) => id !== imdbID));
    // };
    componentDidMount() {
        console.log();
    }
    render() {
        return (
            <div className="main-m">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                    }}
                >
                    <h2 style={{ margin: 0 }}>My Nomations</h2>
                    <NominationsContext.Consumer>
                        {({ nom }) => (
                            <CopyToClipboard
                                text={`${window.location.origin}?data=${JSON.stringify(
                                    nom.map(({ imdbID }) => imdbID)
                                )}`}
                            >
                                <div className="cpy" role="button">
                                    Copy Link
                                </div>
                            </CopyToClipboard>
                        )}
                    </NominationsContext.Consumer>
                </div>
                <div className="movie-con">
                    <NominationsContext.Consumer>
                        {({ nom, removeNomination }) =>
                            nom.map((d) => (
                                <Movie
                                    data={d}
                                    onButton={() => removeNomination(d.imdbID)}
                                    buttonText="Remove Nomination"
                                    color="#f00"
                                />
                            ))
                        }
                    </NominationsContext.Consumer>
                </div>
            </div>
        );
    }
}
