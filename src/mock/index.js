module.exports = function (app) {
  app.get('/api/mock', (req, res) => {
    res.json({
      data: 'mock data'
    })
  })
}