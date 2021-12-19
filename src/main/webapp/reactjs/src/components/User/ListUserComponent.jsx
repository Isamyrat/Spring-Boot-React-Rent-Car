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
class ListUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            search: '',
            currentPage: 1,
            usersPerPage: 5,
        };
    }
    componentDidMount = () => {
        this.findAllUsers(this.state.currentPage);
    };
    findAllUsers(currentPage) {
        currentPage -= 1;
        axios
            .get(
                'http://localhost:8081/rest/user/getAll?pageNumber=' +
                    currentPage +
                    '&pageSize=' +
                    this.state.usersPerPage
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    users: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
                this.props.history.push('/home');
            });
    }
    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllUsers(firstPage);
        }
    };
    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.usersPerPage
        );
        if (this.state.currentPage < condition) {
            this.findAllUsers(condition);
        }
    };
    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.findAllUsers(this.state.currentPage - prevPage);
        }
    };
    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.usersPerPage)
        ) {
            this.findAllUsers(this.state.currentPage + 1);
        }
    };
    changePage = (event) => {
        let targetPage = parseInt(event.target.value);
        if (this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllUsers(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage,
        });
    };
    searchData = (currentPage) => {
        currentPage -= 1;
        axios
            .get(
                'http://localhost:8081/rest/user/search/' +
                    this.state.search +
                    '?page=' +
                    currentPage +
                    '&size=' +
                    this.state.usersPerPage
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    users: data.content,
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
        this.findAllUsers(this.state.currentPage);
    };
    cancel = () => {
        this.props.history.push('/home');
    };
    viewUser(idUser) {
        this.props.history.push(`/user-profile-page/${idUser}`);
    }
    render() {
        const { currentPage, totalPages, search } = this.state;
        return (
            <div>
                <Card className={'border border-dark bg-dark text-white'}>
                    <Card.Header>
                        <div style={{ float: 'left' }}>
                            <FontAwesomeIcon icon={faUsers} />
                            Список пользователей
                        </div>
                        <div style={{ float: 'right' }}>
                            <InputGroup size='sm'>
                                <FormControl
                                    placeholder='Поиск'
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
                                    <td>Имя:</td>
                                    <td>Фамилие:</td>
                                    <td>Почта:</td>

                                    <td>Действие:</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.surname}</td>
                                        <td>{user.email}</td>

                                        <td>
                                            <button
                                                style={{ marginLeft: '10px' }}
                                                onClick={() =>
                                                    this.viewUser(user.id)
                                                }
                                                className='btn btn-info'
                                            >
                                                {' '}
                                                Просмотреть пользователя
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
export default ListUserComponent;
