const Client = require('node-rest-client').Client
const client = new Client()

module.exports = pass = (req, res) => {
     
  const args = {
    data: { pass: req.query.pass },
    headers: { "Content-Type": "application/json" }
  }
  client.put("http://kshisa.ru/rest/pass", args, function (data) {
    const foto = data.foto
    const numb = data.numb
    const user = data.user
    const person = [], poster = [], blank = [], info = [], coun = [], genr = [], crew = []
    person.push(numb)
    person.push(foto)
    person.push(user)
    const prop = data.data
    const love = data.love
    const shem = data.shem

    for (let x = 1; x < 101; x++) {
      let base = prop[x][0].match(/\d+/)
      poster.push([x, prop[x][0], base[0], 'p1.jpg'])
    }

    if (love) {
      for (let y = 0; y <= love[1].length; y++) {
        if (love[1][y]) {
          let base = love[1][y].match(/\d+/)
          blank.push([y, love[1][y], base[0], 'p1.jpg'])          
        }
      }
      if (love.length < 6) {
        for (let z = blank.length; z < 6; z++) {
          blank.push([z, 'blank', 0, 'p1.png'])
        }
      }         
    }
    else {
      for (let z = 1; z < 6; z++) {
        blank.push([z, 'blank', 0, 'p1.png'])
      }
    }

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
    const doc = [person, poster, [info, coun, genr, crew], blank, 'http://kshisa.ru/images/0/h.png']

    res.json(doc)
  })
}
