import React, { Component } from 'react';
import EmployeeService from '../../services/employee/EmployeeService';

class CreateUpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employeeId: this.props.match.params.employeeId,
            position: '',
            education: '',
            idUser: this.props.match.params.idUser,
            file: '',
            role: this.props.match.params.role,
        };

        this.saveEmployee = this.saveEmployee.bind(this);
    }
    componentDidMount = () => {
        const id = +this.props.match.params.employeeId;

        if (id) {
            this.findEmployeeById(id);
        }
    };
    findEmployeeById = (id) => {
        setTimeout(() => {
            EmployeeService.getEmployeeByEmployeeId(id).then((res) => {
                let employers = res.data;

                if (employers != null) {
                    this.setState({
                        position: employers.position,
                        education: employers.education,
                    });
                }
            });
        }, 1000);
    };
    employeeChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    updateEmployee = (e) => {
        e.preventDefault();
        const employeeId = this.state.employeeId;
        let employers = {
            id: employeeId,
            position: this.state.position,
            education: this.state.education,
        };

        console.log('employers => ' + JSON.stringify(employers));

        EmployeeService.updateEmployee(employers).then((res) => {
            this.props.history.push(
                `/profile/${this.state.idUser}/${this.state.role}`
            );
        });
    };

    saveEmployee = (e) => {
        e.preventDefault();
        const userId = this.state.idUser;
        let employers = {
            position: this.state.position,
            education: this.state.education,
        };

        console.log('employers => ' + JSON.stringify(employers));

        EmployeeService.createEmployee(userId, employers).then((res) => {
            this.props.history.push(
                `/profile/${this.state.idUser}/${this.state.role}`
            );
        });
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
                                {this.state.employeeId
                                    ? 'Обновить рабочие данные'
                                    : 'Добавить рабочие данные'}
                            </h3>
                            <div className='card-body'>
                                <form
                                    onSubmit={
                                        this.state.employeeId
                                            ? this.updateEmployee
                                            : this.saveEmployee
                                    }
                                >
                                    <div className='form-group'>
                                        <label>Должность :</label>
                                        <input
                                            placeholder='Your position:'
                                            name='Должность'
                                            type='text'
                                            className='form-control'
                                            value={this.state.position}
                                            onChange={this.employeeChange}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>Ваше образование:</label>
                                        <input
                                            placeholder='Ваше образование:'
                                            name='education'
                                            className='form-control'
                                            value={this.state.education}
                                            onChange={this.employeeChange}
                                        />
                                    </div>

                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={
                                            this.state.employeeId
                                                ? this.updateEmployee
                                                : this.saveEmployee
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
export default CreateUpdateEmployeeComponent;
