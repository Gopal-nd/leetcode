
import express from 'express'
import { adminAuth, userAuth } from '../middleware/auth.middleware'
import { addProblemToPlaylist, createPlaylist, deletePlaylistById, getAllPlaylists, getPlaylsitById, removeProblemFromPlaylist } from '../controllers/playlist.controler'

const router = express.Router()

router.get('/',  userAuth, getAllPlaylists)

router.get('/:id', userAuth, getPlaylsitById)

router.post('/create-playlist', userAuth, createPlaylist)

router.post('/:id/add-problem', userAuth, addProblemToPlaylist)

router.delete('/:id', userAuth, deletePlaylistById)

router.post('/:id/remove-problem', userAuth, removeProblemFromPlaylist)

export default router