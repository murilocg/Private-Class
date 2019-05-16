import FirebaseHelper from './FirebaseHelper';
import {getLessons} from './Lesson';

const collectionUser = FirebaseHelper.database.collection('user');
const collectionAvaliation = FirebaseHelper.database.collection('avaliation');

export const getUsers = async () => {
    const users = FirebaseHelper.processFireStoreCollection(await collectionUser.get());
    return users ? users : [];
}

export const getAvaliations = async () => {
    const data = FirebaseHelper.processFireStoreCollection(await collectionAvaliation.get());
    let avaliations = {};
    data.forEach(a => {
        let avaliation = avaliations[a.lesson];
        if (!avaliation) avaliation = { sum: 0, count: 0 };
        avaliation.sum = avaliation.sum + a.value;
        avaliation.count = avaliation.count + 1;
        avaliations[a.lesson] = avaliation;
    });
    Object.keys(avaliations).forEach(k => {
        let a = avaliations[k];
        avaliations[k] = a.sum / (a.count * 5);
    });
    return avaliations;
}

export const getLessonsWithAvaliation = async () => {
    const values = await Promise.all([getLessons(), getAvaliations()]);
    const lessons = values[0];
    const avaliations = values[1];
    lessons.forEach(lesson => lesson.avaliation = avaliations[lesson.id]);
    return lessons;
}

export const createUser = async (user) => {
    const u = await collectionUser.add({
        name: user.name,
        type: user.type,
        email: user.email,
        password: user.password
    });
    return u ? true : false;
}

export const updateUser = async (user) => {
    await collectionUser.doc(user.id).set({
        name: user.name,
        type: user.type,
        email: user.email,
        password: user.password
    });
    return true;
}

export const removeUser = async (user) => {
    await collectionUser.doc(user.id).delete();
    return true;
}

export const getPDF = async (name) => {
    return new Promise((resolve, reject) => {
        try {
            FirebaseHelper.storage.ref(name).getDownloadURL().then(url => {
                fetch(url).then(response => response.blob()).then(blob => {
                    const r = new FileReader();
                    r.readAsBinaryString(blob);
                    r.onloadend = () => resolve(r.result);
                });
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}