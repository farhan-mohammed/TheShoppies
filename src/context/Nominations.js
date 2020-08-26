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
            cookies.set('FarhanShoppiesData', out);
            window.location.replace(window.location.origin);
            return out;
        };

        var parsed = queryString.parse(window.location.search);

        if (parsed.data) {
            try {
                loadMovies(JSON.parse(`[${parsed.data.replace(/MM/g, ',').replace(/NN/g, '"')}]`));
            } catch {
                alert('Data parameter cannot be parsed.');
            }
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
                        for (let { imdbID } of this.state.nom) {
                            if (d.imdbID === imdbID) return;
                        }
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
