import slackin from '../lib/';
import {token, org} from './config';
import en from '../lib/locale/en';
import dom from 'vd';

describe('Slackin instance test', () => {
    
  slackin({ token: token, org: org, silent: true, langs: { en : en } }).listen(3000, (err) => {
    if(err) throw err;
  });
  
  it("Test request response.statudCode equals 200", (done) => {
    setTimeout(function(){
      var req = require('request');
      req("http://localhost:3000/", (err, response, body) => {
        if(err) throw err;
        if(response.statusCode != 200) {
          throw new Error("status code: "+ response.statusCode);
        }
        done();
      });
    }, 1000);
  });

  it("Test request response body has the correct html", (done) => {
    setTimeout(function(){
      let req = require('request');
      req("http://localhost:3000/", (err, response, body) => {
        if(err) throw err;
        if(response.statusCode != 200) {
          throw new Error("status code: "+ response.statusCode);
        }
        // compare response in lower case because some text has css text-transform
        let body = response.body.toLowerCase();
        let joinText = dom("p", en.join(org)).toHTML().toLowerCase();
        if(body.indexOf(joinText) == -1) {
          throw new Error("response body doesnt has the correct html");
        }
        done();
      });
    }, 1000);
  });


});
