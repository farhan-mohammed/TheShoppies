import React, { Component } from 'react';

export default class Movie extends Component {
	render() {
		const { Title, Year, imdbID, Poster } = this.props.data;
		const { movieStyle } = this.props;
		return (
			<div className="movie" style={movieStyle} key={imdbID}>
				<div className="movie-poster">
					<img src={Poster} alt={Title} />
				</div>
				<div className="movie-data">
					<div className="movie-data__name">{Title}</div>
					<div className="movie-data__year">{Year}</div>
				</div>
			</div>
		);
	}
}
