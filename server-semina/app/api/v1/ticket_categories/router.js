const express=require('express')
const router=express()

router.get('/ticket_categories', (req,res)=>{
	res.status(200).json({message:'Halaman Ticket Categories'})
})

module.exports=router