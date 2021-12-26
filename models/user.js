const Client = require('node-rest-client').Client
const client = new Client()
/*const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.jino.ru',
  port: 465,
  secure: true,
  auth: {
      user: 'gorisond@kshisa.ru',
      pass: 'Leogama13'
    }
});
*/
module.exports = user = (req, res) => {
  console.log(req.query.name)
  console.log(req.query.mail)
  console.log(req.query.avat)
  const args = {
    data: { user: req.query.name,
            mail: req.query.mail,
            avat: req.query.avat
            },
    headers: { "Content-Type": "application/json" }
  }
  client.put("http://kshisa.ru/rest/user", args, function (data) {
    const person = [], poster = [], info = [], coun = [], genr = [], crew = [], blank = []
    const pass = data.pass
    const numb = data.numb
    const foto = data.foto
    const user = data.user
    const prop = data.data
    const love = data.love
    const shem = data.shem

    console.log(pass)
    console.log(numb)
    console.log(foto)
    console.log(user)

    person.push(numb)
    person.push(foto)

    for (let x = 1; x < 101; x++) {
      let base = prop[x][0].match(/\d+/)
      poster.push([x, prop[x][0], base[0]])
    }
    if (love) {
      for (let y = 1; y < love.length; y++) {
        if (love[y]) {
          let base = love[1][y].match(/\d+/)
          blank.push([y, love[1][y], base[0]])          
        }
      }
      if (love.length < 6) {
        for (let z = blank.length; z < 6; z++) {
          blank.push([z, 'blank', 0])
        }
      }         
    }
    else {
      for (let z = 1; z < 6; z++) {
        blank.push([z, 'blank', 0])
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
    /*
    transporter.sendMail({
      from: 'gorisond@kshisa.ru',
      to: req.query.mail,
      subject: "Password",
      text: pass
    })
    */

    const doc = [person, poster, [info, coun, genr, crew], blank, 'http://kshisa.ru/images/0/h.png']
    console.log(doc)
    res.json(doc)
  })
}