import React, { Component } from 'react';
import UserService from '../../services/user/UserService';
import UserInformationService from '../../services/user/UserInformationService ';
import CustomersService from '../../services/customers/CustomersService';
import { Tabs, Tab, Row, Col, Container } from 'react-bootstrap';

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.idUser,
            user: {},
            userInformation: {},
            customers: {},
            idUser: this.props.match.params.idUser,
            role: this.props.match.params.role,
            idRental: this.props.match.params.idRental,
            ratingId: this.props.match.params.ratingId,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            if (
                this.state.idRental === undefined &&
                this.state.ratingId === undefined
            ) {
                UserService.getUserById(this.state.id).then((res) => {
                    this.setState({ user: res.data });
                });
            } else if (this.state.ratingId !== undefined) {
                UserService.getUserByRatingId(this.state.ratingId).then(
                    (res) => {
                        this.setState({ user: res.data });
                    }
                );
            } else if (this.state.idRental !== undefined) {
                UserService.getUserByRentalId(this.state.idRental).then(
                    (res) => {
                        this.setState({ user: res.data });
                    }
                );
            }
            this.getUserInformation();
            this.getCustomInformation();
        }, 1000);
    }
    getUserInformation() {
        setTimeout(() => {
            UserInformationService.getUserInformationByUserId(
                this.state.user.id
            ).then((res) => {
                this.setState({ userInformation: res.data });
            });
        }, 1000);
    }
    getCustomInformation() {
        setTimeout(() => {
            CustomersService.getCustomersByUserId(this.state.user.id).then(
                (res) => {
                    this.setState({ customers: res.data });
                }
            );
        }, 1000);
    }
    cancel() {
        if (
            this.state.idRental === undefined &&
            this.state.ratingId === undefined
        ) {
            this.props.history.push('/users');
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
    render() {
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
                                                    src={`data:image/*;base64,${this.state.userInformation.accountImage}`}
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
                                                        Фамилие пользователя
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.user.surname}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Имя пользователя
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.user.name}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Почта пользователя
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.user.email}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Время регистрации
                                                        пользователя
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.user.createAt}
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
                                                Назат
                                            </button>
                                        </div>
                                    </div>
                                    <Container className='card mb-3'>
                                        <div className='card-body'>
                                            <Row>
                                                <Col>
                                                    <Tabs
                                                        defaultActiveKey='данныеПользователя'
                                                        id='controlled-tab-example'
                                                    >
                                                        <Tab
                                                            eventKey='данныеПользователя'
                                                            title='Данные Пользователя'
                                                        >
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <br />
                                                                    <h6 className='mb-0'>
                                                                        Пол
                                                                        пользователя:
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    <br />
                                                                    {
                                                                        this
                                                                            .state
                                                                            .userInformation
                                                                            .genre
                                                                    }
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Возраст
                                                                        пользователя:
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .userInformation
                                                                            .age
                                                                    }
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Номер
                                                                        пасспорта
                                                                        пользователя
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .userInformation
                                                                            .passportNumber
                                                                    }
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Фотография
                                                                        пасспорта
                                                                        пользователя
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    <img
                                                                        className='figure-img img-fluid rounded'
                                                                        src={`data:image/*;base64,${this.state.userInformation.passportImage}`}
                                                                        alt=''
                                                                    />
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Номер
                                                                        телефона
                                                                        пользователя
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .userInformation
                                                                            .phoneNumber
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Tab>
                                                        <Tab
                                                            eventKey='водительскиеДанные'
                                                            title='Водительские Данные'
                                                        >
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <br />
                                                                    <h6 className='mb-0'>
                                                                        Номер
                                                                        водительских
                                                                        прав
                                                                        пользователя
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    <br />
                                                                    {
                                                                        this
                                                                            .state
                                                                            .customers
                                                                            .driverLicenseNumber
                                                                    }
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Стаж
                                                                        вождение
                                                                        пользователя
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .customers
                                                                            .drivingExperience
                                                                    }
                                                                </div>
                                                            </div>

                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Фотография
                                                                        водительских
                                                                        прав
                                                                        пользователя
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    <img
                                                                        className='figure-img img-fluid rounded'
                                                                        src={`data:image/*;base64,${this.state.customers.driverLicenseImage}`}
                                                                        alt=''
                                                                    />
                                                                </div>
                                                            </div>
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
                </div>
            </div>
        );
    }
}

export default UserProfile;
