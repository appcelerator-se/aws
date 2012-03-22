windowFunctions['List Domains'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

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
	
    win.open();
    
};