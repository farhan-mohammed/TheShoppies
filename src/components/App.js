import React, { Component } from 'react';

export default class App extends Component {
	render() {
		return (
			<div>
				<h1>To do</h1>
				<ul>
					<li>user Authentication</li>
					<li>Image Search properites/Text</li>
					<li>CRUD Application</li>
					<li>Buy Sell</li>
				</ul>
				<h1>Order of Priorty</h1>
				<ol>
					<li>System Architecture</li>
					<li>Backend routes</li>
					<li>Database Setup</li>
					<li>User Authentication</li>
					<li>UI/UX</li>
				</ol>
				<h3>Tasks that require small bursts of effort</h3>
				<ol>
					<li>Look into Google OAuth</li>
					<li>Look into Github OAuth</li>
					<li>Look into Facebook OAuth</li>
					<li>React-Router-Dom, Redux Setup</li>
				</ol>

				<h3>Completed</h3>
				<ol>
					<li>React and Express Setup</li>
				</ol>
			</div>
		);
	}
}
