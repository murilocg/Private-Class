import FirebaseHelper from './FirebaseHelper';

const collectionClass = FirebaseHelper.database.collection('Class');
const collectionAvaliation = FirebaseHelper.database.collection('Avaliation');

export const getLessons = async () => {
    const data = FirebaseHelper.processFireStoreCollection(await collectionClass.get());
    return data ? data : [];
}

export const getAvaliation = async (lessonId, userId) => {
    return new Promise((resolve) => {
        collectionAvaliation.where('lesson', '==', lessonId).where('user', '==', userId).onSnapshot(s => {
            const data = FirebaseHelper.processFireStoreCollection(s);
            resolve(data ? data[0] : undefined);
        });
    });
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

export const createLesson = async (lesson) => {
    const promiseFile = uploadFile(lesson.material, lesson.file);
    const promiseLesson = collectionClass.add({
        title: lesson.title,
        video: lesson.video,
        pdfName: lesson.material
    });
    const values = await Promise.all([promiseFile, promiseLesson]);
    return values[0] && values[1] ? true : false;
}

export const removeLesson = async (lesson) => {
    await collectionClass.doc(lesson.id).delete();
    await removeFile(lesson.pdfName);
    return true;
}

export const saveAvaliation = async (avaliation, value, lesson, user) => {
    if(avaliation){
        await collectionAvaliation.doc(avaliation).set({
            lesson, value, user
        })
    }else{
        await collectionAvaliation.add({ lesson, user, value});
    }
    return true;
}

const removeFile = async (name) => {
    await FirebaseHelper.storage.ref('/' + name).delete();
    return true;
}

const uploadFile = async (name, file) => {
    return new Promise(resolve => {
        const uploader = FirebaseHelper.storage.ref('/' + name).put(file);
        uploader.on('state_changed', () => { }, () => {
            resolve(undefined);
        }, () => {
            resolve(uploader.snapshot.ref.name);
        });
    });
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