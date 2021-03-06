window.jstools = {
	getBt:function(html,appendTo){
           return $('<button/>').css({'margin':'2px'}).html(html).appendTo(appendTo);
        },    	
	getTable:function(rows,columns,appendTo){
		var tab = $('<table/>').appendTo(appendTo);
		var tds = [];
		for(let i=0; i < rows; i++){
			var row = $('<tr/>').appendTo(tab);
			tds[i] = [];
			for(let j=0; j < columns; j++) tds[i][j] = $('<td/>').appendTo(row);
		}
		return tds;
	},   
       pmTable:function( assignto, fields, postchange, power ){
        this.fields = fields;
        var texts = this.texts = [];
        var update = this.update = function(){
          for ( var i = 0; i < fields.length; i++ ){     
             texts[i].html( eval(fields[i][1]) );
          }
          if(postchange) postchange();
        }   
        var tds = jstools.getTable(fields.length,2*power+2,assignto);
        for ( let i = 0; i < fields.length; i++ ){
            let line = fields[i];
            tds[i][0].append(line[0]).css({"margin":"5px"});
            texts[i] = jstools.getBt(eval(line[1]),tds[i][1+power]).click(function() { eval(line[1]+'=0'); update(); });
          
            m = p = '';
            for ( let j = 0; j < power; j++ ){   
                m += '-';
                p += '+';
                jstools.getBt(m,tds[i][power-j]).click(function() { eval(line[1]+'=-Math.pow(10,j)+'+line[1]); update(); });
                jstools.getBt(p,tds[i][2+power+j]).click(function() { eval(line[1]+'=Math.pow(10,j)+'+line[1]);  update(); });            
            }
        }
      }			
};

function bodyelementpattern(name){
	this.name = name;
	this.display = $('<div/>');
	this.init = function() {};
}

function menu(append) {
	var option = function(parent,bodyelement) {
		var option = this;
		this.parent = parent;
		this.bodyelement = bodyelement;
		this.name = this.bodyelement.name;

		this.menubutton = $('<button/>')
			.css({ "background-color":"inherit","float":"left","border":"none","outline":"none","cursor":"pointer", "padding":"14px 16px","transition":"0.3s","font-size":"17px"})
			.html(this.name)
			.appendTo(option.parent.menu)
			.click(function() { option.parent.selectoption(option.name); } );

		this.body = $('<div/>').hide().appendTo(this.parent.body);
		this.body.append(this.bodyelement.display);

		this.select = function() {
			this.menubutton.css({"background-color":"coral"});
			this.bodyelement.init();
			this.body.show();
			return this;
		};
		this.unselect = function() {
			this.menubutton.css({"background-color":"inherit"});
			this.body.hide();
			return this
		};
	}
	this.mainwindow = $('<div/>').appendTo(append);
	this.menu = $('<div/>',{ css:{ overflow:"hidden",border:"1px solid #ccc","background-color":"#f1f1f1"} }).appendTo(this.mainwindow);
	this.body = $('<div/>').appendTo(this.mainwindow);
	this.options = [];
	this.selected = '';
	this.add = function(bodyelement)  {
		this.options[bodyelement.name] = new option(this,bodyelement);
		return this.options[bodyelement.name];
	};
	this.selectoption = function(name){
		for (var key in this.options) this.options[key].unselect();
		this.options[name].select();
		this.selected = name;
	};
	this.initit = function(){
		if (this.selected) {
			this.options[this.selected].select();
		}
	}
}
