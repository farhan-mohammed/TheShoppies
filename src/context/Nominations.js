import React, { createContext } from 'react';
const Context = createContext([]);

export class PointsStore extends React.Component {
	state = { points: [] };
	componentDidMount() {
		// check for cookies and alert user!
	}
	render() {
		return <Context.Provider value={{ ...this.state }}>{this.props.children}</Context.Provider>;
	}
}
export default Context;
