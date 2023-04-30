const express= require('express')
const { route } = require('../categories/router')
const router=express()

router.get('/participants', (req,res)=>{
	res.status(200).json({
		message:'Halaman participants'
	})
})

module.exports=router