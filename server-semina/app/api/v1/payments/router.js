const express= require('express')
const router=express()

router.get('/payments', (req,res)=>{
	res.status(200).json({
		message:'Halaman Payment'
	})
})

module.exports=router