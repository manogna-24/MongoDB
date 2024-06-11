const express=require('express')
let mongodb=require('mongodb')
const url=require('../url')
let mcl=mongodb.MongoClient
let router = express.Router()
router.post("/",(req,res)=>{
    let obj=req.body
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection :- ', err)
        else {
            let db = conn.db('nodedb')
            db.collection('products').insertMany(obj, (err) => {
                if (err)
                    res.json({ 'insert': 'Error ' + err })
                else {
                    console.log("Data inserted")
                    res.json({ 'insert': 'success' })
                    conn.close()
                }
            })
        }
    })

})
//export router
module.exports = router

