import React, { Component, Fragment } from 'react';
import OMDB from '../../apis/OMDb';
import Movie from './Movie';
import NominationsContext from '../../context/Nominations';
export default class AddNomations extends Component {
    constructor(props) {
        super(props);
        this.state = { in: '', result: [], page: 1, term: '', total: '' };
    }
    onSubmit = () => {
        OMDB.get(``, { params: { s: this.state.in, type: 'movie' } }).then(({ data }) => {
            if (data.Response === 'True') {
                this.setState({
                    result: data.Search,
                    page: 1,
                    total: data.totalResults,
                    term: this.state.in,
                });
                console.log(this.state);
            }
        });
    };
    changePage = (change) => {
        if (this.state.term) {
            let { page, total } = this.state;
            if (page + change > 0 && page + change <= Math.ceil(total / 10)) {
                OMDB.get(``, {
                    params: { s: this.state.term, type: 'movie', page: page + change },
                }).then(({ data }) => {
                    console.log(data);
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
                            <i class="arrow circle left icon" style={{ margin: '0 8px' }} />
                            Previous
                        </div>
                        <div className="adno-divider__page">Page {this.state.page}</div>
                        <div
                            className="adno-divider__next"
                            role="button"
                            onClick={() => this.changePage(1)}
                        >
                            Next
                            <i class="arrow circle right icon" style={{ margin: '0 8px' }} />
                        </div>
                    </div>
                    <NominationsContext.Consumer>
                        {({ addNomination }) => (
                            <div className="movie-con">
                                {this.state.result.map((d) => (
                                    <Movie
                                        data={d}
                                        onButton={() => addNomination(d)}
                                        buttonText="Add Nomination"
                                    />
                                ))}
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
                        class="ui icon input"
                        style={{ width: '100%' }}
                        value={this.state.in}
                        onChange={(e) => this.setState({ in: e.target.value })}
                    >
                        <input
                            type="text"
                            placeholder="Search Movies..."
                            onKeyDown={(e) => (e.key === 'Enter' ? this.onSubmit() : '')}
                        />
                        <i class="circular search link icon" onClick={this.onSubmit} />
                    </div>
                </div>
                {this.renderResults()}
            </div>
        );
    }
}