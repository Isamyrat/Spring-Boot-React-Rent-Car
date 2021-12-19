import React, { Component } from 'react';
import axios from 'axios';
import {
    faUsers,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faSearch,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Card, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './../../assets/css/Style.css';

class ListCarUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idUser: this.props.match.params.idUser,
            cars: [],
            search: '',
            currentPage: 1,
            carsPerPage: 5,
        };
    }

    componentDidMount = () => {
        this.findAllCars(this.state.currentPage);
    };
    findAllCars(currentPage) {
        currentPage -= 1;
        axios
            .get(
                'http://localhost:8081/rest/car/getAllCars?pageNumber=' +
                    currentPage +
                    '&pageSize=' +
                    this.state.carsPerPage
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    cars: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllCars(firstPage);
        }
    };
    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.carsPerPage
        );
        if (this.state.currentPage < condition) {
            this.findAllCars(condition);
        }
    };
    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.findAllCars(this.state.currentPage - prevPage);
        }
    };
    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.carsPerPage)
        ) {
            this.findAllCars(this.state.currentPage + 1);
        }
    };
    changePage = (event) => {
        let targetPage = parseInt(event.target.value);
        if (this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllCars(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage,
        });
    };
    searchData = (currentPage) => {
        currentPage -= 1;
        axios
            .get(
                'http://localhost:8081/rest/car/search/' +
                    this.state.search +
                    '?page=' +
                    currentPage +
                    '&size=' +
                    this.state.carsPerPage
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    cars: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    };
    searchChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    cancelSearch = () => {
        this.setState({ search: '' });
        this.findAllCars(this.state.currentPage);
    };
    cancel = () => {
        this.props.history.push('/home');
    };
    viewCar(carId) {
        this.props.history.push(`/car-page-user/${carId}/${this.state.idUser}`);
    }

    render() {
        const { currentPage, totalPages, search } = this.state;
        return (
            <div>
                <Card className={'border border-dark bg-dark text-white car'}>
                    <Card.Header>
                        <div style={{ float: 'left' }}>
                            <FontAwesomeIcon icon={faUsers} />
                            Список машин
                        </div>
                        <div style={{ float: 'right' }}>
                            <InputGroup size='sm'>
                                <FormControl
                                    placeholder='Поиск автомомбиля'
                                    name='search'
                                    value={search}
                                    className={'info-border bg-dark text-white'}
                                    onChange={this.searchChange}
                                />
                                <InputGroup.Append>
                                    <Button
                                        size='sm'
                                        variant='outline-info'
                                        type='button'
                                        onClick={this.searchData}
                                    >
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                    <Button
                                        size='sm'
                                        variant='outline-danger'
                                        type='button'
                                        onClick={this.cancelSearch}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant='dark'>
                            <thead>
                                <tr>
                                    <th>Фотография автомобиля:</th>
                                    <th>Брэнд автомобиля:</th>
                                    <th>Модель автомобиля :</th>
                                    <th>Тип автомобиля:</th>
                                    <th>Класс автомобиля:</th>
                                    <th>Количество атомобилей :</th>
                                    <th>Цена автомобиля :</th>
                                    <th> Количество дверей автомобиля :</th>
                                    <th>Количество пассажиров:</th>
                                    <th>Трансмиссия автомобиля:</th>
                                    <td>Действия</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cars.map((car) => (
                                    <tr key={car.id}>
                                        <td>
                                            {' '}
                                            <img
                                                className='img-thumbnail'
                                                src={`data:image/*;base64,${car.image}`}
                                                alt=''
                                            />
                                        </td>
                                        <td>{car.brand}</td>
                                        <td>{car.model}</td>
                                        <td>{car.type}</td>
                                        <td>{car.classOfCar}</td>
                                        <td>{car.count}</td>
                                        <td>{car.price}</td>
                                        <td>{car.doors}</td>
                                        <td>{car.passengers}</td>
                                        <td>{car.transmission}</td>
                                        <td>
                                            <button
                                                style={{ marginLeft: '10px' }}
                                                onClick={() =>
                                                    this.viewCar(car.id)
                                                }
                                                className='btn btn-info'
                                            >
                                                {' '}
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
                            Страница {currentPage} of {totalPages}
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
export default ListCarUserComponent;
