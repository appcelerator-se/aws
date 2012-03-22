function AccessCredentialsWindow() {		
	//create object instance
	var self = Ti.UI.createWindow({
		title:'Access Credentials',
		modal: true,
		layout:'vertical',		
		backgroundColor:'#ffffff'
	});
	
	self.add(Ti.UI.createLabel({
		text:'Please provide your AWS Access Info',
		top:20,
		height:'auto',
		width:'auto',
		color:'#000'
	}));
	
	var accessKey=Ti.UI.createTextField({
		top:20,
    	height:60,
    	width:250,
    	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    	returnKeyType:Titanium.UI.RETURNKEY_DONE,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText:'Access KEY',
		value:Ti.App.Properties.getString('aws.access_key')
    });
	self.add(accessKey);

	var secretKey=Ti.UI.createTextField({
		top:20,
    	height:60,
    	width:250,
    	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    	returnKeyType:Titanium.UI.RETURNKEY_DONE,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText:'Secret KEY',
		value:Ti.App.Properties.getString('aws.secret_key')
    });
	self.add(secretKey);	
	var save = Ti.UI.createButton({
		title:"Save & Continue",
		top:20,
		height:60,
		width:200,
	});
	save.addEventListener('click', function() {
		Ti.App.Properties.setString('aws.access_key',accessKey.value);
		Ti.App.Properties.setString('aws.secret_key',secretKey.value);

		self.close();
	});
	self.add(save);
			
	return self;
};

module.exports = AccessCredentialsWindow;
