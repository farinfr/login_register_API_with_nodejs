// file system module to perform file operations
const exp = require('constants');
const fs = require('fs');
const path = require('path');
const internal = require('stream');
 

const data = {
    "persons":[
        {"username":"test","email":"test@yahoo.com" , "password":"111"}
        
    ]
}


const isUsernameUnique = (user) => {

    for (i in [...Array(data.persons.length).keys()]){
        if(user.username == data.persons[i].username)
            return false;
    }    
    return true

}

const saveUser = ( user ) => {

    data.persons.push(user); 
}

const saveDataInJson = function(data){}

const verifyUser = (email , pass) =>{
    
    for (i in [...Array(data.persons.length).keys()]){

        if(email == data.persons[i].email & pass == data.persons[i].password){
            return data.persons[i]
        }
       
    }   
    
    return false
}

const makeJsonStr = function(sta = Number , mes  = [String], data = Object){
    const jsonobj = {status:sta , message:mes , data:data};
    const jsonstr = JSON.stringify(jsonobj);
    return jsonstr;

}

const isUserExist = function(username){


    for (i in [...Array(data.persons.length).keys()]){

        if(username == data.persons[i].username){
            return true;
        }
       
    }   
    
    return false;

}

const updateUser = function( upusername , upemail , uppass){

    for (i in [...Array(data.persons.length).keys()]) {

        if(upusername == data.persons[i].username){

            if(!(upemail == undefined)){
                data.persons[i].email = upemail;
            }
            if(!(uppass == undefined)){
                data.persons[i].password = uppass;
            }
            return data.persons[i];
        }
    }    
}

const deleteByUsername = function(username){
   
    data.persons = data.persons.filter((user)=> user.username !== username )

}
const getAllUsers = function(){
    return data;
}

const getUserByUsername=function(username){

    for (i in [...Array(data.persons.length).keys()]) {
        if(username == data.persons[i].username){
            return data.persons[i];

        }
    }
    return undefined;

}

exports.getUserByUsername = getUserByUsername;
exports.getAllUsers = getAllUsers;
exports.deleteByUsername = deleteByUsername;
exports.updateUser = updateUser;
exports.isUserExist = isUserExist;
exports.verifyUser = verifyUser;
exports.isUsernameUnique = isUsernameUnique;
exports.saveUser = saveUser;

