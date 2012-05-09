Ti.include(
    //'create.js'
    // 'query.js',
    // 'remove.js',
    // 'search.js',
    // 'show.js',
    // 'update.js'
);

windowFunctions['S3'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    // var rows = [
    	// 'Coming Soon!',
        // 'Query Photo',
        // 'Search Photo'
    // ];
    // if (Ti.Media.openPhotoGallery || Ti.Media.showCamera) {
         // rows.unshift('Create Photo');
    // }
    // var table = Ti.UI.createTableView({
        // backgroundColor: '#fff',
        // top: offset + u,
        // data: createRows(rows)
    // });
    // table.addEventListener('click', handleOpenWindow);
    // win.add(table);
    var comingSoonView = Ti.UI.createView({
		top:44,
		backgroundImage:'images/coming_soon.png',
		height:436
	});
	
	win.add(comingSoonView);
    win.open();
};