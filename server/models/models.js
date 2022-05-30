const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const EntryLink = sequelize.define('entryLink', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    link: { type: DataTypes.STRING, uniaque: true }
})

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    lastDateLogin: { type: DataTypes.DATE }
})

const Photo = sequelize.define('photo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    path: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const LikedPhoto = sequelize.define('likedphoto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dateAddLikedPhoto: { type: DataTypes.DATE }
})

const UserLikedPhoto = sequelize.define('user_likedphoto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

User.hasOne(EntryLink);
EntryLink.belongsTo(User);

User.hasMany(Photo);
Photo.belongsTo(User);

// User.hasMany(LikedPhoto);
// LikedPhoto.belongsTo(User);

Photo.hasOne(LikedPhoto);
LikedPhoto.belongsTo(Photo);

User.belongsToMany(LikedPhoto, { through: UserLikedPhoto });
LikedPhoto.belongsToMany(User, { through: UserLikedPhoto });

module.exports = {
    EntryLink,
    User,
    Photo,
    LikedPhoto,
    UserLikedPhoto
};
