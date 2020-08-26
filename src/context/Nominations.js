import React, { createContext } from 'react';
import Cookies from 'universal-cookie';
import OMDb from '../apis/OMDb';

const cookies = new Cookies();
const queryString = require('query-string');
let initialData = cookies.get('FarhanShoppiesData') || [];
const Context = createContext({ nom: initialData });

export class NominationsStore extends React.Component {
    state = { nom: initialData };
    componentDidMount() {
        let loadMovies = async (list) => {
            let out = [];
            console.log(list);
            for (let l of list) {
                let {
                    data: { Title, Year, Poster, imdbID, Type },
                } = await OMDb.get('', { params: { i: l } });
                out.push({ Title, Year, Poster, imdbID, Type });
            }
            this.setState({ nom: out });
            return out;
        };
        var parsed = queryString.parse(window.location.search);
        if (parsed.data) {
            loadMovies(JSON.parse(parsed.data));
        }
    }
    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,
                    removeNomination: (id) => {
                        this.setState(
                            { nom: this.state.nom.filter(({ imdbID }) => imdbID !== id) },
                            () => cookies.set('FarhanShoppiesData', this.state.nom)
                        );
                    },
                    addNomination: (d) => {
                        this.setState({ nom: [...this.state.nom, d] }, () =>
                            cookies.set('FarhanShoppiesData', this.state.nom)
                        );
                    },
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}
export default Context;
