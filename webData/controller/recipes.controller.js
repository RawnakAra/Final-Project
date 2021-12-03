const linkedinCompanies = require('../models/company.model')

const getAllLinks = (req, res) => {
  linkedinCompanies.find({}, (err, data) => {
    if (data)
      return res.status(200).json(data)
    return res.status(400).json(err)
  })
}

const postANewLink = (req, res) => {
  const { Name, LinkedinLink, WhereDidYouFindTheData } = req.body
  let newLink = new linkedinCompanies({
    Name: Name,
    LinkedinLink: LinkedinLink,
    WhereDidYouFindTheData: WhereDidYouFindTheData
  })
  newLink.save((err, data) => {
    if (err) return res.status(404).send(err)
    return res.status(200).send(data)
  })
}

const deleteLink = (req, res) => {
  const { link } = req.params
  linkedinCompanies.findByIdAndDelete(link, (err, data) => {
    if (err) throw err
    if (data) {
      return res.status(200).send(data)
    }
    return res.status(400).json({ error: 'item not found' })
  })
}
const updateLink = (req, res) => {
  const { link } = req.params
  const { Name, Email, LinkedinLink, WhereDidYouFindTheData } = req.body
  linkedinCompanies.findByIdAndUpdate(link, { Name: Name, Email: Email, LinkedinLink: LinkedinLink, WhereDidYouFindTheData: WhereDidYouFindTheData }, { new: true, runValidators: true }, (err, data) => {
    if (err) throw err
    if (data) {
      return res.status(200).send(data)
    }
    return res.status(400).json({ error: 'item not found' })
  })
}
module.exports = {
  getAllLinks,
  postANewLink,
  deleteLink,
  updateLink
}