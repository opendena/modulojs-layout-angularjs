/*
 * GET home page.
 */

module.exports = function(server){
  server.get('/',function(req, res){
    res.render('index', { title: 'moduloJS' });
  });
};
