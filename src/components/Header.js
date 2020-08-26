import React, { Component } from 'react';
import awardImage from '../media/shoppies.png';
export default class Header extends Component {
	render() {
		return (
			<header className="header">
				<div className="header-logo">
					<img src={awardImage} alt="" /> <h1>Shoppies</h1>
				</div>
			</header>
		);
	}
}
