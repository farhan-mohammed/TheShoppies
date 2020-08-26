import React, { Component } from 'react';
import ListOfNominations from './body/ListOfNominations';
import AddNominations from './body/AddNominations';
export default class Body extends Component {
	render() {
		return (
			<main className="main">
				<ListOfNominations />
				<AddNominations />
			</main>
		);
	}
}
