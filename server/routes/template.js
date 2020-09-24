const express = require('express')
const Template = require('../model/template')
const router = express.Router()

// REST template APIs
router.get('/template', async (req, res) => {
  const temps = await Template.find({}).sort({ update_at: -1 })
  res.$success(temps)
})

router.post('/template', async (req, res) => {
  try {
    // req.body
    const temp = await Template.create(req.body)
    res.$success(temp)
  } catch (e) {
    res.$error(e)
  }
})

router.get('/template/:id', async (req, res) => {
  const temp = await Template.findById({ _id: req.params.id })
  if (temp) {
    res.$success(temp)
  } else {
    res.$success({}, 400)
  }
})

router.put('/template/:id', async (req, res) => {
  const temp = await Template.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  )
  if (temp) {
    res.$success(temp)
  } else {
    res.$error('更新失败！')
  }
})

router.delete('/template/:id', async (req, res) => {
  try {
    await Template.findByIdAndRemove({ _id: req.params.id })
    res.$success('删除成功')
  } catch (e) {
    res.$error(e, 400)
  }
})

module.exports = router
