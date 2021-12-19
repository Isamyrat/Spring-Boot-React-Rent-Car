import React, { Component } from 'react';

class CreateUpdateDimplomaImageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emloyeeId: this.props.match.params.employeeId,
            idUser: this.props.match.params.idUser,
            role: this.props.match.params.role,
            file: '',
        };

        this.saveDimplomaImage = this.saveDimplomaImage.bind(this);
    }
    onFileChange = (event) => {
        this.setState({
            file: event.target.files[0],
        });
    };
    saveDimplomaImage = (e) => {
        e.preventDefault();

        if (!this.state.file) {
            console.log('saveDimplomaImage is null => ');
        }
        if (this.state.file.size >= 1000000) {
            console.log('File size exceeds limit of 2MB.');
        }

        let data = new FormData();
        data.append('file', this.state.file);

        console.log('data => ' + data);
        fetch(
            `http://localhost:8081/rest/user/employer/${this.state.emloyeeId}/diploma/image`,
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
                            <h3 className='text-center'>Фотография диплома</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>фотография :</label>
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
                                        onClick={this.saveDimplomaImage}
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

export default CreateUpdateDimplomaImageComponent;
