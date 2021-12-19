import React, { Component } from 'react';
import CarService from '../../services/car/CarService';
import axios from 'axios';
class CreateUpdateCarComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carId: this.props.match.params.carId,
            brand: '',
            model: '',
            types: [],
            classOfCars: [],
            type: '',
            classOfCar: '',
            count: 0,
            price: '',
            doors: '',
            passengers: '',
            transmission: '',
        };

        this.saveCar = this.saveCar.bind(this);
    }
    componentDidMount = () => {
        setTimeout(() => {
            if (this.state.carId) {
                this.findCarById(this.state.carId);
            }
        }, 300);
        this.findAllTypes();
        this.findAllClassOfCars();
    };
    findCarById = (carId) => {
        setTimeout(() => {
            CarService.getCarById(carId).then((res) => {
                let car = res.data;
                if (car != null) {
                    this.setState({
                        brand: car.brand,
                        model: car.model,
                        count: car.count,
                        price: car.price,
                        doors: car.doors,
                        passengers: car.passengers,
                        transmission: car.transmission,
                    });
                }
            });
        }, 1000);
    };
    findAllTypes = () => {
        setTimeout(() => {
            axios
                .get('http://localhost:8081/rest/car/type')
                .then((response) => {
                    let typesOfCar = response.data;
                    if (typesOfCar != null) {
                        this.setState({
                            types: [
                                { value: '', display: 'Выберите тип' },
                            ].concat(
                                typesOfCar.map((type) => {
                                    return { value: type, display: type };
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
    findAllClassOfCars = () => {
        setTimeout(() => {
            axios
                .get('http://localhost:8081/rest/car/class')
                .then((response) => {
                    let classOf = response.data;
                    if (classOf != null) {
                        this.setState({
                            classOfCars: [
                                { value: '', display: 'Выберите класс' },
                            ].concat(
                                classOf.map((classOfCar) => {
                                    return {
                                        value: classOfCar,
                                        display: classOfCar,
                                    };
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
    carChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    cancel() {
        this.props.history.push('/cars');
    }
    saveCar = (e) => {
        e.preventDefault();
        let car = {
            brand: this.state.brand,
            model: this.state.model,
            type: this.state.type,
            classOfCar: this.state.classOfCar,
            count: this.state.count,
            price: this.state.price,
            doors: this.state.doors,
            passengers: this.state.passengers,
            transmission: this.state.transmission,
        };
        console.log('car => ' + JSON.stringify(car));

        CarService.createCar(car).then((res) => {
            this.props.history.push('/cars');
        });
    };
    updateCar = (e) => {
        e.preventDefault();
        let car = {
            id: this.state.carId,
            brand: this.state.brand,
            model: this.state.model,
            type: this.state.type,
            classOfCar: this.state.classOfCar,
            count: this.state.count,
            price: this.state.price,
            doors: this.state.doors,
            passengers: this.state.passengers,
            transmission: this.state.transmission,
        };
        console.log('car => ' + JSON.stringify(car));

        CarService.updateCar(car).then((res) => {
            this.props.history.push(`/car-page/${this.state.carId}`);
        });
    };
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>
                                {this.state.carId
                                    ? 'Обновить данные автомобиля'
                                    : 'Добавить новый автомобиль'}
                            </h3>
                            <div className='card-body'>
                                <form
                                    onSubmit={
                                        this.state.carId
                                            ? this.updateCar
                                            : this.saveCar
                                    }
                                >
                                    <div className='form-group'>
                                        <label>Брэнд автомобиля:</label>
                                        <input
                                            placeholder='Брэнд автомобиля:'
                                            name='brand'
                                            className='form-control'
                                            value={this.state.brand}
                                            onChange={this.carChange}
                                            required
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Модель автомобиля :</label>
                                        <input
                                            placeholder='Модель автомобиля :'
                                            name='model'
                                            className='form-control'
                                            value={this.state.model}
                                            onChange={this.carChange}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>Тип автомобиля:</label>
                                        <select
                                            placeholder='Тип автомобиля:'
                                            name='type'
                                            type='select'
                                            className='form-control'
                                            value={this.state.type}
                                            onChange={this.carChange}
                                            required
                                        >
                                            {this.state.types.map((type) => (
                                                <option
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.display}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label>Класс автомобиля:</label>
                                        <select
                                            placeholder='Класс автомобиля:'
                                            name='classOfCar'
                                            type='select'
                                            className='form-control'
                                            value={this.state.classOfCar}
                                            onChange={this.carChange}
                                            required
                                        >
                                            {this.state.classOfCars.map(
                                                (classOfCar) => (
                                                    <option
                                                        key={classOfCar.value}
                                                        value={classOfCar.value}
                                                    >
                                                        {classOfCar.display}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label>Количество атомобилей :</label>
                                        <input
                                            placeholder='Количество атомобилей :'
                                            name='count'
                                            type='number'
                                            className='form-control'
                                            value={this.state.count}
                                            onChange={this.carChange}
                                            required
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Цена автомобиля :</label>
                                        <input
                                            placeholder='Цена автомобиля :'
                                            name='price'
                                            type='number'
                                            className='form-control'
                                            value={this.state.price}
                                            onChange={this.carChange}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>
                                            Количество дверей автомобиля :
                                        </label>
                                        <input
                                            placeholder='Количество дверей автомобиля :'
                                            name='doors'
                                            type='number'
                                            className='form-control'
                                            value={this.state.doors}
                                            onChange={this.carChange}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>Количество пассажиров:</label>
                                        <input
                                            placeholder='Количество пассажиров:'
                                            name='passengers'
                                            type='number'
                                            className='form-control'
                                            value={this.state.passengers}
                                            onChange={this.carChange}
                                            required
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Трансмиссия автомобиля:</label>
                                        <input
                                            placeholder='Трансмиссия автомобиля:'
                                            name='transmission'
                                            className='form-control'
                                            value={this.state.transmission}
                                            onChange={this.carChange}
                                            required
                                        />
                                    </div>

                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={
                                            this.state.carId
                                                ? this.updateCar
                                                : this.saveCar
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

export default CreateUpdateCarComponent;
