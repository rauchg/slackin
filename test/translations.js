// checks translations prototypes
describe("translations test ->", () => {
  var normalizedPath = require("path").join(__dirname, "../lib/locale");
  require("fs").readdirSync(normalizedPath).forEach(function(file) {
    it("testing "+file+" prototype", (done) => {
      var locale = require("../lib/locale/" + file).default;
      if(locale.locale == undefined) 
        throw new Error("Locale.locale is not defined");
      if(typeof locale.locale != "string")
        throw new Error("Locale.locale type mismtach, .locale should be a string");
      
      if(locale.meta == undefined) 
        throw new Error("Locale.meta is not defined");
      if(typeof locale.meta != "function") 
        throw new Error("Locale.meta type mismtach, .meta should be a function");
      if(!(locale.meta() instanceof Array))
        throw new Error("Locale.meta return type mismatch, should return an array");
      
      if(locale.title == undefined)
        throw new Error("Locale.title is not defined")
      if(typeof locale.title != "function")
        throw new Error("Locale.title type mismtach, .title should be a function");
      if(typeof locale.title("slackin") != "string")
        throw new Error("Locale.title return type mismatch, should return a string");
      
      if(locale.join == undefined)
        throw new Error("Locale.join is not defined");
      if(typeof locale.join != "function")
        throw new Error("Locale.join type mismtach, .join must be a function");
      if(!(locale.join("slackin") instanceof Array))
       throw new Error("Locale.join return type mismatch, should return an array");  
      
      if(locale.coc == undefined)
        throw new Error("Locale.coc is not defined");
      if(typeof locale.coc != "function")
        throw new Error("Locale.coc type mismtach, .coc must be a function");
      if(!(locale.coc("http://coc.aggre") instanceof Array))
       throw new Error("Locale.coc return type mismatch, should return an array");
      
      if(locale.state == undefined)
        throw new Error("Locale.state is not defined");
      if(typeof locale.state != "function")
        throw new Error("Locale.state type mismtach, .state must be a function");
      if(!(locale.state(0,0) instanceof Array))
        throw new Error("Locale.state return type mismatch, should return an array");
      
      if(locale.getinvite == undefined)
        throw new Error("Locale.getinvite is not defined");
      if(typeof locale.getinvite != "function")
        throw new Error("Locale.getinvite type mismtach, .getinvite must be a function");
      if(!(locale.getinvite() instanceof Array))
        throw new Error("Locale.getinvite return type mismatch, should return an array");
      
      if(locale.signin == undefined)
        throw new Error("Locale.signin is not defined");
      if(typeof locale.signin != "function")
        throw new Error("Locale.signin type mismtach, .signin must be a function");
      if(!(locale.signin("slackin") instanceof Array))
        throw new Error("Locale.signin return type mismatch, should return an array");
      
      if(locale.channelNotFound == undefined)
        throw new Error("Locale.channelNotFound is not defined");
      if(typeof locale.channelNotFound != "function")
        throw new Error("Locale.channelNotFound type mismtach, .channelNotFound must be a function");
      if(typeof locale.channelNotFound("slackin") != "string")
        throw new Error("Locale.channelNotFound return type mismatch, should return an string");
      
      if(locale.powered == undefined)
        throw new Error("Locale.powered is not defined");
      if(typeof locale.powered != "string")
        throw new Error("Locale.powered type mismtach, .powered must be a string");
      
      if(locale["not_a_permitted_channel"] == undefined)
        throw new Error('Locale["not_a_permitted_channel"] is not defined');
      if(typeof locale["not_a_permitted_channel"] != "string")
        throw new Error('Locale["not_a_permitted_channel"] type mismtach, .not_a_permitted_channel must be a string');
      
      if(locale["no_email_provided"] == undefined)
        throw new Error('Locale["no_email_provided"] is not defined');
      if(typeof locale["no_email_provided"] != "string")
        throw new Error('Locale["no_email_provided"] type mismtach, .no_email_provided must be a string');
      
      if(locale["invalid_email"] == undefined)
        throw new Error('Locale["invalid_email"] is not defined');
      if(typeof locale["invalid_email"] != "string")
        throw new Error('Locale["invalid_email"] type mismtach, .invalid_email must be a string');
      
      if(locale["mandatory_coc"] == undefined)
        throw new Error('Locale["mandatory_coc"] is not defined');
      if(typeof locale["mandatory_coc"] != "string")
        throw new Error('Locale["mandatory_coc"] type mismtach, .mandatory_coc must be a string');
      
      if(locale["woot"] == undefined)
        throw new Error('Locale["woot"] is not defined');
      if(typeof locale["woot"] != "string")
        throw new Error('Locale["woot"] type mismtach, .woot must be a string');
      
      done();
    });
  });
});
