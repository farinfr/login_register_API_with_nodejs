const {Client} = require('pg');
const { isUsernameUnique } = require('./database');
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1272547841",
    database: "log&reg"

})


client.connect();

const getAllUsers = async function (){
    
    try {

        const result = await client.query('SELECT * FROM users');
        return result.rows;

    } catch (error) {
        console.log(error);   
    }
}

const deleteByUsername = async function(username = String){
    try {

        const result = await client.query(`DELETE FROM users  WHERE users.username = \'${username}\'`);
        console.log(result.rows);

    } catch (error) {
        console.log(error);   
    }
    return;
}
const saveUser = async( username , email , password ) => {

    try {
        const result = await client.query(`INSERT INTO users (username , email , pass)
                                        VALUES (\'${username}\' , \'${email}\' , \'${password}\');`);
        //console.log(result.rows);

    } catch (error) {
        console.log(error);   
    }
    return;

}

const updateUser = async function( upusername , upemail , uppass){
    const dateObj = new Date();
    dateStr = JSON.stringify(dateObj);
    
    
    try {
        const result = await client.query(`UPDATE users SET  email = \'${upemail}\' , pass = \'${uppass}\', upadated_at = \'${dateStr}\' WHERE username = \'${upusername}\'` )

    } catch (error) {
        console.log(error);   
    }
    
}

const isUserExist = async function(username){

    try {
        
        const result = await client.query(`SELECT username FROM users WHERE username = \'${username}\'`);
        if (result.rows[0] ==  undefined){
            return 0;
        }
        return 1;

    } catch (error) {
        console.log(error);   
    }
    

}

const getUserByUsername=async function(username){

    try {
        
        const result = await client.query(`SELECT * FROM users WHERE username = \'${username}\'`);
        return result.rows[0];

    } catch (error) {
        console.log(error);   
    }


}

const verifyUser = async (email , pass) =>{

    
    try {
        
        const result = await client.query(`SELECT * FROM users WHERE email = \'${email}\' and pass = \'${pass}\'`);
        return result.rows[0];

    } catch (error) {
        console.log(error);   
    }

}


exports.getUserByUsername = getUserByUsername;
exports.getAllUsers = getAllUsers;
exports.deleteByUsername = deleteByUsername;
exports.updateUser = updateUser;
exports.isUserExist = isUserExist;
exports.verifyUser = verifyUser;
exports.saveUser = saveUser;
