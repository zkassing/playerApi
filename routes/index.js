var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


let players = [
  {
    id: 1,
    name: "张三",
    gender: 0,
    age: 19
  },
  {
    id: 2,
    name: "李四",
    gender: 1,
    age: 24
  },
  {
    id: 3,
    name: "王五",
    gender: 0,
    age: 19
  }
]

router.get('/player', (req, res, next) => {
  setTimeout(() => {
    if (Math.random() > 0.9) {
      res.send({
        code: 10001,
        message: '获取数据失败'
      })
      return 
    }

    res.send({
      code: 0,
      message: '请求成功',
      data: players
    })
    

  }, 500)
})


router.post('/player', (req, res) => {
  let { name, age, gender } = req.body
  let id = Date.now()
  let player = {
    id, name, age, gender, idCard: 1346313543, tel: 1345646125
  }



  setTimeout(() => {
    if (Math.random() > 0.2) {
      res.send({
        code: 10002,
        message: '添加选手失败'
      })
      return
    }
    players.unshift(player)

    res.send({
      code: 0,
      message: "请求成功",
      data: player
    })
  }, 500)
})

router.patch('/player/:id', (req, res) => {
  let id = req.params.id
  let data = req.body

  setTimeout(() => {
    if (Math.random() > 0.5) {
      res.send({
        code: 10003,
        message: "编辑失败"
      })
      return 
    }

    let player = players.find(p => p.id === id)
    player = {
      ...player, 
      ...data
    }
    res.send({
      code: 0,
      message: '请求成功',
      data: player
    })
  }, 500)
})

router.delete('/player/:id', (req, res) => {
  let {id} = req.params

  let index = players.findIndex(p => p.id === id)

  players.splice(index, 1)

  setTimeout(() => {
    if (Math.random() > 0.5) {
      res.send({
        code: 10004,
        message: '删除选手失败'
      })
      return 
    }
    res.send({
      code: 0,
      message: "请求成功",
      data: '删除成功'
    })

  }, 500)
  
})

module.exports = router;
