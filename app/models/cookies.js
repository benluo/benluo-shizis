//For storing context information

Shizi.Cookies = ({
    initialize: function(){
    // get context
    this.cookieData = new Mojo.Model.Cookie("context");
    var context = this.cookieData.get();
    if (context) 
        Shizi.context = context.context;
    else 
        Shizi.context = {};
    },

    // store - context
    storeCookie: function(){
    	this.cookieData.put({
    		context: Shizi.context,
    	});
    },

    deleteCookie: function(){
	this.cookieData.remove("context");
    }
})