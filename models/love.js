const Client = require('node-rest-client').Client
const client = new Client()

module.exports = avat = (req, res) => {
  const love = req.query.love
  const user = req.query.user
  
  const args = {
    data: { love: love,
            user: user
            },
    headers: { "Content-Type": "application/json" }
  }
  client.put("http://kshisa.ru/rest/mash", args, function (data) {
    const numb = data.numb
    const user = data.user
    const love = data.love
    const prop = data.prop
    const news = data.news
    console.log(numb)
    console.log(user)
    const blank = []
    const prope = []
    let base = love[numb - 1].match(/\d+/)
    blank.push([numb, love[numb - 1], base[0]])
    
    if (numb < 6) {
      for (let z = numb + 1; z < 6; z++) {
        blank.push([z, 'blank', 0])
      }
    }    
    for (let y = 0; y < numb - 1; y++) {
      base = love[y].match(/\d+/)
      blank.push([y + 1, love[y], base[0]])
    }    
    base = prop[news][0].match(/\d+/)
    prope.push([news, prop[news][0], base[0]])

    for (let y = news + 1; y < prop.length; y++) {
      base = prop[y][0].match(/\d+/)
      prope.push([y, prop[y][0], base[0]])
      
    }
    if (news != 1) {
      for (let y = 1; y < news; y++) {
        base = prop[y][0].match(/\d+/)
        prope.push([y, prop[y][0], base[0]])
      }      
    }

    res.json([blank, user, prope])
  })
}