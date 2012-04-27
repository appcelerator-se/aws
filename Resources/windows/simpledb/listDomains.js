windowFunctions['ListDomains'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.listDomains({'MaxNumberOfDomains':20},
		function(response){
		/*	arrDomains=[];
			response.listdomainsresponse.listdomainsresult.domainname.forEach(function (sDomainName){
				var row={};
				row.title=String(sDomainName);
				row.hasChild=true;
				Ti.API.info('Adding Row - ' + sDomainName);
			
				arrDomains.push(row);
			});*/
			Ti.API.info('total number of domains: ' + response);
			//table.data=arrDomains;
		},
		function(error){
			alert(error.summary);
			//error handling code here.
		}
	);
	
    win.open();
    };
    
windowFunctions['ListDomainWithInvalidParams'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.listDomains({'MaxNumberOfDomains':999},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
        
windowFunctions['CreateDomain'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.createDomain({'DomainName':'pankaj1'},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
    
windowFunctions['CreateEmptyDomain'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.createDomain({'DomainName':''},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
    
windowFunctions['CreateInValidDomain'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.createDomain({'DomainName':'pankaj@gl'},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
    
windowFunctions['DeleteDomain'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.deleteDomain({'DomainName':'pankaj1'},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
    
windowFunctions['DeleteEmptyDomain'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.deleteDomain({'DomainName':''},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
    
windowFunctions['DeleteInvalidDomain'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.deleteDomain({'DomainName':'sdhvjksdhvjdghjrtg'},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
    
windowFunctions['BatchDeleteAttributesEmptyItemName'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.batchDeleteAttributes({'DomainName':'pankaj1','Item.*.ItemName':''},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
    
windowFunctions['BatchDeleteAttributesInvalidItemName'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.batchDeleteAttributes({'DomainName':'pankaj1','Item.*.ItemName':'InvalidItem','Item.*.Attribute.*.Value':'panki'},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
    
windowFunctions['BatchDeleteAttributesEmptyAttributes'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.batchDeleteAttributes({'DomainName':'pankaj1','Item.*.ItemName':'panku','Item.*.Attribute.*.Value':''},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
    
windowFunctions['BatchDeleteAttributesInvalidAttributesName'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.batchDeleteAttributes({'DomainName':'pankaj1','Item.*.ItemName':'panku','Item.*.Attribute.*.Name':'InvalidAttributeName'},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
    
    
    windowFunctions['BatchDeleteAttributesInvalidAttributesValue'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.batchDeleteAttributes({'DomainName':'pankaj1','Item.*.ItemName':'panku','Item.*.Attribute.*.Value':'invalidAttributeValue'},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
    
windowFunctions['BatchDeleteAttributesEmptyDomainName'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.batchDeleteAttributes({'DomainName':'','Item.*.ItemName':'panku','Item.*.Attribute.*.Value':'invalidAttributeValue'},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
    
windowFunctions['BatchDeleteAttributesInvalidDomain'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.batchDeleteAttributes({'DomainName':'pankaj@gl','Item.*.ItemName':'panku','Item.*.Attribute.*.Value':'invalidAttributeValue'},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };
    
windowFunctions['ValidBatchDeleteAttributes'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    
    var table = Ti.UI.createTableView({
		top:44
	});
	
	win.add(table);

	var arrDomains=[];
	
	Ti.App.AWS.SimpleDB.batchDeleteAttributes({'DomainName':'pankaj1','Item.*.ItemName':'panku','Item.*.Attribute.*.Value':'panki'},
		function(response){
			Ti.API.info('total number of domains: ' + response);
		},
		function(error){
			alert(error.summary);
		}
	);
	
    win.open();
    };