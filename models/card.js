const Client = require('node-rest-client').Client
const client = new Client()

module.exports = card = (req, res) => {
  console.log(req.query.code)
  const args = {
    data: { code: req.query.code },
    headers: { "Content-Type": "application/json" }
  }
  client.put("http://kshisa.ru/rest/thing", args, function (data) {
    const info = [], coun = [], genr = [], crew = []
    const shem = data.shem
    console.log(shem)
    info.push(data.film[0][0])
    let base = data.film[0][0].match(/\d+/)
    for (let x = 1; x < shem.length; x++){
      let numb = shem[x][2].match(/\d+/)
      if (shem[x][1] == 0) {
        for (y = 0; y <= numb[0]; y++) {
          if (data.film[x][y]) {
            info.push(data.film[x][y])
          }  
        }
      }
      else if (shem[x][1] == 2) {
        for (y = 0; y <= numb[0]; y++) {
          if (data.film[x][y]) {
            coun.push(data.film[x][y][1])
          }
        }
      }
      else if (shem[x][1] == 3) {
        for (y = 0; y <= numb[0]; y++) {
          if (data.film[x][y]) {
            genr.push(data.film[x][y][1])
          }
        }
      }           
      else if (shem[x][1] == 4) { 
        for (y = 0; y <= numb[0]; y++) {
          if (data.film[x][y][1]) {
            let pers = []
            if (data.film[x][y][3]) {
              pers[0] = data.film[x][y][3]
            }
            else {
              pers[0] = shem[x][5]
            }
            pers[1] = data.film[x][y][0] 
            pers[2] = data.film[x][y][2]
            crew.push(pers)
          }
        }
      }
      else if (shem[x][1] == 5) {
        for (y = 0; y <= numb[0]; y++) {
          if (data.film[x][y]) {
            info.push(data.film[x][y])
          }  
        }
      }
    }
    info.push(base)
    const doc = [info, coun, genr, crew, 'http://kshisa.ru/images/0/h.png']
    console.log(doc)
    res.json(doc)
  })
}