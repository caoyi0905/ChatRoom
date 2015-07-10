/**
 * Created by caoyi on 2015/7/10.
 */

module.exports=function(app){
    app.get('/room', function(req, res) {
            res.render('index', {
                title: '主页',
                user: '2333',
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
    });
    function checkLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '未登录!');
            res.redirect('/login');
        }
        next();
    }

    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录!');
            res.redirect('back');
        }
        next();
    }
}