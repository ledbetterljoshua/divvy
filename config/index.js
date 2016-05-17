var configValues = require('./config');

module.exports = {
    
    getDbConnectionString: function() {
        return 'mongodb://jledbetter:thedivvydbpassword@ds011902.mlab.com:11902/divvy';
    }
    
}