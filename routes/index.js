module.exports=function(app){
    app.get('/room', function(req, res) {
        if(req.session.user==null){
            res.redirect('/');
        }
        else{
            res.render('room', {
                title: '主页',
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        }
    });

    app.post('/room', function(req, res) {
        req.session.user=null;
        req.flash('success', '登出成功!');
        res.redirect('/');
    });

    app.get('/', function(req, res) {
        if(req.session.user!=null){
            res.redirect('/room');
        }
        else{
            res.render('dollars', {
                title: '主页',
                user: null,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        }
    });

    app.post('/', function(req, res) {
        req.session.user=req.body.name;
        req.flash('success', '登入成功!');
        res.redirect('/room');
        res.render('room', {
            title: '主页',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
}