const express = require('express');
const database = require('./databasepg');
const app = express();
const port = 3000;
const url = require('url');

// var user = {"username":"test","email":"test@yahoo.com" , "password":"111"}
app.use(express.json());

const isEmailValid = function(email){
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if( emailRegexp.test(email) ){
        return true
    }
    return false
}
const makeJsonStr = function(sta = Number , mes  = [String], data = Object){
    const jsonObj = {status:sta , message:mes , data:data};
    const jsonstr = JSON.stringify(jsonObj);
    return jsonstr;

}

app.post('/signup',
    async(req , res) => {
        let data ={};
        const {email , pass1 ,pass2 ,username} = req.body;
        
        //const user = {"username":`${username}`,"email":`${email}` , "password":`${pass1}`};
        if(pass1 === undefined || pass2 === undefined){
            jsonStr = makeJsonStr('400' , ["please enter password"] , data);
            return res.status(400).send(jsonStr);

        }
        if(! (pass1 === pass2)){
            jsonStr = makeJsonStr('400' , ["confirm password error"] , data);

            return res.status(400).send(jsonStr);
            
        }
        if(! isEmailValid(email))
        {
            jsonStr = makeJsonStr('400' , ["please enter correct email"] , data);
            return res.status(400).send(jsonStr);
            
        }
        const flg = await database.isUserExist(username) ;
        if ( flg === 0 ) {
            await database.saveUser(username , email , pass1)
            jsonStr = makeJsonStr('200' , ["user saved"] , data );
            return res.status(200).send(jsonStr);
        }else {
            
            jsonStr = makeJsonStr('400' , ["user already existed"] , data);
            return res.status(400).send(jsonStr);
            
        }
        
},)

app.get('/signin' , 
async(req , res) => {
    let data = {};
    const q = url.parse(req.url, true);
        const email = q.query.email;
        const pass = q.query.password;

        if(! isEmailValid(email)){

            jsonStr = makeJsonStr('400' , ["enter correct email"] , data);
            return res.status(400).send(jsonStr);
            
            
        }
        user = await database.verifyUser(email , pass) ;
        if ( user  === undefined ){
            jsonStr = makeJsonStr('400' , ["user not find"] , data);
            return res.status(400).send(jsonStr);
           
        }else{
            data = user ;
            jsonStr = makeJsonStr('200' , ["user find"] , data);
            return res.status(200).send(jsonStr);
            
            

        }
})

app.patch('/update',
async(req , res) =>{
    
    const {password , email , username} = req.body;

    if ( username === undefined){
        jsonStr = makeJsonStr('400' , ["please enter username"] , {});
        return res.status(400).send(jsonStr);
    }

    const user = await database.isUserExist(username);
    
    if(user === false){
        jsonStr = makeJsonStr('400' , ["user not find for update"] , data);
        return res.status(400).send(jsonStr);
    }

    await database.updateUser(username , email , password);
    jsonStr = makeJsonStr('200' , ["user update sucssesfully"] , {});
    return res.status(200).send(jsonStr);

})

app.delete('/deleteUser/:username' , 
async(req , res) =>{
    const {username} = req.params;
    const user = await database.isUserExist(username);
    if(user === false){
        jsonStr = makeJsonStr('400' , ["user not find for delete"] , {});
        return res.status(400).send(jsonStr);
    }
    await database.deleteByUsername(username);
    jsonStr = makeJsonStr('200' , ["user delete sucssesfully"] , {});
    return res.status(200).send(jsonStr);

})

app.get('/getAllUsers',
async(req , res) => {
    data = await database.getAllUsers();
    jsonStr = makeJsonStr('200' , ["send all users sucssefully"] , data);
    return res.status(200).send(jsonStr);
})

app.listen(port, () => {})


