const { Song } = require('../models')
const db = require('../models')
module.exports = {
  async index (req, res) {
    try {
      const Op = db.Sequelize.Op
      let songs = null
      const search = req.query.search
      if (search) {
        songs = await Song.findAll({
          where: {
            [Op.or]: [
              'title', 'artist', 'genre', 'album'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        songs = await Song.findAll({
          limit: 10
        })
      }
      res.send(songs)
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        error: 'Error occured during fetching songs'
      })
    }
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      return res.status(500).send({
        error: 'Error occured during creating songs'
      })
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findByPk(req.params.songId)
      res.send(song)
    } catch (err) {
      return res.status(500).send({
        error: 'Sorry song not found'
      })
    }
  },
  async put (req, res) {
    try {
      const songId = req.body.id
      const song = req.body
      console.log(req.params)
      console.log(req.body)
      await Song.update(song, {
        where: {
          id: songId
        }
      })
      res.send(req.body)
    } catch (err) {
      return res.status(500).send({
        error: 'Sorry was not updated'
      })
    }
  }
}
