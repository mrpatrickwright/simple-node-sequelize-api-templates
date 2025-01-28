const {
    createPlaylistTrack,
    getAllPlaylistTrack,
    getPlaylistTrackById,
    updatePlaylistTrack,
    deletePlaylistTrack,
} = require('../controller/playlistTrackController');


const router = require('express').Router();

router
    .route('/')
    .get( getAllPlaylistTrack)
    .post(createPlaylistTrack);

    router
    .route('/playlistId/:playlistId/trackId/:trackId')
    .get( getPlaylistTrackById)
    .patch( updatePlaylistTrack)  
    .delete( deletePlaylistTrack)

module.exports = router;