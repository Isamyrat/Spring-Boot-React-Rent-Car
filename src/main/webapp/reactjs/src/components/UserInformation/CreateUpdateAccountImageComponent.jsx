import React, { Component } from 'react';

class CreateUpdateAccountImageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idUserInformation: this.props.match.params.idUserInformation,
            idUser: this.props.match.params.idUser,
            file: '',
            role: this.props.match.params.role,
        };

        this.saveAccountImage = this.saveAccountImage.bind(this);
    }

    onFileChange = (event) => {
        this.setState({
            file: event.target.files[0],
        });
    };

    saveAccountImage = (e) => {
        e.preventDefault();

        if (!this.state.file) {
            console.log('saveAccountImage is null => ');
        }
        if (this.state.file.size >= 1000000) {
            console.log('File size exceeds limit of 2MB.');
        }

        let data = new FormData();
        data.append('file', this.state.file);

        console.log('data => ' + data);

        fetch(
            `http://localhost:8081/rest/user/information/${this.state.idUserInformation}/files/account/image`,
            {
                method: 'POST',
                body: data,
            }
        )
            .then((response) => {
                console.log('Sucessfully uploaded file');
                this.props.history.push(
                    `/profile/${this.state.idUser}/${this.state.role}`
                );
            })
            .catch((err) => {
                console.log('Sucessfully uploaded not file' + err);
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
                            <h3 className='text-center'>Фотография аккаунта</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Фотография :</label>
                                        <input
                                            accept='image/*'
                                            className='form-control'
                                            type='file'
                                            onChange={this.onFileChange}
                                        />{' '}
                                    </div>

                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={this.saveAccountImage}
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

export default CreateUpdateAccountImageComponent;
