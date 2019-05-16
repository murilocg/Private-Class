import FirebaseHelper from './FirebaseHelper';

const clearAuth = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('type');
}

const persistAuth = (user) => {
    localStorage.setItem('id', user.id);
    localStorage.setItem('email', user.email);
    localStorage.setItem('name', user.name);
    localStorage.setItem('type', user.type);
}

const Users = FirebaseHelper.database.collection('user');

export const login = async (email, password) => {
    const user = await getUser(email, password);
    if(user) {
        persistAuth(user);
        return user;
    }else{
        return undefined;
    }   
}

export const isLoggedIn = () => {
    if (!localStorage.getItem('id')) return false;
    if (!localStorage.getItem('name')) return false;
    if (!localStorage.getItem('email')) return false;
    if (!localStorage.getItem('type')) return false;
    return true;
}

export const getCurrentUser = async () => {
    const id = localStorage.getItem('id');
    if (!id) return;
    return {
        id: Number(localStorage.getItem('id')),
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        type: localStorage.getItem('type')
    };
}

export const logout = () => {
    clearAuth();
    window.location.replace('/');
}

const getUser= async (email, password) => {
    return new Promise((resolve) => {
        Users.where('email', '==', email).where('password', '==', password).limit(1).onSnapshot(s => {
            const data = FirebaseHelper.processFireStoreCollection(s);
            if (!data || data.length === 0) resolve(undefined);
            const user = data[0];
            resolve({ ...user });
        });
    });
}
