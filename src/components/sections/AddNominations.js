import React, { Component, Fragment } from 'react';
import OMDB from '../../apis/OMDb';
import Movie from '../modules/Movie';
import NominationsContext from '../../context/Nominations';
export default class AddNomations extends Component {
    state = { in: '', result: [], page: 1, term: '', total: '' };
    // Searching for a movie
    onSubmit = () => {
        OMDB.get(``, { params: { s: this.state.in, type: 'movie' } }).then(({ data }) => {
            if (data.Response === 'True') {
                this.setState({
                    result: data.Search,
                    page: 1,
                    total: data.totalResults,
                    term: this.state.in,
                });
            } else {
                alert(data.Error);
            }
        });
    };
    // Changing the page for the research results on the movie
    // change can be -1 or +1
    changePage = (change) => {
        if (this.state.term) {
            let { page, total } = this.state;
            if (page + change > 0 && page + change <= Math.ceil(total / 10)) {
                OMDB.get(``, {
                    params: { s: this.state.term, type: 'movie', page: page + change },
                }).then(({ data }) => {
                    if (data.Response === 'True') {
                        this.setState({ result: data.Search, page: page + change, in: '' });
                    }
                });
            }
        }
    };
    renderResults() {
        if (this.state.term) {
            return (
                <Fragment>
                    <div className="adno-divider">
                        <div
                            className="adno-divider__prev"
                            role="button"
                            onClick={() => this.changePage(-1)}
                        >
                            <i className="arrow circle left icon" style={{ margin: '0 8px' }} />
                            Previous
                        </div>
                        <div className="adno-divider__page">
                            Page {this.state.page} / {Math.ceil(this.state.total / 10)}
                        </div>
                        <div
                            className="adno-divider__next"
                            role="button"
                            onClick={() => this.changePage(1)}
                        >
                            Next
                            <i className="arrow circle right icon" style={{ margin: '0 8px' }} />
                        </div>
                    </div>
                    <NominationsContext.Consumer>
                        {({ addNomination, nom }) => (
                            <div className="movie-con">
                                {this.state.result.map((d) => {
                                    for (let { imdbID } of nom) {
                                        // eslint-disable-next-line
                                        if (imdbID === d.imdbID) return;
                                    }
                                    return (
                                        <Movie
                                            key={d.imdbID}
                                            data={d}
                                            onButton={() => addNomination(d)}
                                            buttonText="Add Nomination"
                                            icon="plus square outline icon"
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </NominationsContext.Consumer>
                </Fragment>
            );
        }
    }
    render() {
        return (
            <div>
                <h2>Add Nominations</h2>
                <div className="adno-search">
                    <div
                        className="ui icon input"
                        style={{ width: '100%' }}
                        value={this.state.in}
                        onChange={(e) => this.setState({ in: e.target.value })}
                    >
                        <input
                            type="text"
                            placeholder="Search Movies..."
                            onKeyDown={(e) => (e.key === 'Enter' ? this.onSubmit() : '')}
                        />
                        <i className="circular search link icon" onClick={this.onSubmit} />
                    </div>
                </div>
                {this.renderResults()}
            </div>
        );
    }
}
