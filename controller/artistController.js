
const sequelize = require('../config/database');
var initModels = require("../db/models/init-models");
models = initModels(sequelize);

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


const getAllArtist = catchAsync(async (req, res, next) => {
    const result = await models.Artist.findAll();

    return res.json({
        status: 'success',
        data: result,
    });
});

const getArtistById = catchAsync(async (req, res, next) => {
    const artistId = req.params.artistId;
    const result = await models.Artist.findByPk(artistId);
    if (!result) {
        return next(new AppError('Invalid artist id', 400));
    }
    return res.json({
        status: 'success',
        data: result,
    });
});

const updateArtist = catchAsync(async (req, res, next) => {
    const artistId = req.params.artistId;
    const body = req.body;

    const result = await models.Artist.findOne({
        where: { artistId: artistId },
    });

    if (!result) {
        return next(new AppError('Invalid artist id', 400));
    }

    result.name = body.name;

    const updatedResult = await result.save();

    return res.json({
        status: 'success',
        data: updatedResult,
    });
});

const deleteArtist = catchAsync(async (req, res, next) => {
    const artistId = req.params.artistId;

    const result = await models.Artist.findOne({
        where: { artistId: artistId },
    });

    if (!result) {
        return next(new AppError('Invalid artistId', 400));
    }

    await result.destroy();

    return res.json({
        status: 'success',
        message: 'Record deleted successfully',
    });
});

const createArtist = catchAsync(async (req, res, next) => {
    const body = req.body;

    const newArtist = await models.Artist.create({
        artistId: body.artistId,
        name: body.name,

    });

    return res.status(201).json({
        status: 'success',
        data: newArtist,
    });
});
module.exports = {
    getAllArtist,
    getArtistById,
    updateArtist,
    createArtist,
    deleteArtist
}