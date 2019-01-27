const passport = require('passport');

module.exports = app => {


    app.get('/', (req, res) => {
        res.render('index', {
            messages: req.flash()
        });
    });

    app.get('/messages', (req, res, next) => {

        Message.find().then(messages => {
            console.log(messages);
            res.render('messages.twig', {
                messages
            });
        }).catch(next);
    });

    app.post('/messages', (req, res, next) => {
        console.log(req.body);
        const message = new Message(req.body);
        message.save().then(() => {
            req.flash('success', 'Message saved');
            res.redirect('/');
        });
    });



    // route for logging out
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

};

