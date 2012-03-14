function DetailView() {
	
	Ti.API.info('BEGIN create DetailView');
	
	var self = Ti.UI.createView();
	
	var table = Ti.UI.createTableView();
	self.add(table);	
	
	self.addEventListener('itemSelected', 
		function(e) {
				table.data=[];	
				Ti.App.AWS.SimpleDB.select({'SelectExpression':'select * from ' + e.DomainName},
				function(response){
					var arrItems=[];
						response.selectresponse.selectresult.item.forEach(function (dItem){
						arrItems.push({title:dItem.name});        
						});
					table.data=arrItems;
				},
				function(error){ //do something about the error here
				}
			);
		}
	);
	return self;
};

module.exports = DetailView;
