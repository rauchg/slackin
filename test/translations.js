// checks translations prototypes
describe("translations test ->", () => {

    var normalizedPath = require("path").join(__dirname, "../lib/locale");
    require("fs").readdirSync(normalizedPath).forEach(function(file) {

      it("testing "+file+" prototype", (done) => {
        var locale = require("../node/locale/" + file);
        if(locale.join == undefined) {
          throw new Error("join is not defined");
        }
        if(typeof locale.join != "function") {
          throw new Error("join type mismtach, join must be a function");
        }

        if(locale.state == undefined) {
          throw new Error("state is not defined");
        }
        if(typeof locale.state != "function") {
          throw new Error("state type mismtach, state must be a function");
        }

        if(locale.getinvite == undefined) {
          throw new Error("get invite is not defined");
        }
        if(typeof locale.getinvite != "function") {
          throw new Error("getinvite type mismtach, getinvite must be a function");
        }

        if(locale.powered == undefined) {
          throw new Error("powered is not defined");
        }
        if(typeof locale.powered != "function") {
          throw new Error("powered type mismtach, powered must be a function");
        }

        done();
      });
    });
});
