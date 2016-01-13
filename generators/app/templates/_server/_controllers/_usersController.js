var encryption = require('../utilities/cripto'),
    usersData = require('../data/usersData');

module.exports = {
    getRegister: function (req, res, next) {
        if (req.user) {
            res.redirect('/');
        }

        else {
            res.render('users/register');
        }
    },
    createUser: function (req, res, next) {
        var newUserData = req.body;

        if (newUserData.password !== newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match!';
            res.redirect('/register');
        }

        else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            usersData.createUser(newUserData, function (err, user) {
                if (err) {
                    req.session.error = 'Username exists!';
                    res.redirect('/register');
                    return;
                }

                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        return res.send({reason: err.toString()});
                    }

                    else {
                        res.redirect('/');
                    }
                });
            });
        }
    },
    updateUser: function (req, res, next) {
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }

            if (updatedUserData.password !== updatedUserData.confirmPassword) {
                req.session.error = 'Passwords do not match!';
                res.redirect('/profile');
            } else {
                usersData.updateUser({_id: req.body._id}, updatedUserData, function (err, user) {
                    res.redirect('/profile');
                })
            }
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
    },
    getLogin: function (req, res, next) {
        if (req.user) {
            res.redirect('/');
        }
        else {
            res.render('users/login');
        }
    },
    getProfile: function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        } else {
            res.render('profile/profile', {currentUser: req.user, userToUpdate: req.user});
        }
    }
};