const {
    createArtist,
    getAllArtist,
    getArtistById,
    updateArtist,
    deleteArtist,
} = require('../controller/artistController');


const router = require('express').Router();

router
    .route('/')
    .get( getAllArtist)
    .post(createArtist);

    router
    .route('/:artistId')
    .get( getArtistById)
    .patch( updateArtist)  
    .delete( deleteArtist)

module.exports = router;