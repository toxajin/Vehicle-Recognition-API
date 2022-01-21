const handleSignin = (db,bcrypt)=> (req, res)  => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json('Incorrect form submission')
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(user => {
        if(user.length){
            bcrypt.compare(req.body.password,user[0].hash, function(err, res1) {
                if(res1) {
                    db.select('*').from('users')
                        .where('email', '=', email)
                        .then(user => {
                            res.json(user[0])
                        })
                        .catch(err => res.status(400).json("Can't get user"))
                } else {
                    res.status(400).json('Wrong email or password');
                }
            })
        }
        else {
            res.status(400).json('Wrong email or password');
        }
    })
}

module.exports = {handleSignin};