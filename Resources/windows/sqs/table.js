Ti.include(
    'sqsApi.js'
);

windowFunctions['SQS'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    var table = Ti.UI.createTableView({
        backgroundColor: '#fff',
        top: offset + u,
        data: createRows([
          'createQueue',
          'listQueues',
          'getQueueUrl',
          'setQueueAttributes',
          'getQueueAttributes',
          'sendMessage',
          'sendMessageBatch',
          'receiveMessage',
          'deleteMessage',
          'deleteMessageBatch',
          'deleteQueue',
          'changeMessageVisibility',
          'changeMessageVisibilityBatch',
          'removePermission'
        ])
    });
    table.addEventListener('click', handleOpenWindow);
    win.add(table);
    win.open();
};