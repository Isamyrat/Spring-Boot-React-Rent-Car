import React, { Component } from 'react';
import CarService from '../../services/car/CarService';
import CarInformationService from '../../services/car/CarInformationService';
import RatingService from '../../services/rating/RatingService';
import axios from 'axios';
import BeautyStars from 'beauty-stars';
import RentalService from '../../services/rental/RentalService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
} from '@fortawesome/free-solid-svg-icons';
import {
    Card,
    Table,
    InputGroup,
    FormControl,
    Button,
    Tabs,
    Tab,
    Row,
    Col,
    Container,
} from 'react-bootstrap';

class ViewUserCar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carId: this.props.match.params.carId,
            idUser: this.props.match.params.idUser,
            idRental: this.props.match.params.idRental,
            ratingId: this.props.match.params.ratingId,
            role: this.props.match.params.role,
            car: {},
            carInformation: {},
            ratings: [],
            rentals: [],
            currentPage: 1,
            pagePerPage: 5,
            ratingText: '',
            ratingNumber: 0,
            startDate: '',
            countOfDays: 0,
        };
    }
    componentDidMount() {
        setTimeout(() => {
            if (
                this.state.idRental === undefined &&
                this.state.ratingId === undefined
            ) {
                CarService.getCarById(this.state.carId).then((res) => {
                    this.setState({ car: res.data });
                });
            } else if (this.state.ratingId !== undefined) {
                CarService.getCarByRatingId(this.state.ratingId).then((res) => {
                    this.setState({ car: res.data });
                });
            } else if (this.state.idRental !== undefined) {
                CarService.getCarByRentalId(this.state.idRental).then((res) => {
                    this.setState({ car: res.data });
                });
            }

            this.getCarInformation();
            this.findAllRating(this.state.currentPage);
            this.findAllRentals(this.state.currentPage);
        }, 1000);
    }

    getCarInformation() {
        setTimeout(() => {
            CarInformationService.getCarInformationByCarId(
                this.state.car.id
            ).then((res) => {
                this.setState({ carInformation: res.data });
            });
        }, 1000);
    }
    findAllRentals(currentPage) {
        setTimeout(() => {
            currentPage -= 1;

            console.log(this.state.carId);

            axios
                .get(
                    'http://localhost:8081/rest/rental/getAllRentalByCarAndByUser?idUser=' +
                        this.state.idUser +
                        '&carId=' +
                        this.state.car.id +
                        '&pageNumber=' +
                        currentPage +
                        '&pageSize=' +
                        this.state.pagePerPage
                )
                .then((response) => response.data)
                .then((data) => {
                    this.setState({
                        rentals: data.content,
                        totalPages: data.totalPages,
                        totalElements: data.totalElements,
                        currentPage: data.number + 1,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1000);
    }
    findAllRating(currentPage) {
        setTimeout(() => {
            currentPage -= 1;

            console.log(this.state.carId);

            axios
                .get(
                    'http://localhost:8081/rest/ratings/getAllRatingByCar?id=' +
                        this.state.car.id +
                        '&pageNumber=' +
                        currentPage +
                        '&pageSize=' +
                        this.state.pagePerPage
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
        }, 1000);
    }
    editCar = (carId) => {
        setTimeout(() => {
            this.props.history.push(`/update-car/${carId}`);
        }, 1000);
    };
    ratingDelete = (ratingId) => {
        setTimeout(() => {
            RatingService.deleteRating(ratingId).then((res) => {
                this.setState({
                    ratings: this.state.ratings.filter(
                        (rating) => rating.id !== ratingId
                    ),
                });
            });
        }, 1000);
    };

    createCarInformation(carId) {
        this.props.history.push(`/create-car-information/${carId}`);
    }
    editCarInformation = (carInformationId) => {
        setTimeout(() => {
            this.props.history.push(
                `/update-car-information/${carInformationId}/${this.state.car.id}`
            );
        }, 1000);
    };
    ratingChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    saveRating = (e) => {
        e.preventDefault();
        let rating = {
            ratingNumber: this.state.ratingNumber,
            ratingText: this.state.ratingText,
        };
        console.log('rental => ' + JSON.stringify(rating));

        RatingService.createRating(
            rating,
            this.state.idUser,
            this.state.car.id
        ).then((res) => {
            this.props.history.push(`/cars-user/${this.state.idUser}`);
        });
    };
    saveRental = (e) => {
        e.preventDefault();
        let rental = {
            startDate: this.state.startDate,
            countOfDays: this.state.countOfDays,
        };
        console.log('rental => ' + JSON.stringify(rental));

        RentalService.createRental(
            rental,
            this.state.idUser,
            this.state.car.id
        ).then((res) => {
            this.props.history.push('/');
        });
    };
    rentalChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    cancel() {
        console.log('Rentals ' + this.state.idRental);
        if (
            this.state.idRental === undefined &&
            this.state.ratingId === undefined
        ) {
            this.props.history.push('/cars');
        } else if (this.state.idRental !== undefined) {
            this.props.history.push(
                `/rentals-user/${this.state.idUser}/${this.state.role}`
            );
        } else if (this.state.ratingId !== undefined) {
            this.props.history.push(
                `/ratings/${this.state.idUser}/${this.state.role}`
            );
        }
    }
    addCarImage = (carId) => {
        setTimeout(() => {
            this.props.history.push(`/create-car-image/${carId}`);
        }, 1000);
    };
    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllRating(firstPage);
        }
    };
    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.pagePerPage
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
            Math.ceil(this.state.totalElements / this.state.pagePerPage)
        ) {
            this.findAllRating(this.state.currentPage + 1);
        }
    };
    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllRentals(firstPage);
        }
    };
    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.pagePerPage
        );
        if (this.state.currentPage < condition) {
            this.findAllRentals(condition);
        }
    };
    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.findAllRentals(this.state.currentPage - prevPage);
        }
    };
    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.pagePerPage)
        ) {
            this.findAllRentals(this.state.currentPage + 1);
        }
    };
    render() {
        const { currentPage, totalPages } = this.state;
        return (
            <div>
                <div className='container'>
                    <div className='main-body'>
                        <div>
                            <div className='row gutters-sm'>
                                <div className='col-md-4 mb-3'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='d-flex flex-column align-items-center text-center'>
                                                <img
                                                    className='img-thumbnail'
                                                    src={`data:image/*;base64,${this.state.car.image}`}
                                                    alt=''
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>

                                <div className='col-md-8'>
                                    <div className='card mb-4'>
                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Брэнд автомобиля:
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.car.brand}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Модель автомобиля :
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.car.model}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Тип автомобиля:
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.car.type}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Класс автомобиля:
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.car.classOfCar}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Количество атомобилей :
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.car.count}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Цена автомобиля :
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.car.price}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Количество дверей
                                                        автомобиля :
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.car.doors}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Количество пассажиров:
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.car.passengers}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Трансмиссия автомобиля:
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {
                                                        this.state.car
                                                            .transmission
                                                    }
                                                </div>
                                            </div>
                                            <hr />
                                            <button
                                                className='btn btn-danger'
                                                onClick={this.cancel.bind(this)}
                                                style={{
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                Назад
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Container className='card mb-3'>
                                <div className='card-body'>
                                    <Row>
                                        <Col>
                                            <Tabs
                                                defaultActiveKey='персональныеДанные'
                                                id='controlled-tab-example'
                                            >
                                                <Tab
                                                    eventKey='персональныеДанные'
                                                    title='Персональные Данные'
                                                >
                                                    <div className='row'>
                                                        <div className='col-sm-3'>
                                                            <br />
                                                            <h6 className='mb-0'>
                                                                Цвет автомобиля
                                                            </h6>
                                                        </div>
                                                        <div className='col-sm-9 text-secondary'>
                                                            <br />
                                                            {
                                                                this.state
                                                                    .carInformation
                                                                    .color
                                                            }
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className='col-sm-3'>
                                                            <h6 className='mb-0'>
                                                                Пробег
                                                                автомобиля:
                                                            </h6>
                                                        </div>
                                                        <div className='col-sm-9 text-secondary'>
                                                            {
                                                                this.state
                                                                    .carInformation
                                                                    .mileage
                                                            }
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className='col-sm-3'>
                                                            <h6 className='mb-0'>
                                                                Состояние
                                                                автомобиля :
                                                            </h6>
                                                        </div>
                                                        <div className='col-sm-9 text-secondary'>
                                                            {
                                                                this.state
                                                                    .carInformation
                                                                    .condition
                                                            }
                                                        </div>
                                                    </div>
                                                    <hr />

                                                    <div className='row'>
                                                        <div className='col-sm-3'>
                                                            <h6 className='mb-0'>
                                                                Год автомобиля:
                                                            </h6>
                                                        </div>
                                                        <div className='col-sm-9 text-secondary'>
                                                            {
                                                                this.state
                                                                    .carInformation
                                                                    .year
                                                            }
                                                        </div>
                                                    </div>
                                                </Tab>

                                                <Tab
                                                    eventKey='Рейтинг'
                                                    title='Рейтинг'
                                                >
                                                    <Card
                                                        className={
                                                            'border border-dark bg-dark text-white'
                                                        }
                                                    >
                                                        <Card.Body>
                                                            <Table
                                                                bordered
                                                                hover
                                                                striped
                                                                variant='dark'
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>
                                                                            Рейтинг
                                                                            баллов:
                                                                        </th>
                                                                        <th>
                                                                            Отзыв:
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.ratings.map(
                                                                        (
                                                                            rating
                                                                        ) => (
                                                                            <tr
                                                                                key={
                                                                                    rating.id
                                                                                }
                                                                            >
                                                                                <td>
                                                                                    <BeautyStars
                                                                                        value={
                                                                                            rating.ratingNumber
                                                                                        }
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        rating.ratingText
                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    )}
                                                                </tbody>
                                                            </Table>
                                                        </Card.Body>
                                                        <Card.Footer>
                                                            <div
                                                                style={{
                                                                    float: 'left',
                                                                }}
                                                            >
                                                                Страница{' '}
                                                                {currentPage} от{' '}
                                                                {totalPages}
                                                            </div>
                                                            <div
                                                                style={{
                                                                    float: 'right',
                                                                }}
                                                            >
                                                                <InputGroup size='sm'>
                                                                    <InputGroup.Prepend>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage ===
                                                                                1
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={
                                                                                this
                                                                                    .firstPage
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faFastBackward
                                                                                }
                                                                            />{' '}
                                                                            Первая
                                                                        </Button>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage ===
                                                                                1
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={
                                                                                this
                                                                                    .prevPage
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faStepBackward
                                                                                }
                                                                            />{' '}
                                                                            Пред
                                                                        </Button>
                                                                    </InputGroup.Prepend>
                                                                    <FormControl
                                                                        className={
                                                                            'page-num bg-dark'
                                                                        }
                                                                        name='currentPage'
                                                                        value={
                                                                            currentPage
                                                                        }
                                                                        onChange={
                                                                            this
                                                                                .changePage
                                                                        }
                                                                    />
                                                                    <InputGroup.Append>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage ===
                                                                                totalPages
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={
                                                                                this
                                                                                    .nextPage
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faStepForward
                                                                                }
                                                                            />{' '}
                                                                            След
                                                                        </Button>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage ===
                                                                                totalPages
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={
                                                                                this
                                                                                    .lastPage
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faFastForward
                                                                                }
                                                                            />{' '}
                                                                            Последняя
                                                                        </Button>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                            </div>
                                                        </Card.Footer>
                                                    </Card>
                                                </Tab>

                                                <Tab
                                                    eventKey='Аренда'
                                                    title='Аренда'
                                                >
                                                    <Card
                                                        className={
                                                            'border border-dark bg-dark text-white'
                                                        }
                                                    >
                                                        <Card.Body>
                                                            <Table
                                                                bordered
                                                                hover
                                                                striped
                                                                variant='dark'
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>
                                                                            Цена:
                                                                        </th>
                                                                        <th>
                                                                            Дата
                                                                            начала:
                                                                        </th>
                                                                        <th>
                                                                            Количество
                                                                            дней:
                                                                        </th>
                                                                        <th>
                                                                            Статус
                                                                            аренды:
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.rentals.map(
                                                                        (
                                                                            rental
                                                                        ) => (
                                                                            <tr
                                                                                key={
                                                                                    rental.id
                                                                                }
                                                                            >
                                                                                <td>
                                                                                    {
                                                                                        rental.price
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        rental.startDate
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        rental.countOfDays
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        rental.status
                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    )}
                                                                </tbody>
                                                            </Table>
                                                        </Card.Body>
                                                        <Card.Footer>
                                                            <div
                                                                style={{
                                                                    float: 'left',
                                                                }}
                                                            >
                                                                Страница{' '}
                                                                {currentPage} от{' '}
                                                                {totalPages}
                                                            </div>
                                                            <div
                                                                style={{
                                                                    float: 'right',
                                                                }}
                                                            >
                                                                <InputGroup size='sm'>
                                                                    <InputGroup.Prepend>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage ===
                                                                                1
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={
                                                                                this
                                                                                    .firstPage
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faFastBackward
                                                                                }
                                                                            />{' '}
                                                                            Первая
                                                                        </Button>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage ===
                                                                                1
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={
                                                                                this
                                                                                    .prevPage
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faStepBackward
                                                                                }
                                                                            />{' '}
                                                                            Пред
                                                                        </Button>
                                                                    </InputGroup.Prepend>
                                                                    <FormControl
                                                                        className={
                                                                            'page-num bg-dark'
                                                                        }
                                                                        name='currentPage'
                                                                        value={
                                                                            currentPage
                                                                        }
                                                                        onChange={
                                                                            this
                                                                                .changePage
                                                                        }
                                                                    />
                                                                    <InputGroup.Append>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage ===
                                                                                totalPages
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={
                                                                                this
                                                                                    .nextPage
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faStepForward
                                                                                }
                                                                            />{' '}
                                                                            След
                                                                        </Button>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage ===
                                                                                totalPages
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={
                                                                                this
                                                                                    .lastPage
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faFastForward
                                                                                }
                                                                            />{' '}
                                                                            Последняя
                                                                        </Button>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                            </div>
                                                        </Card.Footer>
                                                    </Card>
                                                </Tab>
                                                <Tab
                                                    eventKey='ПоставитьРейтинг'
                                                    title='Поставить Рейтинг'
                                                >
                                                    <Card
                                                        className={
                                                            'border border-dark bg-dark text-white'
                                                        }
                                                    >
                                                        <div className='card-body'>
                                                            <form
                                                                onSubmit={
                                                                    this
                                                                        .saveRating
                                                                }
                                                            >
                                                                <div className='form-group'>
                                                                    <BeautyStars
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .ratingNumber
                                                                        }
                                                                        onChange={(
                                                                            ratingNumber
                                                                        ) =>
                                                                            this.setState(
                                                                                {
                                                                                    ratingNumber,
                                                                                }
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <hr />
                                                                <div className='form-group comment-area'>
                                                                    <textarea
                                                                        className='form-control'
                                                                        name='ratingText'
                                                                        placeholder='what is your view?'
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .ratingText
                                                                        }
                                                                        onChange={
                                                                            this
                                                                                .ratingChange
                                                                        }
                                                                        rows='4'
                                                                    ></textarea>{' '}
                                                                </div>

                                                                <br></br>
                                                                <button
                                                                    className='btn btn-success'
                                                                    onClick={
                                                                        this
                                                                            .saveRating
                                                                    }
                                                                >
                                                                    Сохранить
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </Card>
                                                </Tab>
                                                <Tab
                                                    eventKey='Арендовать автомобиль'
                                                    title='Арендовать автомобиль'
                                                >
                                                    <Card
                                                        className={
                                                            'border border-dark bg-dark text-white'
                                                        }
                                                    >
                                                        <div className='card-body'>
                                                            <form
                                                                onSubmit={
                                                                    this
                                                                        .saveRental
                                                                }
                                                            >
                                                                <div className='form-group'>
                                                                    <label>
                                                                        Дата
                                                                        начала
                                                                        аренды:
                                                                    </label>
                                                                    <input
                                                                        placeholder='startDate:'
                                                                        name='startDate'
                                                                        type='datetime-local'
                                                                        className='form-control'
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .startDate
                                                                        }
                                                                        onChange={
                                                                            this
                                                                                .rentalChange
                                                                        }
                                                                    />
                                                                </div>

                                                                <div className='form-group'>
                                                                    <label>
                                                                        Количество
                                                                        дней
                                                                        аренды:
                                                                    </label>
                                                                    <input
                                                                        placeholder='countOfDays:'
                                                                        name='countOfDays'
                                                                        className='form-control'
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .countOfDays
                                                                        }
                                                                        onChange={
                                                                            this
                                                                                .rentalChange
                                                                        }
                                                                    />
                                                                </div>

                                                                <br></br>
                                                                <button
                                                                    className='btn btn-success'
                                                                    onClick={
                                                                        this
                                                                            .saveRental
                                                                    }
                                                                >
                                                                    Отправить
                                                                    запрос
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </Card>
                                                </Tab>
                                            </Tabs>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewUserCar;
