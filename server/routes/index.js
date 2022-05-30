const Router = require('express');
const router = new Router();
const nodemailer = require('nodemailer');
const path = require('path');
const crypto = require('crypto');
const { User, EntryLink, Photo, LikedPhoto } = require('../models/models');

router.post('/auth', async (req, res, next) => {
    const { email, userName } = req.body;
    const registerUser = await User.findOne({ where: { email } });
    if (registerUser && registerUser.name !== userName) {
        return res.json({ auth: false });
    }
    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'votkinck-marsel@mail.ru',
            pass: 'wXFYRMVexfkkvfcGEP05',
        },
    });
    const randomLink = crypto.randomBytes(Math.ceil(50 / 2)).toString('hex').slice(0, 50);
    let result = await transporter.sendMail({
        from: '<votkinck-marsel@mail.ru>',
        to: `${email}`,
        subject: 'Message from Lab3',
        text: `ссылка для входа в приложение: ${randomLink}`,
        html:
            `ссылка для входа в приложение: <a href="http://localhost:3000/main/${randomLink}">${randomLink}</a>`,
    }, (err, info) => {
        if (err) console.log('Ошибка!!!!:', err);
        console.log('Nodemailer: ', info);
        return;
    });
    if (registerUser) {
        if (userName === registerUser.name) {
            return res.json({ auth: true });
        }
    }
    const user = await User.create({ name: userName, email });
    const entryLink = await EntryLink.create({ userId: user.id, link: randomLink });
    return res.json({ auth: true });
})

router.post('/check', async (req, res, next) => {
    const { link } = req.body;
    if (!link) return res.json({ checkLink: false });
    EntryLink.findOne({ where: { link } }).then(entryLink => {
        if (entryLink === null) {
            return res.json({ checkLink: false });
        } else {
            return res.json({ checkLink: true, userId: entryLink.userId });
        }
    });
})

router.post('/createPhoto', async (req, res, next) => {
    const { userId } = req.body;
    const { img } = req.files;
    const fileName = crypto.randomBytes(Math.ceil(50 / 2)).toString('hex').slice(0, 50) + '.jpg';
    img.mv(path.resolve(__dirname, '..', 'static', fileName));
    const photo = await Photo.create({ path: fileName, userId });
    return res.json(photo);
});

router.post('/like', async (req, res, next) => {
    const { userId, photoId } = req.body;
    try {

    } catch (e) {

    };
    const likedPhoto = await LikedPhoto.create({ userId, photoId });
    return res.json(likedPhoto);
});

router.get('/countLike', async (req, res, next) => {
    const { photoId } = req.query;
    const count = await LikedPhoto.count({ where: { photoId } });
    return res.json(count);
});

router.get('/getAllPhotos', async (req, res) => {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 6;
    let offset = page * limit - limit;
    const photos = await Photo.findAndCountAll({ limit, offset });
    return res.json(photos);
});

router.get('/', async (req, res, next) => {
    const link = req.query.link;
    if (link) {
        const entryLink = await EntryLink.findOne({ where: { link: link } });
        if (entryLink) {
            return res.json({ auth: true });
        } else {
            return res.json({ auth: false });
        }
    }
    return res.json('Server Work!');
})
module.exports = router;