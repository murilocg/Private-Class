import {login, isLoggedIn, getCurrentUser, logout } from './Auth';
import {getLessons, getPDF} from './Lesson';


export default {
    getLessons,
    getPDF,
    login,
    isLoggedIn,
    getCurrentUser,
    logout
}