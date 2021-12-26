const Client = require('node-rest-client').Client
const client = new Client()

module.exports = avat = (req, res) => {
  console.log('ava')
  const ava = []
  let x = 0
  const args = {
    headers: { "Content-Type": "application/json" }
  }
  client.get("http://kshisa.ru/rest/pass", args, function (data) {
    const avat = data.ava
    console.log(avat)
    avat.forEach(function(el) {
      ava[x] = ['', el, '']
      ++x
    })

    res.json(ava)
  })
}