import React, { Component } from 'react';
import UserService from '../../services/user/UserService';

class CreateUpdateUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.idUser,
            role: this.props.match.params.role,
            name: '',
            surname: '',
        };
    }
    componentDidMount = () => {
        setTimeout(() => {
            const userId = this.state.id;
            if (userId) {
                this.findUserById(userId);
            }
        }, 300);
    };

    findUserById = (userId) => {
        setTimeout(() => {
            UserService.getUserById(userId).then((res) => {
                let user = res.data;
                if (user != null) {
                    this.setState({
                        name: user.name,
                        surname: user.surname,
                    });
                }
            });
        }, 1000);
    };
    updateUser = (e) => {
        e.preventDefault();
        let user = {
            id: this.state.id,
            name: this.state.name,
            surname: this.state.surname,
        };
        console.log('user => ' + JSON.stringify(user));

        UserService.updateUser(user).then((res) => {
            this.props.history.push(
                `/profile/${this.state.id}/${this.state.role}`
            );
        });
    };
    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    cancel() {
        this.props.history.push(`/profile/${this.state.id}/${this.state.role}`);
    }
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Изменение данных</h3>
                            <div className='card-body'>
                                <form id='contact-form'>
                                    <div className='form-group'>
                                        <label>Введите имя:</label>
                                        <input
                                            placeholder='Введите имя:'
                                            name='name'
                                            id='name'
                                            type='text'
                                            className='form-control'
                                            value={this.state.name}
                                            onChange={this.userChange}
                                            required
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Введите фамилию:</label>
                                        <input
                                            placeholder='Введите фамилию:'
                                            name='surname'
                                            className='form-control'
                                            value={this.state.surname}
                                            onChange={this.userChange}
                                            required
                                        />
                                    </div>

                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={this.updateUser}
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

export default CreateUpdateUserComponent;
