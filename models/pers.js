const Client = require('node-rest-client').Client
const client = new Client()

module.exports = card = (req, res) => {

  const args = {
    data: { code: req.query.code },
    headers: { "Content-Type": "application/json" }
  }
  client.put("https://kshisa.ru/rest/pers", args, function (data) {
    const year1 = data.year1, year2 = data.year2, name1 = data.name1
    const films = data.films
    
    const poster = []
    for (let x = 0; x < films.length; x++) {
      let base = films[x][0].match(/\d+/)
      poster.push([x + 1, films[x][0], films[x][1], base[0], 'p1.jpg'])
    }
    if (poster.length < 5) {
      for (let z = (poster.length + 1); z < 6; z++) {
        poster.push(['', 'blank', '', 0, 'p1.png'])
      }
    }
    const doc = [year1, year2, name1, poster]
    console.log(doc)
    
    res.json(doc)
  })
}