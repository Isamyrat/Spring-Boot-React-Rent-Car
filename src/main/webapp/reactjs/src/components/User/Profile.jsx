import React, { Component } from 'react';
import UserService from '../../services/user/UserService';
import UserInformationService from '../../services/user/UserInformationService ';
import EmployeeService from '../../services/employee/EmployeeService';
import CustomersService from '../../services/customers/CustomersService';
import { Tabs, Tab, Row, Col, Container } from 'react-bootstrap';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.idUser,
            role: this.props.match.params.role,
            user: {},
            userInformation: {},
            employers: {},
            customers: {},
        };
    }

    componentDidMount() {
        setTimeout(() => {
            UserService.getUserById(this.state.id).then((res) => {
                this.setState({ user: res.data });
            });
            UserInformationService.getUserInformationByUserId(
                this.state.id
            ).then((res) => {
                this.setState({ userInformation: res.data });
            });
            EmployeeService.getEmployeeByUserId(this.state.id).then((res) => {
                this.setState({ employers: res.data });
            });
            CustomersService.getCustomersByUserId(this.state.id).then((res) => {
                this.setState({ customers: res.data });
            });
        }, 1000);
    }

    editUser = (idUser) => {
        let role = this.state.role;
        setTimeout(() => {
            this.props.history.push(`/update-user/${idUser}/${role}`);
        }, 1000);
    };
    addImageAccount = (idUserInformation) => {
        let idUser = this.state.id;
        let role = this.state.role;

        setTimeout(() => {
            this.props.history.push(
                `/create-account-image/${idUserInformation}/${idUser}/${role}`
            );
        }, 1000);
    };
    addImagePassport = (idUserInformation) => {
        let idUser = this.state.id;
        let role = this.state.role;

        setTimeout(() => {
            this.props.history.push(
                `/create-passport-image/${idUserInformation}/${idUser}/${role}`
            );
        }, 1000);
    };
    createUserInformation(userId) {
        let role = this.state.role;

        this.props.history.push(`/create-user-information/${userId}/${role}`);
    }
    editUserInformation = (userInformationId) => {
        let role = this.state.role;

        setTimeout(() => {
            this.props.history.push(
                `/update-user-information/${userInformationId}/${this.state.id}/${role}`
            );
        }, 1000);
    };
    createEmployee(userId) {
        let role = this.state.role;

        this.props.history.push(`/create-employee/${userId}/${role}`);
    }
    editEmployee = (employeeId) => {
        let role = this.state.role;

        setTimeout(() => {
            this.props.history.push(
                `/update-employee/${employeeId}/${this.state.id}/${role}`
            );
        }, 1000);
    };
    addDimplomaImage = (emloyeeId) => {
        let role = this.state.role;

        let idUser = this.state.id;
        console.log(emloyeeId);
        setTimeout(() => {
            this.props.history.push(
                `/create-diploma-image/${emloyeeId}/${idUser}/${role}`
            );
        }, 1000);
    };
    createCustomers(userId) {
        this.props.history.push(
            `/create-customer/${userId}/${this.state.role}`
        );
    }
    editCustomers = (customersId) => {
        setTimeout(() => {
            this.props.history.push(
                `/update-customer/${customersId}/${this.state.id}/${this.state.role}`
            );
        }, 1000);
    };
    addDriverLicense = (customersId) => {
        setTimeout(() => {
            this.props.history.push(
                `/create-driver-license-image/${customersId}/${this.state.id}/${this.state.role}`
            );
        }, 1000);
    };
    back() {
        this.props.history.push('/');
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

                                                <div className='mt-3'>
                                                    {this.state.userInformation
                                                        .id ? (
                                                        <button
                                                            className='btn btn-primary push-right'
                                                            onClick={() =>
                                                                this.addImageAccount(
                                                                    this.state
                                                                        .userInformation
                                                                        .id
                                                                )
                                                            }
                                                            style={{
                                                                marginLeft:
                                                                    '10px',
                                                            }}
                                                        >
                                                            {this.state
                                                                .userInformation
                                                                .accountImage
                                                                ? 'Изменить'
                                                                : 'Добавить'}
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
                                                        Ваша фамилие
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
                                                        Ваша имя
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
                                                        Ваша почта
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
                                                        Аккаунт добавлен
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.user.createAt}
                                                </div>
                                            </div>
                                            <hr />

                                            <div className='row'>
                                                <div className='col-sm-12'>
                                                    <button
                                                        onClick={() =>
                                                            this.editUser(
                                                                this.state.user
                                                                    .id
                                                            )
                                                        }
                                                        className='btn btn-info'
                                                    >
                                                        Изменить данные
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
                                                                        Ваш пол:
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
                                                                        Ваш
                                                                        возраст:
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
                                                                        паспорта
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
                                                                        паспорта
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {this.state
                                                                        .userInformation
                                                                        .passportImage ? (
                                                                        <img
                                                                            style={{
                                                                                resizeMode:
                                                                                    'contain',
                                                                                height: 130,
                                                                                width: 250,
                                                                            }}
                                                                            className='figure-img img-fluid rounded'
                                                                            src={`data:image/*;base64,${this.state.userInformation.passportImage}`}
                                                                            alt=''
                                                                        />
                                                                    ) : (
                                                                        ''
                                                                    )}
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-sm-12'>
                                                                        {this
                                                                            .state
                                                                            .userInformation
                                                                            .id ? (
                                                                            <button
                                                                                className='btn btn-primary pull-right'
                                                                                onClick={() =>
                                                                                    this.addImagePassport(
                                                                                        this
                                                                                            .state
                                                                                            .userInformation
                                                                                            .id
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    marginLeft:
                                                                                        '10px',
                                                                                }}
                                                                            >
                                                                                {this
                                                                                    .state
                                                                                    .userInformation
                                                                                    .passportImage
                                                                                    ? 'Изменить'
                                                                                    : 'Добавить  '}
                                                                            </button>
                                                                        ) : (
                                                                            ''
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Номер
                                                                        телефона
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
                                                            <hr />

                                                            <div className='row'>
                                                                <div className='col-sm-12'>
                                                                    <button
                                                                        onClick={() => {
                                                                            this
                                                                                .state
                                                                                .userInformation
                                                                                .id
                                                                                ? this.editUserInformation(
                                                                                      this
                                                                                          .state
                                                                                          .userInformation
                                                                                          .id
                                                                                  )
                                                                                : this.createUserInformation(
                                                                                      this
                                                                                          .state
                                                                                          .user
                                                                                          .id
                                                                                  );
                                                                        }}
                                                                        className='btn btn-info'
                                                                    >
                                                                        {this
                                                                            .state
                                                                            .userInformation
                                                                            .id
                                                                            ? 'Изменить'
                                                                            : 'Добавить'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </Tab>
                                                        {this.state.role ===
                                                        'ADMIN' ? (
                                                            <Tab
                                                                eventKey='рабочаяИнформация'
                                                                title='Рабочая Информация'
                                                            >
                                                                <div className='row'>
                                                                    <div className='col-sm-3'>
                                                                        <br />
                                                                        <h6 className='mb-0'>
                                                                            Должность
                                                                        </h6>
                                                                    </div>
                                                                    <div className='col-sm-9 text-secondary'>
                                                                        <br />
                                                                        {
                                                                            this
                                                                                .state
                                                                                .employers
                                                                                .position
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <div className='row'>
                                                                    <div className='col-sm-3'>
                                                                        <h6 className='mb-0'>
                                                                            Образование
                                                                        </h6>
                                                                    </div>
                                                                    <div className='col-sm-9 text-secondary'>
                                                                        {
                                                                            this
                                                                                .state
                                                                                .employers
                                                                                .education
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <div className='row'>
                                                                    <div className='col-sm-3'>
                                                                        <h6 className='mb-0'>
                                                                            Дата
                                                                            принятие
                                                                            на
                                                                            работу
                                                                        </h6>
                                                                    </div>
                                                                    <div className='col-sm-9 text-secondary'>
                                                                        {
                                                                            this
                                                                                .state
                                                                                .employers
                                                                                .takeToWork
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <div className='row'>
                                                                    <div className='col-sm-3'>
                                                                        <h6 className='mb-0'>
                                                                            Фотография
                                                                            диплома
                                                                        </h6>
                                                                    </div>
                                                                    <div className='col-sm-9 text-secondary'>
                                                                        <img
                                                                            className='figure-img img-fluid rounded'
                                                                            src={`data:image/*;base64,${this.state.employers.diplomaImage}`}
                                                                            alt=''
                                                                        />
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='col-sm-12'>
                                                                            {this
                                                                                .state
                                                                                .employers
                                                                                .id ? (
                                                                                <button
                                                                                    className='btn btn-primary pull-right'
                                                                                    onClick={() =>
                                                                                        this.addDimplomaImage(
                                                                                            this
                                                                                                .state
                                                                                                .employers
                                                                                                .id
                                                                                        )
                                                                                    }
                                                                                    style={{
                                                                                        marginLeft:
                                                                                            '10px',
                                                                                    }}
                                                                                >
                                                                                    {this
                                                                                        .state
                                                                                        .employers
                                                                                        .diplomaImage
                                                                                        ? 'Изменить'
                                                                                        : 'Добавить '}
                                                                                </button>
                                                                            ) : (
                                                                                ''
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <div className='row'>
                                                                    <div className='col-sm-12'>
                                                                        <button
                                                                            onClick={() => {
                                                                                this
                                                                                    .state
                                                                                    .employers
                                                                                    .id
                                                                                    ? this.editEmployee(
                                                                                          this
                                                                                              .state
                                                                                              .employers
                                                                                              .id
                                                                                      )
                                                                                    : this.createEmployee(
                                                                                          this
                                                                                              .state
                                                                                              .user
                                                                                              .id
                                                                                      );
                                                                            }}
                                                                            className='btn btn-info'
                                                                        >
                                                                            {this
                                                                                .state
                                                                                .employers
                                                                                .id
                                                                                ? 'Изменить'
                                                                                : 'Добавить'}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </Tab>
                                                        ) : (
                                                            ' '
                                                        )}
                                                        {this.state.role ===
                                                        'USER' ? (
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
                                                                        </h6>
                                                                    </div>
                                                                    <div className='col-sm-9 text-secondary'>
                                                                        <img
                                                                            className='figure-img img-fluid rounded'
                                                                            src={`data:image/*;base64,${this.state.customers.driverLicenseImage}`}
                                                                            alt=''
                                                                        />
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='col-sm-12'>
                                                                            {this
                                                                                .state
                                                                                .customers
                                                                                .id ? (
                                                                                <button
                                                                                    className='btn btn-primary pull-right'
                                                                                    onClick={() =>
                                                                                        this.addDriverLicense(
                                                                                            this
                                                                                                .state
                                                                                                .customers
                                                                                                .id
                                                                                        )
                                                                                    }
                                                                                    style={{
                                                                                        marginLeft:
                                                                                            '10px',
                                                                                    }}
                                                                                >
                                                                                    {this
                                                                                        .state
                                                                                        .customers
                                                                                        .driverLicenseImage
                                                                                        ? 'Изменить'
                                                                                        : 'Добавить'}
                                                                                </button>
                                                                            ) : (
                                                                                ''
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <hr />

                                                                <div className='row'>
                                                                    <div className='col-sm-12'>
                                                                        <button
                                                                            onClick={() => {
                                                                                this
                                                                                    .state
                                                                                    .customers
                                                                                    .id
                                                                                    ? this.editCustomers(
                                                                                          this
                                                                                              .state
                                                                                              .customers
                                                                                              .id
                                                                                      )
                                                                                    : this.createCustomers(
                                                                                          this
                                                                                              .state
                                                                                              .user
                                                                                              .id
                                                                                      );
                                                                            }}
                                                                            className='btn btn-info'
                                                                        >
                                                                            {this
                                                                                .state
                                                                                .customers
                                                                                .id
                                                                                ? 'Изменить'
                                                                                : 'Добавить'}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </Tab>
                                                        ) : (
                                                            ' '
                                                        )}
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

export default Profile;
