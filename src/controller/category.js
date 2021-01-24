const slugify = require('slugify')
const Category = require('../models/category')

const createCategory = (categories, parentId = null) => {
    const categoryList = []
    let category
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }
    for (let cate of category){
        categoryList.push({
            _id:cate._id,
            name:cate.name,
            slug:cate.slug,
            children:createCategory(categories,cate._id)
        })
    }return categoryList
}

module.exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
        parentId: req.body.parentId ? req.body.parentId : undefined
    }
    const cat = new Category(categoryObj)
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error })
        if (category) return res.status(200).json({ category })
    })
}

module.exports.getCategory = (req, res) => {
    Category.find().exec((error, categories) => {
        if (error) return res.status(400).json({ error })
        if (categories) {
            const categorylist = createCategory(categories)

            return res.status(200).json({ categorylist })
        }
    })
}