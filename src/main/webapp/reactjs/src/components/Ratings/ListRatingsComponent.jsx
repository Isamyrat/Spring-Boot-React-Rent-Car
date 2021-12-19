import React, { Component } from 'react';
import axios from 'axios';
import BeautyStars from 'beauty-stars';
import {
    faUsers,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
} from '@fortawesome/free-solid-svg-icons';
import { Card, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ListRatingsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ratings: [],
            currentPage: 1,
            ratingsPerPage: 5,
            idUser: this.props.match.params.idUser,
            role: this.props.match.params.role,
        };
    }
    componentDidMount = () => {
        this.findAllRating(this.state.currentPage);
    };
    findAllRating(currentPage) {
        currentPage -= 1;

        if (this.state.role === 'USER') {
            axios
                .get(
                    'http://localhost:8081/rest/ratings/getAllRatingByUser?id=' +
                        this.state.idUser +
                        '&pageNumber=' +
                        currentPage +
                        '&pageSize=' +
                        this.state.ratingsPerPage
                )
                .then((response) => response.data)
                .then((data) => {
                    this.setState({
                        ratings: data.content,
                        totalPages: data.totalPages,
                        totalElements: data.totalElements,
                        currentPage: data.number + 1,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .get(
                    'http://localhost:8081/rest/ratings/getAll?pageNumber=' +
                        currentPage +
                        '&pageSize=' +
                        this.state.ratingsPerPage
                )
                .then((response) => response.data)
                .then((data) => {
                    this.setState({
                        ratings: data.content,
                        totalPages: data.totalPages,
                        totalElements: data.totalElements,
                        currentPage: data.number + 1,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    editRating = (id) => {
        setTimeout(() => {
            this.props.history.push(
                `/update-car-rating/${id}/${this.state.idUser}/${this.state.role}`
            );
        }, 1000);
    };
    watchCar = (ratingId) => {
        setTimeout(() => {
            if (this.state.role === 'USER') {
                this.props.history.push(
                    `/view-car-rating/${ratingId}/${this.state.idUser}/${this.state.role}`
                );
            } else {
                this.props.history.push(
                    `/car-page/${ratingId}/${this.state.idUser}/${this.state.role}`
                );
            }
        }, 1000);
    };
    viewUser(idRating) {
        this.props.history.push(
            `/admin-user-profile-page/${idRating}/${this.state.idUser}/${this.state.role}`
        );
    }
    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllRating(firstPage);
        }
    };
    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.ratingsPerPage
        );
        if (this.state.currentPage < condition) {
            this.findAllRating(condition);
        }
    };
    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.findAllRating(this.state.currentPage - prevPage);
        }
    };
    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.ratingsPerPage)
        ) {
            this.findAllRating(this.state.currentPage + 1);
        }
    };
    render() {
        const { currentPage, totalPages } = this.state;
        return (
            <div>
                <Card className={'border border-dark bg-dark text-white'}>
                    <Card.Header>
                        <div style={{ float: 'left' }}>
                            <FontAwesomeIcon icon={faUsers} />
                            Список рейтингов на автомобили
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant='dark'>
                            <thead>
                                <tr>
                                    <th>Рейтинг балл:</th>
                                    <th>Отзывы:</th>
                                    <th>Действие:</th>
                                    <th>Просмотреть автомобиль:</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.ratings.map((rating) => (
                                    <tr key={rating.id}>
                                        <td>
                                            <BeautyStars
                                                value={rating.ratingNumber}
                                            />
                                        </td>
                                        <td>{rating.ratingText}</td>
                                        <td>
                                            {' '}
                                            {this.state.role === 'USER' ? (
                                                <button
                                                    onClick={() =>
                                                        this.editRating(
                                                            rating.id
                                                        )
                                                    }
                                                    className='btn btn-light'
                                                >
                                                    Изменить
                                                </button>
                                            ) : (
                                                <button
                                                    style={{
                                                        marginLeft: '10px',
                                                    }}
                                                    onClick={() =>
                                                        this.viewUser(rating.id)
                                                    }
                                                    className='btn btn-light'
                                                >
                                                    {' '}
                                                    Просмотр пользователя
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    this.watchCar(rating.id)
                                                }
                                                className='btn btn-light'
                                            >
                                                Просмотр автомобиля
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <div style={{ float: 'left' }}>
                            Страница{currentPage} от {totalPages}
                        </div>
                        <div style={{ float: 'right' }}>
                            <InputGroup size='sm'>
                                <InputGroup.Prepend>
                                    <Button
                                        type='button'
                                        variant='outline-info'
                                        disabled={
                                            currentPage === 1 ? true : false
                                        }
                                        onClick={this.firstPage}
                                    >
                                        <FontAwesomeIcon
                                            icon={faFastBackward}
                                        />{' '}
                                        Первая
                                    </Button>
                                    <Button
                                        type='button'
                                        variant='outline-info'
                                        disabled={
                                            currentPage === 1 ? true : false
                                        }
                                        onClick={this.prevPage}
                                    >
                                        <FontAwesomeIcon
                                            icon={faStepBackward}
                                        />{' '}
                                        Пред
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl
                                    className={'page-num bg-dark'}
                                    name='currentPage'
                                    value={currentPage}
                                    onChange={this.changePage}
                                />
                                <InputGroup.Append>
                                    <Button
                                        type='button'
                                        variant='outline-info'
                                        disabled={
                                            currentPage === totalPages
                                                ? true
                                                : false
                                        }
                                        onClick={this.nextPage}
                                    >
                                        <FontAwesomeIcon icon={faStepForward} />{' '}
                                        След
                                    </Button>
                                    <Button
                                        type='button'
                                        variant='outline-info'
                                        disabled={
                                            currentPage === totalPages
                                                ? true
                                                : false
                                        }
                                        onClick={this.lastPage}
                                    >
                                        <FontAwesomeIcon icon={faFastForward} />{' '}
                                        Последняя
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}
export default ListRatingsComponent;
