import {login, isLoggedIn, getCurrentUser, logout } from './Auth';
import {getLessons, getPDF, getLessonsWithAvaliation, createLesson, removeLesson} from './Lesson';


export default {
    getLessons,
    getPDF,
    login,
    isLoggedIn,
    getCurrentUser,
    logout,
    getLessonsWithAvaliation,
    createLesson,
    removeLesson
}