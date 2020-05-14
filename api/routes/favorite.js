const express = require('express');
const router = express.Router();

const mysql = require('../database');



router.get('/:id',(req,res,next)=>{ 

    var id = req.params.id;
    var query = 'select * from favorite where id = "'+id+'" ;';
    mysql.query(query,(err,results,fields)=>{
        if(err){
            console.log('err : ',err);
            res.send( JSON.stringify({"err": err}));
            throw err;
        }

       res.send( JSON.stringify({"response": results}));
       return;
    });


   
});


router.post('/',(req,res,next)=>{

    res.status(200).json({
        message : 'POST request has been handled'
    });
});

module.exports  =router;