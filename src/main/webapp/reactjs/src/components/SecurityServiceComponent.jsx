import React, { Component } from 'react';
import './../assets/css/SecurityService.css';
import UserService from '../services/user/UserService';

class SecurityServiceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
        };
    }
    sendEmail = (e) => {
        UserService.updateUser(
            this.state.name,
            this.state.email,
            this.state.message
        ).then((res) => {
            this.props.history.push('/home');
        });
    };
    changeData = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        return (
            <section id='contact'>
                <h1 className='section-header'>Contact</h1>

                <div className='contact-wrapper'>
                    <form id='contact-form' className='form-horizontal'>
                        <div className='form-group'>
                            <div className='col-sm-12'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='name'
                                    placeholder='Ваше имя:'
                                    name='name'
                                    onChange={this.changeData}
                                    value={this.state.name}
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-group'>
                            <div className='col-sm-12'>
                                <input
                                    type='email'
                                    className='form-control'
                                    id='email'
                                    placeholder='EMAIL'
                                    name='email'
                                    onChange={this.changeData}
                                    value={this.state.email}
                                    required
                                />
                            </div>
                        </div>

                        <textarea
                            className='form-control'
                            rows='10'
                            placeholder='MESSAGE'
                            name='message'
                            onChange={this.changeData}
                            required
                        ></textarea>

                        <button
                            className='btn btn-light send-button'
                            id='submit'
                            type='submit'
                            value='Отправить'
                            onClick={this.sendEmail}
                        >
                            <div className='alt-send-button'>
                                <i className='bi bi-send-fill'></i>
                                <span className='send-text'>Отправить</span>
                            </div>
                        </button>
                    </form>

                    <div className='direct-contact-container'>
                        <ul className='contact-list'>
                            <li className='list-item'>
                                <i className='bi bi-geo-alt-fill'>
                                    <span className='contact-text place'>
                                        Город
                                    </span>
                                </i>
                            </li>

                            <li className='list-item'>
                                <i className='bi bi-telephone-fill'>
                                    <span className='contact-text phone'>
                                        <a
                                            href='tel:1-212-555-5555'
                                            title='Give me a call'
                                        >
                                            (212) 555-2368
                                        </a>
                                    </span>
                                </i>
                            </li>

                            <li className='list-item'>
                                <i className='bi bi-envelope'>
                                    <span className='contact-text gmail'>
                                        <a
                                            href='mailto:#'
                                            title='Send me an email'
                                        >
                                            hitmeup@gmail.com
                                        </a>
                                    </span>
                                </i>
                            </li>
                        </ul>

                        <hr />
                        <ul className='social-media-list'>
                            <li>
                                <a
                                    href='/'
                                    target='_blank'
                                    className='contact-icon'
                                >
                                    <i
                                        className='bi bi-github'
                                        aria-hidden='true'
                                    ></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href='/'
                                    target='_blank'
                                    className='contact-icon'
                                >
                                    <i
                                        className='bi bi-bootstrap'
                                        aria-hidden='true'
                                    ></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href='/'
                                    target='_blank'
                                    className='contact-icon'
                                >
                                    <i
                                        className='bi bi-twitter'
                                        aria-hidden='true'
                                    ></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href='/'
                                    target='_blank'
                                    className='contact-icon'
                                >
                                    <i
                                        className='bi bi-instagram'
                                        aria-hidden='true'
                                    ></i>
                                </a>
                            </li>
                        </ul>
                        <hr />

                        <div className='copyright'>
                            &copy; ALL OF THE RIGHTS RESERVED
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default SecurityServiceComponent;
