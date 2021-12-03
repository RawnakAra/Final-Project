const express = require('express')
const router = express.Router()
const companyController = require('../controllers/company.controller')
router.get('/', (req, res) => {
    companyController.getAllLinks(req, res)
})

router.post('/', (req, res) => {
    companyController.postANewLink(req, res)
})

router.delete('/delete/:link', (req, res) => {
    companyController.deleteLink(req, res)
})

router.put('/update/:link', (req, res) => {
    companyController.updateLink(req, res)
})

module.exports = router