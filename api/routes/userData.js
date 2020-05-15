const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'upload/');
    },
    filename :function(req,file,cb){
        cb( null,req.params.id+ '_' +file.originalname);
    }
});


const upload = multer({storage : storage});

const mysql = require('../database');




router.get('/:id',(req,res,next)=>{

    var id = req.params.id;
    var query = 'select * from users where id = "'+id+'" ;';

    console.log(query);
    mysql.query(query,(err,results,fields)=>{
        if(err){
            console.log('err : ',err);
            res.send( JSON.stringify({"err": err}));
            throw err;
        }
        
       res.send(results[0])
       return;
    });

});




router.post('/',(req,res,next)=>{

   var recorde = req.body;

   var query = 'insert into users SET ?';

   mysql.query(query,recorde,(error,results,fields)=>{

    if (error) {
        res.json({
            status : 400,
        });

        return;
    }
    
    res.json({   
    status : 200
    });


    
   });

});

router.post('/uploadimg/:id',upload.single('img'),(req,res,next)=>{


    var id = req.params.id;
    
    var query = 'update users set img = "'+req.file.path+'" where id = "'+id+'";';
    console.log(query); 

    mysql.query(query,(error,results,fields)=>{
 
     if (error) {
         res.json({
             status : 400,
         });
 
         return;
     }
     
     res.json({   
     status : 200
     });
         
    });

    
 
 });




module.exports  =router;