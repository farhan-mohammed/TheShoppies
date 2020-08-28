import React, { Component } from 'react';
// Movie compoenent, renders a movie row based on the props
export default class Movie extends Component {
    render() {
        const { Title, Year, Poster } = this.props.data;
        const { buttonText, onButton, icon } = this.props;
        return (
            <div className="item movie">
                <img
                    class="ui  image"
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
                    <div className="cpy cpy-mov" text={buttonText} onClick={onButton}>
                        <i class={icon}></i>
                    </div>
                </div>
            </div>
        );
    }
}
