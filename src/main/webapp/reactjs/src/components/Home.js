import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
    faUsers,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faSearch,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import './../assets/css/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,

            cars: [],
            search: '',
            currentPage: 1,
            carsPerPage: 6,
        };
    }
    componentDidMount = () => {

        this.findAllCars(this.state.currentPage);
    };
    findAllCars(currentPage) {
        console.log(this.state.id);
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
    render() {
        const { currentPage, totalPages, search } = this.state;

        return (
            <Container>
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
                <main class='main-area'>
                    <div class='centered'>
                        <section class='cards'>
                            {this.state.cars.map((car) => (
                                <article class='card' key={car.id}>
                                    <Link to={`/transition/${this.state.id}/${car.id}`} >
                                        <figure class='thumbnail'>
                                       
                       
                   
                                        <img
                                                  class='home-image'
                                                src={`data:image/*;base64,${car.image}`}
                                                alt=''
                                            />
                                            
                                        </figure>
                                        <div class='card-content'>
                                            <h2>{car.brand}  {car.model}</h2>
                                            <h2 class="h1 font-weight-bold">${car.price}<span class="text-small font-weight-normal ml-2">/ day</span></h2>
                                        </div>
                                        </Link>
                                </article>
                            ))}
                        </section>
                    </div>
                </main>
                </Card.Body>
                <Card.Footer>
                        <div style={{ float: 'left' }}>
                            Страница {currentPage} от {totalPages}
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
            </Container>
        );
    }
}

export default Home;
