const {
  History,
  Song
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const { userId } = req.query
      const historys = await History.findAll({
        where: userId,
        include: [
          {
            model: Song
          }
        ]
      })
        .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Song,
          history))
      res.send(historys)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the historys.'
      })
    }
  },
  async post (req, res) {
    try {
      const { songId, userId } = req.body
      const history = await History.create({
        SongId: songId,
        UserId: userId
      })
      res.send(history)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the history object.'
      })
    }
  }
}
