const handleRegister = (req,res,db,bcrypt) => {
    const {email, name, password} = req.body;
    if(!email || !name || !password) {
        return res.status(400).json('Incorrect form submission')
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            db.transaction(trx => {
                trx.insert({
                    hash:hash,
                    email:email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user=> {
                        res.json(user[0])
                    })
                })
                .then(trx.commit)
                .catch(err=>{
                    trx.rollback;
                    res.status(400).json("Unable to register, please use antother name or email because something like that already exists");
                })
            })
        })
    })   
}

module.exports = {handleRegister};