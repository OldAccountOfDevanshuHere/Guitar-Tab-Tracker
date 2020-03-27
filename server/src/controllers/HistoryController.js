const { History, Song } = require('../models')
const _ = require('lodash')
module.exports = {
  async get (req, res) {
    try {
      // console.log('req.params', req.params)
      // console.log('req.query', req.query)
      // console.log('req.body', req.body)
      // console.log('req', req)
      // const { userId } = req.query
      const userId = req.user.id
      console.log('userId', userId)
      const history = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Song
          }
        ],
        order: [
          ['updatedAt', 'DESC']
        ],
        limit: 4
      })
        .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Song,
          history
        ))
      console.log(_.uniq(history))
      res.send(_.uniqBy(history, history => history.SongId))
    } catch (err) {
      res.status(500).send({
        error: 'Unable to fetch History'
      })
    }
  },
  async post (req, res) {
    // console.log('req.params', req.params)
    console.log('req.body.params', req.body.params)
    // console.log('req.query', req.query)
    try {
      const userId = req.user.id
      const { songId } = req.body.params
      console.log('userId', userId)
      console.log('songId', songId)
      const history = await History.create({
        SongId: songId,
        UserId: userId
      })
      res.send(history)
    } catch (err) {
      res.status(500).send({
        error: 'Unable to create History'
      })
    }
  }
}
