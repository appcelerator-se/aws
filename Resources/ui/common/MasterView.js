function MasterView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	var table = Ti.UI.createTableView();
	self.add(table);

	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			DomainName:e.rowData.title,
		});
	});		
	
	var arrDomains=[];
 
	Ti.App.AWS.SimpleDB.listDomains({'MaxNumberOfDomains':20},
		function(response){
			arrDomains=[];
			response.listdomainsresponse.listdomainsresult.domainname.forEach(function (sDomainName){
				var row={};
				row.title=String(sDomainName);
				row.hasChild=true;
				Ti.API.info('Adding Row - ' + sDomainName);
			
				arrDomains.push(row);
			});
			Ti.API.info('total number of domains: ' + arrDomains.length);
			table.data=arrDomains;
		},
		function(error){
			alert(error.summary);
			//error handling code here.
		}
	);
	return self;
};

module.exports = MasterView;