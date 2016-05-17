var URl = require('../../models/urlModel');

module.exports = function(app, router, bodyParser, request, cheerio) {
    
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  router.get('/url/', function(req, res) {
    console.log(req.query.u)
    URl.find({url: req.query.u}, function(err, url){
      console.log(url)
      if (url.length === 0) {
        //crawl webpage, 
        request(req.query.u, function(error, response, html){
            // First we'll check to make sure no errors occurred when making the request
            if(!error){
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
                var $ = cheerio.load(html);
                // Finally, we'll define the variables we're going to capture
                var title, image, desc;
                var item = { title : "", image : "", desc : ""};

                item.title = $('title').text();
                item.desc = $('meta[name="description"]').attr('content');

                var image1 = $('meta[property="og:image"]').attr('content');
                var image2 = $('meta[itemprop="image"]').attr('content');
                for(var i = 0; i < $('img').length; i++) {
                  if($('img')[i].width > 300 && $('img')[i].height > 300) {
                    var image3 = $('img')[i].getAttribute('src');
                  }
                }

                if(image1) {
                  item.image = image1;
                } else if(image2) {
                  item.image = image2;
                } else if(image3) {
                  item.image = image3;
                } else {
                  item.image = "http://support.yumpu.com/en/wp-content/themes/qaengine/img/default-thumbnail.jpg";
                }

                //create url model 
                var newUrl = URl({
                    url: req.query.u, 
                    image: item.image, 
                    desc: item.desc,
                    title: item.title
                 });
                 newUrl.save(function(err) {
                     if (err) {res.send(err)};
                     //send data
                     res.send(newUrl);
                 });

            }
        })
      } else {
        //send data
        res.send(url);
      }
    });
  });

}