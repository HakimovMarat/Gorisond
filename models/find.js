const Client = require('node-rest-client').Client
const client = new Client()

module.exports = find = (req, res) => {
  const film = req.query.find.toLowerCase()
  console.log(film)
  const args = {
    data: { film: film },
    headers: { "Content-Type": "application/json" }
  }
  client.put("http://kshisa.ru/rest/find", args, function (data) {
    const doc = []
    const finded = data.find
    let numb = 0
    for (let y = 0; y < finded.length; y++) {
      doc.push([numb++, finded[y][1], finded[y][2], finded[y][0], 'p1.jpg'])
    }
    if (doc.length < 5) {
      for (let z = (doc.length + 1); z < 6; z++) {
        doc.push(['', 'blank', '', 0, 'p1.png'])
      }
    }
    console.log(doc)
    res.json(doc)
  })
}
