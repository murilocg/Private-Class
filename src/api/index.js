import FirebaseHelper from './FirebaseHelper';

const collectionClass = FirebaseHelper.database.collection('Class');

const getLessons = async (callback) => {
    try {
        collectionClass.get().then(s => {
            const data = FirebaseHelper.processFireStoreCollection(s);
            callback(data ? data : []);
        });
    } catch (e) {
        console.log(e);
        callback([]);
    };
}

const getPDF = async (name, callback) => {
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


export default {
    getLessons,
    getPDF
}