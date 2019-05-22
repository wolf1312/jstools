window.jstools = {
		
	getTable:function(rows,columns,appendTo){
		var tab = $('<table/>').appendTo(appendTo);
		var tds = [];
		for(let i=0; i < rows; i++){
			var row = $('<tr/>').appendTo(tab);
			tds[i] = [];
			for(let j=0; j < columns; j++) tds[i][j] = $('<td/>').appendTo(row);
		}
		return tds;
	}   
		
};
