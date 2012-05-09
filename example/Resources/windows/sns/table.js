Ti.include(
    'snsApi.js'
);

windowFunctions['SNS'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    var table = Ti.UI.createTableView({
        backgroundColor: '#fff',
        top: offset + u,
        data: createRows([
            'addPermission',
            'confirmSubscription',
            'createTopic',
            'deleteTopic',
            'getSubscriptionAttributes',
            'getTopicAttributes',
            'listSubscriptions',
            'listSubscriptionsByTopic',
            'listTopics',
            'publish',
            'removePermission',
            'setSubscriptionAttributes',
            'setTopicAttributes',
            'subscribe',
            'unsubscribe'
        ])
    });
    table.addEventListener('click', handleOpenWindow);
    win.add(table);
    win.open();
};