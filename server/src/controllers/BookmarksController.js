const { Bookmark, Song } = require('../models')
const _ = require('lodash')
module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const { songId } = req.query
      console.log(songId)
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      res.send(bookmark)
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        error: 'Error occured during fetching the bookmark'
      })
    }
  },
  async indexAll (req, res) {
    console.log('reached findAll')
    try {
      const userId = req.user.id
      // const { userId } = req.query
      const bookmarks = await Bookmark.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Song
          }
        ]
      })
        .map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend({}, bookmark.Song, bookmark))
      res.send(bookmarks)
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        error: 'Error occured during fetching All bookmarks'
      })
    }
  },
  async post (req, res) {
    // console.log('Hitting Backend endpoint')
    try {
      // console.log(req.body.params)
      const bookmark = await Bookmark.create({
        SongId: req.body.params.songId,
        UserId: req.user.id
      })
      // console.log(bookmark)
      res.send(bookmark)
    } catch (err) {
      return res.status(500).send({
        error: 'Error occured during creating bookmarks'
      })
    }
  },
  async delete (req, res) {
    try {
      const { bookmarkId } = req.params
      const bookmark = await Bookmark.findByPk(bookmarkId, {
        where: {
          UserId: req.user.id
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'not authorised to delete!'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      return res.status(500).send({
        error: 'Error occured during deeleteing bookmarks'
      })
    }
  }
}
