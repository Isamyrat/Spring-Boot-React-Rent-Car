import React, { Component } from 'react';
import CustomersService from '../../services/customers/CustomersService';
class CreateUpdateCustomersComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customersId: this.props.match.params.customersId,
            drivingExperience: 0,
            driverLicenseNumber: '',
            idUser: this.props.match.params.idUser,
            file: '',
            role: this.props.match.params.role,
        };

        this.saveCustomers = this.saveCustomers.bind(this);
    }
    componentDidMount = () => {
        if (this.state.customersId) {
            this.findCustomersById(this.state.customersId);
        }
    };
    findCustomersById = (customersId) => {
        setTimeout(() => {
            CustomersService.getCustomersByCustomersId(customersId).then(
                (res) => {
                    let customers = res.data;

                    if (customers != null) {
                        this.setState({
                            driverLicenseNumber: customers.driverLicenseNumber,
                            drivingExperience: customers.drivingExperience,
                        });
                    }
                }
            );
        }, 1000);
    };
    customersChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    saveCustomers = (e) => {
        e.preventDefault();

        let customers = {
            driverLicenseNumber: this.state.driverLicenseNumber,
            drivingExperience: this.state.drivingExperience,
        };

        console.log('customers => ' + JSON.stringify(customers));

        CustomersService.createCustomers(this.state.idUser, customers).then(
            (res) => {
                this.props.history.push(
                    `/profile/${this.state.idUser}/${this.state.role}`
                );
            }
        );
    };
    updateCustomer = (e) => {
        e.preventDefault();

        let customers = {
            id: this.state.customersId,
            driverLicenseNumber: this.state.driverLicenseNumber,
            drivingExperience: this.state.drivingExperience,
        };

        console.log('customers => ' + JSON.stringify(customers));

        CustomersService.updateCustomers(customers).then((res) => {
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
                                {this.state.customersId
                                    ? 'Обновить водительские данные'
                                    : 'Добавить водительские данные'}
                            </h3>
                            <div className='card-body'>
                                <form
                                    onSubmit={
                                        this.state.customersId
                                            ? this.updateCustomer
                                            : this.saveCustomer
                                    }
                                >
                                    <div className='form-group'>
                                        <label>Стаж вождение:</label>
                                        <input
                                            placeholder='Your driving experience:'
                                            name='drivingExperience'
                                            type='number'
                                            className='form-control'
                                            value={this.state.drivingExperience}
                                            onChange={this.customersChange}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>
                                            Номер водительских прав(с буквой):
                                        </label>
                                        <input
                                            placeholder='Your driver license number:'
                                            name='driverLicenseNumber'
                                            className='form-control'
                                            value={
                                                this.state.driverLicenseNumber
                                            }
                                            onChange={this.customersChange}
                                        />
                                    </div>

                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={
                                            this.state.customersId
                                                ? this.updateCustomer
                                                : this.saveCustomers
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
export default CreateUpdateCustomersComponent;
