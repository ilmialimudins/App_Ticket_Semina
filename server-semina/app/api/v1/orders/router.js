const express= require('express')
const router= express()

router.get('/orders', (req,res)=>{
	res.status(200).json({
		message:'Halaman Order'
	})
})

module.exports=router