import React, { Component } from 'react';
import RatingService from '../../services/rating/RatingService';
import BeautyStars from 'beauty-stars';

class CreateUpdateRatingComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ratingId: this.props.match.params.ratingId,
            ratingText: '',
            ratingNumber: 0,
            role: this.props.match.params.role,
            idUser: this.props.match.params.idUser,
        };
    }
    componentDidMount = () => {
        setTimeout(() => {
            if (this.state.ratingId) {
                this.findRatingById(this.state.ratingId);
            }
        }, 300);
    };
    findRatingById = (ratingId) => {
        setTimeout(() => {
            RatingService.getRatingById(ratingId).then((res) => {
                let rating = res.data;
                if (rating != null) {
                    this.setState({
                        ratingNumber: rating.ratingNumber,
                        ratingText: rating.ratingText,
                    });
                }
            });
        }, 1000);
    };
    ratingChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    cancel() {
        this.props.history.push(
            `/ratings/${this.state.idUser}/${this.state.role}`
        );
    }
    updateRating = (e) => {
        e.preventDefault();
        let rating = {
            id: this.state.ratingId,
            ratingNumber: this.state.ratingNumber,
            ratingText: this.state.ratingText,
        };
        console.log('rental => ' + JSON.stringify(rating));

        RatingService.updateRating(rating).then((res) => {
            this.props.history.push(
                `/ratings/${this.state.idUser}/${this.state.role}`
            );
        });
    };
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Изменение рейтинга</h3>
                            <div className='card-body'>
                                <form onSubmit={this.updateRating}>
                                    <div className='form-group'>
                                        <BeautyStars
                                            value={this.state.ratingNumber}
                                            onChange={(ratingNumber) =>
                                                this.setState({ ratingNumber })
                                            }
                                        />
                                    </div>
                                    <hr />
                                    <div className='form-group comment-area'>
                                        <textarea
                                            classMame='form-control'
                                            name='ratingText'
                                            placeholder='Ваш отзыв?'
                                            value={this.state.ratingText}
                                            onChange={this.ratingChange}
                                            rows='4'
                                        ></textarea>{' '}
                                    </div>

                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={this.updateRating}
                                    >
                                        Сохранить
                                    </button>
                                    <button
                                        className='btn btn-danger'
                                        onClick={this.cancel.bind(this)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Назад
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUpdateRatingComponent;
