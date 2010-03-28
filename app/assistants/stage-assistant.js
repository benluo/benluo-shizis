// Shizi namespace
var Shizi = {};

// Constants
Shizi.versionString = "0.0.1";

//Shizi.context = {};
// Setup App Menu for all scenes; all menu actions handled in
Shizi.MenuAttr = {omitDefaultItems: true};
Shizi.MenuModel = {
    visible: true,
    items: [
        {label: $L("About Shizi..."), command: "do-aboutShizi"},
        Mojo.Menu.editItem,
        Mojo.Menu.helpItem
    ]
};

var Char = {};
//var chars = [];
function StageAssistant() {
};

StageAssistant.prototype.setup = function() {
//Initiate database
    var that = this;
    Shizi.Cookies.initialize();
    Shizi.Cookies.deleteCookie();
    if (! Shizi.context){
	this.db = openDatabase("charslib", 1, "Chinese Charactor Lib", 800 * 1024);
	this.db.transaction( (function (tx) {
            tx.executeSql("create table charlib (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, gr text, latin text, ch text, py text, selected boolean, ltimes integer, known boolean)",[], function (){}, function () {});
	}));
	this.db.transaction( (function (tx) {
    	    var chinese ={};
    	    for (chinese in charslib) {
    		tx.executeSql("insert into charlib (gr, latin, ch, py) values (?,?,?,?)", chinese.gr, chinese.latin, chinese.ch, chinese.py)
    	    }
    	}));
	Shizi.Cookies.context = {db: true};
    }
//Initiate database end

	that.controller.pushScene("showChar",charslib);

//    Mojo.Log.error("Shizi.context.chars outter length is ", typeof chars);
  
//    Mojo.Log.error("chars outter length is ", chars.length);
 //   this.controller.pushScene("showChar",chars);
};

StageAssistant.prototype.handleCommand = function(event) {
    if(event.type == Mojo.Event.command) {
    switch(event.command) {
        case "do-aboutShizi":
        var currentScene = this.controller.activeScene();
            currentScene.showAlertDialog({
                onChoose: function(value) {},
                title: $L("Shizi v#{version}").interpolate({
            version: Shizi.versionString}),
                message: $L("For my son Yuan Yuan. \nCopyright 2009, Ben Luo."),
                choices:[
                    {label:$L("OK"), value:""}
                ],
            });
            break;
        }
    }
};

// Deactivate - save users information
StageAssistant.prototype.deactivate = function() {
    Shizi.Cookie.storeCookie();
};