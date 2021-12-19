import React, { Component } from 'react';
import UserInformationService from '../../services/user/UserInformationService ';
import axios from 'axios';
class CreateUserInformationComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInformationId: this.props.match.params.userInformationId,
            age: 0,
            passportNumber: '',
            phoneNumber: '',
            idUser: this.props.match.params.idUser,
            file: '',
            genre: '',
            genders: [],
            role: this.props.match.params.role,
        };
        this.saveInformationUser = this.saveInformationUser.bind(this);
    }
    componentDidMount = () => {
        const id = this.state.userInformationId;

        if (id) {
            this.findUserInformationById(id);
        }
        this.findAllGenres();
    };
    findUserInformationById = (id) => {
        setTimeout(() => {
            UserInformationService.getUserInformationByUserInformationId(
                id
            ).then((res) => {
                let userInformation = res.data;

                if (userInformation != null) {
                    this.setState({
                        age: userInformation.age,
                        passportNumber: userInformation.passportNumber,
                        phoneNumber: userInformation.phoneNumber,
                    });
                }
            });
        }, 1000);
    };
    findAllGenres = () => {
        setTimeout(() => {
            axios
                .get('http://localhost:8081/rest/user/information/genders')
                .then((response) => {
                    let genres = response.data;
                    if (genres != null) {
                        this.setState({
                            genders: [
                                { value: '', display: 'Select genre' },
                            ].concat(
                                genres.map((genre) => {
                                    return { value: genre, display: genre };
                                })
                            ),
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 100);
    };
    userInformationChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    saveInformationUser = (e) => {
        e.preventDefault();
        const userId = this.state.idUser;
        let userInformation = {
            age: this.state.age,
            genre: this.state.genre,
            passportNumber: this.state.passportNumber,
            phoneNumber: this.state.phoneNumber,
        };

        console.log('userInformation => ' + JSON.stringify(userInformation));

        UserInformationService.createUserInformation(
            userId,
            userInformation
        ).then((res) => {
            this.props.history.push(
                `/profile/${this.state.idUser}/${this.state.role}`
            );
        });
    };
    updateInformationUser = (e) => {
        e.preventDefault();
        const userInformationId = this.state.userInformationId;
        let userInformation = {
            id: userInformationId,
            age: this.state.age,
            genre: this.state.genre,
            passportNumber: this.state.passportNumber,
            phoneNumber: this.state.phoneNumber,
        };

        console.log('userInformation => ' + JSON.stringify(userInformation));
        UserInformationService.updateUserInformation(userInformation).then(
            (res) => {
                this.props.history.push(
                    `/profile/${this.state.idUser}/${this.state.role}`
                );
            }
        );
    };
    cancel() {
        this.props.history.push(
            `/profile/${this.state.idUser}/${this.state.role}`
        );
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>
                                {this.state.userInformationId
                                    ? 'Изменение пользовательских данных'
                                    : 'Добавление пользовательских данных'}
                            </h3>
                            <div className='card-body'>
                                <form
                                    onSubmit={
                                        this.state.userInformationId
                                            ? this.updateInformationUser
                                            : this.saveInformationUser
                                    }
                                >
                                    <div className='form-group'>
                                        <label>Ваш пол :</label>
                                        <select
                                            placeholder='Ваш пол:'
                                            name='genre'
                                            type='select'
                                            className='form-control'
                                            value={this.state.genre}
                                            onChange={
                                                this.userInformationChange
                                            }
                                        >
                                            {this.state.genders.map((genre) => (
                                                <option
                                                    key={genre.value}
                                                    value={genre.value}
                                                >
                                                    {genre.display}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className='form-group'>
                                        <label>Ваш возраст :</label>
                                        <input
                                            placeholder='Ваш возраст:'
                                            name='age'
                                            type='number'
                                            className='form-control'
                                            value={this.state.age}
                                            onChange={
                                                this.userInformationChange
                                            }
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>Ваш номер пасспорта:</label>
                                        <input
                                            placeholder='Ваш номер пасспорта(с буквой):'
                                            name='passportNumber'
                                            className='form-control'
                                            value={this.state.passportNumber}
                                            onChange={
                                                this.userInformationChange
                                            }
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Ваш номер телефона:</label>
                                        <input
                                            placeholder='Ваш номер телефона:'
                                            name='phoneNumber'
                                            className='form-control'
                                            value={this.state.phoneNumber}
                                            onChange={
                                                this.userInformationChange
                                            }
                                        />
                                    </div>

                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={
                                            this.state.userInformationId
                                                ? this.updateInformationUser
                                                : this.saveInformationUser
                                        }
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

export default CreateUserInformationComponent;
