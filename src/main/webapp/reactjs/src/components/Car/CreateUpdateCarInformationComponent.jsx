import React, { Component } from 'react';
import CarInformationService from '../../services/car/CarInformationService';
import axios from 'axios';

class CreateUpdateCarInformationComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carInformationId: this.props.match.params.carInformationId,
            mileage: 0,
            condition: '',

            carId: this.props.match.params.carId,
            year: 0,
            color: '',
            colors: [],
        };

        this.saveCarInformation = this.saveCarInformation.bind(this);
    }
    componentDidMount = () => {
        if (this.state.carInformationId) {
            this.findCarInformationById(this.state.carInformationId);
        }
        this.findAllColors();
    };
    findCarInformationById = (carInformationId) => {
        setTimeout(() => {
            CarInformationService.getCarInformationByCarInformationId(
                carInformationId
            ).then((res) => {
                let carInformation = res.data;

                if (carInformation != null) {
                    this.setState({
                        mileage: carInformation.mileage,
                        condition: carInformation.condition,

                        year: carInformation.year,
                    });
                }
            });
        }, 1000);
    };
    findAllColors = () => {
        setTimeout(() => {
            axios
                .get('http://localhost:8081/rest/car/information/colors')
                .then((response) => {
                    let allColors = response.data;
                    if (allColors != null) {
                        this.setState({
                            colors: [
                                { value: '', display: 'Select color' },
                            ].concat(
                                allColors.map((color) => {
                                    return { value: color, display: color };
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
    saveCarInformation = (e) => {
        e.preventDefault();
        let carInformation = {
            color: this.state.color,
            mileage: this.state.mileage,
            condition: this.state.condition,

            year: this.state.year,
        };

        console.log('carInformation => ' + JSON.stringify(carInformation));
        console.log('carId => ' + this.state.carId);

        CarInformationService.createCarInformation(
            this.state.carId,
            carInformation
        ).then((res) => {
            this.props.history.push(`/car-page/${this.state.carId}`);
        });
    };
    updateCarInformation = (e) => {
        e.preventDefault();
        let carInformation = {
            id: this.state.carInformationId,
            color: this.state.color,
            mileage: this.state.mileage,
            condition: this.state.condition,

            year: this.state.year,
        };

        console.log('carInformation => ' + JSON.stringify(carInformation));

        CarInformationService.updateCarInformation(carInformation).then(
            (res) => {
                this.props.history.push(`/car-page/${this.state.carId}`);
            }
        );
    };
    carInformationChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    cancel() {
        this.props.history.push(`/car-page/${this.state.carId}`);
    }
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>
                                {this.state.carInformationId
                                    ? 'Изменить дополнительные данные о машине'
                                    : 'Добавить дополнительные данные о машине'}
                            </h3>
                            <div className='card-body'>
                                <form
                                    onSubmit={
                                        this.state.carInformationId
                                            ? this.updateCarInformation
                                            : this.saveCarInformation
                                    }
                                >
                                    <div className='form-group'>
                                        <label>Цвет автомобиля :</label>
                                        <select
                                            placeholder='Your color:'
                                            name='color'
                                            type='select'
                                            className='form-control'
                                            value={this.state.color}
                                            onChange={this.carInformationChange}
                                        >
                                            {this.state.colors.map((color) => (
                                                <option
                                                    key={color.value}
                                                    value={color.value}
                                                >
                                                    {color.display}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className='form-group'>
                                        <label>Пробег автомобиля:</label>
                                        <input
                                            placeholder='Your mileage:'
                                            name='mileage'
                                            type='number'
                                            className='form-control'
                                            value={this.state.mileage}
                                            onChange={this.carInformationChange}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>Состояние автомобиля :</label>
                                        <input
                                            placeholder='Your condition:'
                                            name='condition'
                                            className='form-control'
                                            value={this.state.condition}
                                            onChange={this.carInformationChange}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Год автомобиля:</label>
                                        <input
                                            placeholder='Год автомобиля:'
                                            name='year'
                                            type='number'
                                            className='form-control'
                                            value={this.state.year}
                                            onChange={this.carInformationChange}
                                        />
                                    </div>

                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={
                                            this.state.carInformationId
                                                ? this.updateCarInformation
                                                : this.saveCarInformation
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

export default CreateUpdateCarInformationComponent;
