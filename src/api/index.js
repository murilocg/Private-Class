import {login, isLoggedIn, getCurrentUser, logout } from './Auth';
import {getLessons, getPDF, getLessonsWithAvaliation, createLesson, removeLesson} from './Lesson';
import { getUsers, removeUser, createUser, updateUser } from './User';
import {getComments, createComment} from './Comment';


export default {
    getLessons,
    getPDF,
    login,
    isLoggedIn,
    getCurrentUser,
    logout,
    getLessonsWithAvaliation,
    createLesson,
    removeLesson,
    getUsers,
    removeUser,
    createUser,
    updateUser,
    getComments,
    createComment
}