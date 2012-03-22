Ti.include(
    'listDomains.js'
);

windowFunctions['SimpleDb'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    var table = Ti.UI.createTableView({
        backgroundColor: '#fff',
        top: offset + u,
        data: createRows([
            'List Domains',
        ])
    });
    table.addEventListener('click', handleOpenWindow);
    win.add(table);
    win.open();
};