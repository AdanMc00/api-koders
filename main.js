
const express = require('express');
const app = express();
const koders = require('./koders.js')
console.log(koders)
app.use(express.json())

app.delete('/koders/:id', (request, response) => {
  try{
    const {
      id: koderId
    } = request.params
    const koderIndex = koders.findIndex((koder) => koder.id === parseInt(koderId))
    koders.splice(koderIndex, 1)
    response.json({
      success: true,
      data: {
        koders
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      message: error.message,
      error
    })
  }
})

app.post('/koders', (request, response) => {
  try {
    const koder = request.body
    if (!koder.name) throw new Error('Name is required')
    koders.push(koder)
    response.json({
      success: true,
      message: 'KOder Create',
      data: {
        koder
      }
    })
  } catch (error) {

  }
})

app.get('/koders', (request, response) => {
  const {
    name
  } = request.query
  response.json(koders)
})

app.get('/koders/name/:name', (request, response) => {

  const {
    name: koderName
  } = request.params
  const koder = koders.filter((koder) => koders.name === koderName)
  response.json({
    succes: true,
    data: {
      koder
    }

  })
})

app.get('/koders/:id', (request, response) => {
  const {
    id: koderId
  } = request.params
  const koder = koders.find((koder) => koders.id === parseInt(koderId))
  response.json({
    succes: true,
    daata: {
      koder
    }
  })
})

app.listen(8080, () => {
  // console.log('Example app listening on port 8080!');
});