import React, { Component } from 'react';

class CreateUpdateCarImageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carId: this.props.match.params.carId,
            file: '',
        };

        this.saveCarImage = this.saveCarImage.bind(this);
    }
    saveCarImage = (e) => {
        e.preventDefault();

        if (!this.state.file) {
            console.log('saveCarImage is null => ');
        }
        if (this.state.file.size >= 1000000) {
            console.log('File size exceeds limit of 2MB.');
        }

        let data = new FormData();
        data.append('file', this.state.file);

        console.log('data => ' + data);

        fetch(`http://localhost:8081/rest/car/${this.state.carId}/car/image`, {
            method: 'POST',
            body: data,
        })
            .then((response) => {
                console.log('Sucessfully uploaded file');
                this.props.history.push(`/car-page/${this.state.carId}`);
            })
            .catch((err) => {
                console.log('Sucessfully uploaded not file' + err);
            });
    };
    onFileChange = (event) => {
        this.setState({
            file: event.target.files[0],
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
                                Фотография автомобиля
                            </h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Фотография :</label>
                                        <input
                                            accept='image/*'
                                            className='form-control'
                                            type='file'
                                            onChange={this.onFileChange}
                                            required
                                        />{' '}
                                    </div>

                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={this.saveCarImage}
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

export default CreateUpdateCarImageComponent;
