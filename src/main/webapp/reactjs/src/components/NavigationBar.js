import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../services/index';

const NavigationBar = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutUser());
    };

    const guestLinks = (
        <>
            <div className='mr-auto'></div>
            <Nav className='navbar-right'>
                <Link to={'/register'} className='nav-link'>
                    <FontAwesomeIcon icon={faUserPlus} /> Зарегистрироваться
                </Link>
                <Link to={'/login'} className='nav-link'>
                    <FontAwesomeIcon icon={faSignInAlt} /> Войти
                </Link>
            </Nav>
        </>
    );
    const userLinks = (
        <>
            <Nav className='mr-auto'>
                <Link
                    to={`profile/${auth.id}/${auth.role}`}
                    className='nav-link'
                >
                    Профиль
                </Link>
                {auth.role === 'ADMIN' ? (
                    <Link to={'/users'} className='nav-link'>
                        Список пользователей
                    </Link>
                ) : (
                    ' '
                )}

                {auth.role === 'ADMIN' ? (
                    <Link
                        to={`rentals/${auth.id}/${auth.role}`}
                        className='nav-link'
                    >
                        Список всех аренд
                    </Link>
                ) : (
                    <Link
                        to={`rentals-user/${auth.id}/${auth.role}`}
                        className='nav-link'
                    >
                        Список ваших аренд
                    </Link>
                )}

                <Link
                    to={`ratings/${auth.id}/${auth.role}`}
                    className='nav-link'
                >
                    Рейтинги
                </Link>

                {auth.role === 'USER' ? (
                    <Link to={`/cars-user/${auth.id}`} className='nav-link'>
                        Список автомобилей
                    </Link>
                ) : (
                    <Link to={'/cars'} className='nav-link'>
                        Список автомобилей
                    </Link>
                )}
                 <Link to={'/security-service'} className='nav-link'>
                Служба поддержки
            </Link>
            </Nav>
           
            <Nav className='navbar-right'>
                <Link to={'/logout'} className='nav-link' onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Выйти
                </Link>
            </Nav>
        </>
    );

    return (
        <Navbar bg='dark' variant='dark'>
            <Link to={auth.isLoggedIn ? `/home/${auth.id}` : ''} className='navbar-brand'>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Circle-icons-car.svg/1200px-Circle-icons-car.svg.png'
                    width='25'
                    height='25'
                    alt='brand'
                />{' '}
                Аренда автомобилей
            </Link>
            {auth.isLoggedIn ? userLinks : guestLinks}
        </Navbar>
    );
};

export default NavigationBar;
