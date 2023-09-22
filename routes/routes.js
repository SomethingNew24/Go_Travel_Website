const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');







router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({ success: false, message: "Hash Error!" })
        }
        else {
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
            });

            user.save()
                .then(() => {
                    res.json({ success: true, message: "Account has been created" })
                })
                .catch((err) => {
                    if (err.code === 11000) {
                        return res.json({ success: false, message: "Email already exsits" })
                    }
                    res.json({ success: false, message: "Authentication Failed!" })
                })



        }

    })


});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                // User not found
                return res.json({ success: false, message: "Invalid email or password" });
            }

            // Compare the provided password with the hashed password in the database
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.json({ success: false, message: "Authentication Failed!" });
                }

                if (!isMatch) {
                    // Passwords don't match
                    return res.json({ success: false, message: "Invalid email or password" });
                }

                // Passwords match, user is authenticated
                res.json({ success: true, message: "Logged in successfully" });
            });
        })
        .catch((err) => {
            console.error(err);
            res.json({ success: false, message: "Authentication Failed!" });
        });
});



module.exports = router;