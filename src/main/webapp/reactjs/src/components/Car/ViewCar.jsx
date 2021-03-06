import React, { Component } from 'react';
import CarService from '../../services/car/CarService';
import CarInformationService from '../../services/car/CarInformationService';
import RatingService from '../../services/rating/RatingService';
import axios from 'axios';
import BeautyStars from 'beauty-stars';
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

class ViewCar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carId: this.props.match.params.carId,
            idUser: this.props.match.params.idUser,
            role: this.props.match.params.role,
            ratingId: this.props.match.params.ratingId,
            idRental: this.props.match.params.idRental,
            car: {},
            carInformation: {},
            ratings: [],
            rentals: [],
            currentPage: 1,
            pagePerPage: 5,
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
                    'http://localhost:8081/rest/rental/getAllRentalByCar?id=' +
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
    cancel() {
        if (
            this.state.idRental === undefined &&
            this.state.ratingId === undefined
        ) {
            this.props.history.push('/cars');
        } else if (
            this.state.idRental === undefined &&
            this.state.ratingId !== undefined
        ) {
            this.props.history.push(
                `/ratings/${this.state.idUser}/${this.state.role}`
            );
        } else if (
            this.state.ratingId === undefined &&
            this.state.idRental !== undefined
        ) {
            this.props.history.push(
                `/rentals/${this.state.idUser}/${this.state.role}`
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
                                                <div className='mt-3'>
                                                    {this.state.car.id ? (
                                                        <button
                                                            className='btn btn-primary push-right'
                                                            onClick={() =>
                                                                this.addCarImage(
                                                                    this.state
                                                                        .car.id
                                                                )
                                                            }
                                                            style={{
                                                                marginLeft:
                                                                    '10px',
                                                            }}
                                                        >
                                                            {this.state.car
                                                                .image
                                                                ? '????????????????'
                                                                : '????????????????'}
                                                        </button>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
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
                                                        ?????????? ????????????????????:
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
                                                        ???????????? ???????????????????? :
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
                                                        ?????? ????????????????????:
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
                                                        ?????????? ????????????????????:
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
                                                        ???????????????????? ???????????????????? :
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
                                                        ???????? ???????????????????? :
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
                                                        ???????????????????? ????????????
                                                        ???????????????????? :
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
                                                        ???????????????????? ????????????????????:
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
                                                        ?????????????????????? ????????????????????:
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
                                                ??????????
                                            </button>
                                            <button
                                                onClick={() =>
                                                    this.editCar(
                                                        this.state.car.id
                                                    )
                                                }
                                                className='btn btn-info'
                                            >
                                                ????????????????
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
                                                defaultActiveKey='????????????????????????????????????'
                                                id='controlled-tab-example'
                                            >
                                                <Tab
                                                    eventKey='????????????????????????????????????'
                                                    title='???????????????????????? ????????????'
                                                >
                                                    <div className='row'>
                                                        <div className='col-sm-3'>
                                                            <br />
                                                            <h6 className='mb-0'>
                                                                ???????? ????????????????????
                                                                :
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
                                                                ????????????
                                                                ????????????????????:
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
                                                                ??????????????????
                                                                ???????????????????? :
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
                                                                ?????? ????????????????????:
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
                                                    <hr />

                                                    <div className='row'>
                                                        <div className='col-sm-12'>
                                                            <button
                                                                onClick={() => {
                                                                    this.state
                                                                        .carInformation
                                                                        .id
                                                                        ? this.editCarInformation(
                                                                              this
                                                                                  .state
                                                                                  .carInformation
                                                                                  .id
                                                                          )
                                                                        : this.createCarInformation(
                                                                              this
                                                                                  .state
                                                                                  .car
                                                                                  .id
                                                                          );
                                                                }}
                                                                className='btn btn-info'
                                                            >
                                                                {this.state
                                                                    .carInformation
                                                                    .id
                                                                    ? '????????????????'
                                                                    : '????????????????'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Tab>

                                                <Tab
                                                    eventKey='??????????????'
                                                    title='??????????????'
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
                                                                            ??????????????
                                                                            ????????????:
                                                                        </th>
                                                                        <th>
                                                                            ??????????:
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

                                                                                <td>
                                                                                    <button
                                                                                        style={{
                                                                                            marginLeft:
                                                                                                '10px',
                                                                                        }}
                                                                                        onClick={() =>
                                                                                            this.ratingDelete(
                                                                                                rating.id
                                                                                            )
                                                                                        }
                                                                                        className='btn btn-info'
                                                                                    >
                                                                                        {' '}
                                                                                        delete
                                                                                    </button>
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
                                                                ????????????????{' '}
                                                                {currentPage} ????{' '}
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
                                                                            ????????????
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
                                                                            ????????
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
                                                                            ????????
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
                                                                            ??????????????????
                                                                        </Button>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                            </div>
                                                        </Card.Footer>
                                                    </Card>
                                                </Tab>

                                                <Tab
                                                    eventKey='????????????'
                                                    title='????????????'
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
                                                                            ????????:
                                                                        </th>
                                                                        <th>
                                                                            ????????
                                                                            ????????????:
                                                                        </th>
                                                                        <th>
                                                                            ????????????????????
                                                                            ????????:
                                                                        </th>
                                                                        <th>
                                                                            ????????????
                                                                            ????????????:
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
                                                                ????????????????{' '}
                                                                {currentPage} ????{' '}
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
                                                                            ????????????
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
                                                                            ????????
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
                                                                            ????????
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
                                                                            ??????????????????
                                                                        </Button>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                            </div>
                                                        </Card.Footer>
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

export default ViewCar;
