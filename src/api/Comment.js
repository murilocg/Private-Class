import FirebaseHelper from './FirebaseHelper';

const Comments = FirebaseHelper.database.collection('comment');

export const getComments = async (lessonId) => {
    return new Promise((resolve) => {
        Comments.where('lesson', '==', lessonId).orderBy('data', 'desc').onSnapshot(s => {
            const data = FirebaseHelper.processFireStoreCollection(s);
            resolve(data ? data : []);
        });
    });
}

export const createComment = async (text, userId, username, lessonId) => {
    const u = await Comments.add({
        text: text,
        userId: userId,
        username: username,
        lesson: lessonId,
        data: new Date()
    });
    return u ? true : false;
}