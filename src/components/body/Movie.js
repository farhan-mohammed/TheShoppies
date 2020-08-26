import React, { Component } from 'react';

export default class Movie extends Component {
    render() {
        const { Title, Year, imdbID, Poster } = this.props.data;
        const { movieStyle } = this.props;
        return (
            <div className="item movie" style={movieStyle} key={imdbID}>
                <img
                    class="ui  image"
                    style={{ width: '60px' }}
                    src={Poster}
                    alt={Title}
                    onError={(e) => {
                        e.target.src =
                            'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-768x1129.jpg';
                    }}
                />
                <div class="content movie-content">
                    <div className="movie-data">
                        <div className="movie-data__name">{Title}</div>
                        <div className="movie-data__year ">{Year}</div>
                    </div>
                    <div
                        className="cpy cpy-mov"
                        text={this.props.buttonText}
                        onClick={this.props.onButton}
                    >
                        <i class={this.props.icon}></i>
                        {/* {this.props.buttonText} */}
                    </div>
                </div>
            </div>
        );
    }
}
