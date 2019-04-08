import FirebaseHelper from './FirebaseHelper';
import jwt_decode from 'jwt-decode';
import history from '../components/history';

FirebaseHelper.auth.onIdTokenChanged(async (payload) => {
    if (!payload) return;

    const decode = persistAuth(payload);
    const user = await getUserById(decode['user_id']);
    // if (user.type === 'admin') {
    //     window.location = '/admin/lessons';
    // } else {
    //     window.location = '/student/classroom';
    // }
});

const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
}

const persistAuth = (payload) => {
    const decode = jwt_decode(payload.ra);
    const expires = JSON.stringify(new Date(decode.exp * 1000).getTime());
    localStorage.setItem('token', payload.ra);
    localStorage.setItem('expires_at', expires);
    localStorage.setItem('user_id', decode['user_id']);
    localStorage.setItem('email', decode.email);
    return decode;
}

const Users = FirebaseHelper.database.collection('user');

export const login = async (email, password) => {
    return new Promise((resolve) => {
        FirebaseHelper.login(email, password).then((auth) => {
            const decode = persistAuth(auth.user);
            getUserById(decode['user_id']).then(user => {
                if (user.type === 'admin') {
                    window.location = '/admin/lessons';
                } else {
                    window.location = '/student/classroom';
                }
            })
        }).catch(e => {
            resolve(false);
        });
    });
}

export const isLoggedIn = () => {
    if (!localStorage.getItem('token')) return false;
    const expires = new Date(parseInt(localStorage.getItem('expires_at')));
    return new Date() < expires;
}

export const getCurrentUser = async () => {
    const id = localStorage.getItem('user_id');
    if (!id) return;
    return await getUserById(id);
}

export const logout = () => {
    FirebaseHelper.logout();
    clearAuth();
    window.location = '/';
}

const getUserById = async (id) => {
    return new Promise((resolve) => {
        Users.where('id', '==', id).limit(1).onSnapshot(s => {
            const data = FirebaseHelper.processFireStoreCollection(s);
            if (!data || data.length === 0) resolve(undefined);
            const user = data[0];
            resolve({ ...user });
        });
    });
}
