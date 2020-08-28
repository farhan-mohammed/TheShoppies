import React, { createContext } from 'react';
import Cookies from 'universal-cookie';
import OMDb from '../apis/OMDb';

// Library that makes saving cookies easier
const cookies = new Cookies();
// Library that makes parsing query parameters easier
const queryString = require('query-string');

// High level state for nominations
let initialData = cookies.get('FarhanShoppiesData') || [];
const Context = createContext({ nom: initialData });

export class NominationsStore extends React.Component {
    state = { nom: initialData };
    componentDidMount() {
        // Stores movies based on list of imbdIDs
        let loadMovies = async (list) => {
            let out = [];
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

        // Stores query parameter
        var parsed = queryString.parse(window.location.search);

        // if we have a parameter
        if (parsed.data) {
            // Try parsing it, if its not in the right format, throws an error
            try {
                loadMovies(JSON.parse(`[${parsed.data.replace(/MM/g, ',').replace(/NN/g, '"')}]`));
            } catch {
                alert('Data parameter cannot be parsed.');
                window.location.replace(window.location.origin);
            }
        }
    }

    render() {
        return (
            // nom, removeNomination, addNomination are 3 parameters that are available every consumer of this context
            <Context.Provider
                value={{
                    ...this.state,
                    removeNomination: (id) => {
                        // filter function remove the item
                        // updates the cookies as well
                        this.setState(
                            { nom: this.state.nom.filter(({ imdbID }) => imdbID !== id) },
                            () => cookies.set('FarhanShoppiesData', this.state.nom)
                        );
                    },
                    addNomination: (d) => {
                        for (let { imdbID } of this.state.nom) {
                            // checking for duplicates
                            if (d.imdbID === imdbID) return;
                        }
                        // updates the cookies as well
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
