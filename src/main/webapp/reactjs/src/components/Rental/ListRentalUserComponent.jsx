import React, { Component } from 'react';
import axios from 'axios';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './../../assets/css/Style.css';
import RentalService from '../../services/rental/RentalService';
import {
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';

class ListRentalComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rentals: [],
            rentalsOnWait: [],
            rentalsOnBooking: [],
            currentPage: 1,
            rentalsPerPage: 5,
            idUser: this.props.match.params.idUser,
            role: this.props.match.params.role,
        };
    }
    componentDidMount = () => {
        this.findAllRentals(this.state.currentPage);
    };
    findAllRentals(currentPage) {
        setTimeout(() => {
            currentPage -= 1;

            axios
                .get(
                    'http://localhost:8081/rest/rental/getAllRentals?pageNumber=' +
                        currentPage +
                        '&pageSize=' +
                        this.state.rentalsPerPage
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
            axios
                .get(
                    'http://localhost:8081/rest/rental/getAllRentalOnWait?pageNumber=' +
                        currentPage +
                        '&pageSize=' +
                        this.state.rentalsPerPage
                )
                .then((response) => response.data)
                .then((data) => {
                    this.setState({
                        rentalsOnWait: data.content,
                        totalPages: data.totalPages,
                        totalElements: data.totalElements,
                        currentPage: data.number + 1,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            axios
                .get(
                    'http://localhost:8081/rest/rental/getAllRentalOnBooking?pageNumber=' +
                        currentPage +
                        '&pageSize=' +
                        this.state.rentalsPerPage
                )
                .then((response) => response.data)
                .then((data) => {
                    this.setState({
                        rentalsOnBooking: data.content,
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
    watchCar = (idRental) => {
        setTimeout(() => {
            this.props.history.push(
                `/car-page/${idRental}/${this.state.idUser}/${this.state.role}`
            );
        }, 1000);
    };
    cancelRental = (id) => {
        console.log('rental => ' + JSON.stringify(id));
        RentalService.updateRentalCancellation(id).then((res) => {
            this.props.history.push('/');
        });
    };
    acceptRental = (id) => {
        RentalService.updateRentalAccept(id).then((res) => {
            this.props.history.push('/');
        });
    };
    viewUser(idRental) {
        this.props.history.push(
            `/admin-user-profile-page/${idRental}/${this.state.idUser}/${this.state.role}`
        );
    }
    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllRentals(firstPage);
        }
    };
    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.rentalsPerPage
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
            Math.ceil(this.state.totalElements / this.state.rentalsPerPage)
        ) {
            this.findAllRentals(this.state.currentPage + 1);
        }
    };
    render() {
        const { currentPage, totalPages } = this.state;
        return (
            <div>
                <Container className='card mb-3 border-dark bg-dark'>
                    <div className='card-body border-dark bg-dark'>
                        <Row>
                            <Col>
                                <Tabs
                                    className={
                                        'border border-dark bg-dark text-white'
                                    }
                                    defaultActiveKey='АрендыВОжидании'
                                    id='controlled-tab-example'
                                >
                                    <Tab
                                        eventKey='АрендыВОжидании'
                                        title='Аренды В Ожидании'
                                    >
                                        <Card
                                            className={
                                                'border border-dark bg-dark text-white'
                                            }
                                        >
                                            <Card.Header>
                                                <div style={{ float: 'left' }}>
                                                    <FontAwesomeIcon
                                                        icon={faUsers}
                                                    />
                                                    Список аред
                                                </div>
                                            </Card.Header>

                                            <Card.Body>
                                                <Table
                                                    bordered
                                                    hover
                                                    striped
                                                    variant='dark'
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>Цена:</th>
                                                            <th>
                                                                Дата начало:
                                                            </th>
                                                            <th>
                                                                Количество дней:
                                                            </th>
                                                            <th>
                                                                Статус аренды:
                                                            </th>
                                                            <th>Одобрить:</th>
                                                            <th>Отклонить:</th>
                                                            <th>
                                                                Просмотреть
                                                                пользователя:
                                                            </th>
                                                            <th>
                                                                Просмотреть
                                                                автомобиль:
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {this.state.rentalsOnWait.map(
                                                            (rental) => (
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
                                                                    <td>
                                                                        <button
                                                                            onClick={() =>
                                                                                this.acceptRental(
                                                                                    rental.id
                                                                                )
                                                                            }
                                                                            className='btn btn-info'
                                                                        >
                                                                            Одобрить
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            onClick={() =>
                                                                                this.cancelRental(
                                                                                    rental.id
                                                                                )
                                                                            }
                                                                            className='btn btn-danger'
                                                                        >
                                                                            Отказать
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            style={{
                                                                                marginLeft:
                                                                                    '10px',
                                                                            }}
                                                                            onClick={() =>
                                                                                this.viewUser(
                                                                                    rental.id
                                                                                )
                                                                            }
                                                                            className='btn btn-light'
                                                                        >
                                                                            {' '}
                                                                            Просмотр
                                                                            пользователя
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            onClick={() =>
                                                                                this.watchCar(
                                                                                    rental.id
                                                                                )
                                                                            }
                                                                            className='btn btn-light'
                                                                        >
                                                                            Просмотр
                                                                            автомобиля
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                            <Card.Footer>
                                                <div style={{ float: 'left' }}>
                                                    Страница {currentPage} от{' '}
                                                    {totalPages}
                                                </div>
                                                <div style={{ float: 'right' }}>
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
                                                            value={currentPage}
                                                            onChange={
                                                                this.changePage
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
                                        eventKey='ЗаказВАренде'
                                        title='Заказ В Аренде'
                                    >
                                        <Card
                                            className={
                                                'border border-dark bg-dark text-white'
                                            }
                                        >
                                            <Card.Header>
                                                <div style={{ float: 'left' }}>
                                                    <FontAwesomeIcon
                                                        icon={faUsers}
                                                    />
                                                    Список аренл
                                                </div>
                                            </Card.Header>

                                            <Card.Body>
                                                <Table
                                                    bordered
                                                    hover
                                                    striped
                                                    variant='dark'
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>Цена:</th>
                                                            <th>
                                                                Дата начало:
                                                            </th>
                                                            <th>
                                                                Количество дней:
                                                            </th>
                                                            <th>
                                                                Статус аренды:
                                                            </th>
                                                            <th>Отменить:</th>
                                                            <th>
                                                                Просмотреть
                                                                пользователя:
                                                            </th>
                                                            <th>
                                                                Просмотреть
                                                                автомобиль:
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {this.state.rentalsOnBooking.map(
                                                            (rental) => (
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
                                                                    <td>
                                                                        <button
                                                                            onClick={() =>
                                                                                this.cancelRental(
                                                                                    rental.id
                                                                                )
                                                                            }
                                                                            className='btn btn-danger'
                                                                        >
                                                                            Отменить
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            onClick={() =>
                                                                                this.watchCar(
                                                                                    rental.id
                                                                                )
                                                                            }
                                                                            className='btn btn-light'
                                                                        >
                                                                            Просмотр
                                                                            автомобиля
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            style={{
                                                                                marginLeft:
                                                                                    '10px',
                                                                            }}
                                                                            onClick={() =>
                                                                                this.viewUser(
                                                                                    rental.id
                                                                                )
                                                                            }
                                                                            className='btn btn-light'
                                                                        >
                                                                            {' '}
                                                                            Просмотр
                                                                            пользователя
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                            <Card.Footer>
                                                <div style={{ float: 'left' }}>
                                                    Страницаe {currentPage} от{' '}
                                                    {totalPages}
                                                </div>
                                                <div style={{ float: 'right' }}>
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
                                                            value={currentPage}
                                                            onChange={
                                                                this.changePage
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
                                        eventKey='AllRentals'
                                        title='All Rentals'
                                    >
                                        <Card
                                            className={
                                                'border border-dark bg-dark text-white'
                                            }
                                        >
                                            <Card.Header>
                                                <div style={{ float: 'left' }}>
                                                    <FontAwesomeIcon
                                                        icon={faUsers}
                                                    />
                                                    Список аред
                                                </div>
                                            </Card.Header>

                                            <Card.Body>
                                                <Table
                                                    bordered
                                                    hover
                                                    striped
                                                    variant='dark'
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>Цена:</th>
                                                            <th>
                                                                Дата начало:
                                                            </th>
                                                            <th>
                                                                Количество дней:
                                                            </th>
                                                            <th>
                                                                Статус аренды:
                                                            </th>
                                                            <th>
                                                                Просмотреть
                                                                пользователя:
                                                            </th>
                                                            <th>
                                                                Просмотреть
                                                                автомобиль:
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {this.state.rentals.map(
                                                            (rental) => (
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
                                                                    <td>
                                                                        <button
                                                                            style={{
                                                                                marginLeft:
                                                                                    '10px',
                                                                            }}
                                                                            onClick={() =>
                                                                                this.viewUser(
                                                                                    rental.id
                                                                                )
                                                                            }
                                                                            className='btn btn-light'
                                                                        >
                                                                            {' '}
                                                                            Просмотр
                                                                            пользователя
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            onClick={() =>
                                                                                this.watchCar(
                                                                                    rental.id
                                                                                )
                                                                            }
                                                                            className='btn btn-light'
                                                                        >
                                                                            Просмотр
                                                                            автомобиля
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                            <Card.Footer>
                                                <div style={{ float: 'left' }}>
                                                    Страница{currentPage} от{' '}
                                                    {totalPages}
                                                </div>
                                                <div style={{ float: 'right' }}>
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
                                                            value={currentPage}
                                                            onChange={
                                                                this.changePage
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
                                </Tabs>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
}
export default ListRentalComponent;
