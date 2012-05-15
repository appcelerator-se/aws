describe("AWS S3 Tests!", {
	before_all : function() {
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws-access-key-id'), Titanium.App.Properties.getString('aws-secret-access-key'));
		emailId = Titanium.App.Properties.getString('email-id');
		uploadId = '';
		ETag = '';
	},
	after_all : function() {
		AWS = null;
		uploadId = null;
		ETag = null;
		emailId = null;
	},
	timeout : 5000,

	headObject_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'test131'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'test131',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.headObject({
					'bucketName' : 'test131',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					callback.passed();
					AWS.S3.deleteObject({
						'bucketName' : 'test131',
						'objectName' : 'KS_nav_views.png'
					}, function(data) {
						AWS.S3.deleteBucket({
							'bucketName' : 'test131'
						}, function(data) {

						}, function(error) {

						});
					}, function(error) {

					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	headObjectWithEmptybucketName_as_async : function(callback) {
		AWS.S3.headObject({
			'bucketName' : '',
			'objectName' : 'image.part.63'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	headObjectWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.headObject({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	headObjectWithEmptyobjectName_as_async : function(callback) {
		AWS.S3.headObject({
			'bucketName' : 'test12398',
			'objectName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	headObjectWithInvalidobjectName_as_async : function(callback) {
		AWS.S3.headObject({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	headBucketWithEmptybucketName_as_async : function(callback) {
		AWS.S3.headBucket({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	headBucketWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.headBucket({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putObjectCopy_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'test231'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'test231',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.putBucket({
					'bucketName' : 'test324'
				}, function(data) {
					AWS.S3.putObjectCopy({
						'bucketName' : 'test324',
						'objectName' : 'xyz',
						'copySource' : '/test231/KS_nav_views.png'
					}, function(data) {
						callback.passed();
						AWS.S3.deleteObject({
							'bucketName' : 'test324',
							'objectName' : 'xyz'
						}, function(data) {
							AWS.S3.deleteObject({
								'bucketName' : 'test231',
								'objectName' : 'KS_nav_views.png'
							}, function(data) {
								AWS.S3.deleteBucket({
									'bucketName' : 'test324'
								}, function(data) {
									AWS.S3.deleteBucket({
										'bucketName' : 'test231'
									}, function(data) {

									}, function(error) {

									});
								}, function(error) {

								});
							}, function(error) {

							});
						}, function(error) {

						});
					}, function(error) {
						callback.failed('Some error occured');
					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	putObjectCopyWithInvalidBucketName_as_async : function(callback) {
		AWS.S3.putObjectCopy({
			'bucketName' : 'invalid',
			'objectName' : 'xyz',
			'copySource' : '/test12398/strus2.pdf'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putObjectCopyWithEmptyBucketName_as_async : function(callback) {
		AWS.S3.putObjectCopy({
			'bucketName' : '',
			'objectName' : 'xyz',
			'copySource' : '/test12398/strus2.pdf'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putObjectCopyWithEmptyObjectName_as_async : function(callback) {
		AWS.S3.putObjectCopy({
			'bucketName' : 'pankaj2344',
			'objectName' : '',
			'copySource' : '/test12398/strus2.pdf'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putObjectCopyWithEmptyCopySource_as_async : function(callback) {
		AWS.S3.putObjectCopy({
			'bucketName' : 'pankaj2344',
			'objectName' : 'validname',
			'copySource' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putObjectCopyWithInvalidCopySource_as_async : function(callback) {
		AWS.S3.putObjectCopy({
			'bucketName' : 'pankaj2344',
			'objectName' : 'validname',
			'copySource' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getObjectTorrent_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'test453'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'test453',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.getObjectTorrent({
					'bucketName' : 'test453',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					callback.passed();
					AWS.S3.deleteObject({
						'bucketName' : 'test453',
						'objectName' : 'KS_nav_views.png'
					}, function(data) {
						AWS.S3.deleteBucket({
							'bucketName' : 'test453'
						}, function(data) {

						}, function(error) {

						});
					}, function(error) {

					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	getObjectTorrentWithEmptyBucketName_as_async : function(callback) {
		AWS.S3.getObjectTorrent({
			'bucketName' : '',
			'objectName' : 'Spring.pdf'
		}, function(data) {

			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getObjectTorrentWithInvalidBucketName_as_async : function(callback) {
		AWS.S3.getObjectTorrent({
			'bucketName' : 'xyzw',
			'objectName' : 'Spring.pdf'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getObjectTorrentWithEmptyObjectName_as_async : function(callback) {
		AWS.S3.getObjectTorrent({
			'bucketName' : 'pankaj2344',
			'objectName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();

		});
	},
	getObjectTorrentWithInvalidObjectName_as_async : function(callback) {
		AWS.S3.getObjectTorrent({
			'bucketName' : 'pankaj2344',
			'objectName' : 'image'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	initiateMultipartUpload_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'test572'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'test572',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.initiateMultipartUpload({
					'bucketName' : 'test572',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					callback.passed();
					AWS.S3.deleteObject({
						'bucketName' : 'test572',
						'objectName' : 'KS_nav_views.png'
					}, function(data) {
						AWS.S3.deleteBucket({
							'bucketName' : 'test572'
						}, function(data) {

						}, function(error) {

						});
					}, function(error) {

					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	uploadPart_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'test692'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'test692',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.initiateMultipartUpload({
					'bucketName' : 'test692',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					uploadId = data.UploadId;
					var f1 = Titanium.Filesystem.getFile('KS_nav_ui.png');
					AWS.S3.uploadPart({
						'bucketName' : 'test692',
						'objectName' : 'KS_nav_views.png',
						'file' : f1,
						'uploadId' : uploadId,
						'partNumber' : '2'
					}, function(data) {
						callback.passed();
						AWS.S3.deleteObject({
							'bucketName' : 'test692',
							'objectName' : 'KS_nav_views.png'
						}, function(data) {
							AWS.S3.deleteBucket({
								'bucketName' : 'test692'
							}, function(data) {

							}, function(error) {

							});
						}, function(error) {

						});
					}, function(error) {
						callback.failed('Some error occured');
					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	uploadPartCopy_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'test794'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'test794',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				var f1 = Titanium.Filesystem.getFile('KS_nav_ui.png');
				AWS.S3.putBucket({
					bucketName : 'test835'
				}, function(data) {
					AWS.S3.putObject({
						'bucketName' : 'test835',
						'objectName' : 'KS_nav_ui.png',
						'file' : f1
					}, function(data) {
						AWS.S3.initiateMultipartUpload({
							'bucketName' : 'test794',
							'objectName' : 'KS_nav_views.png'
						}, function(data) {
							uploadId = data.UploadId;
							AWS.S3.uploadPartCopy({
								'bucketName' : 'test794',
								'objectName' : 'KS_nav_views.png',
								'copySource' : '/test835/KS_nav_ui.png',
								'uploadId' : uploadId,
								'partNumber' : '2'
							}, function(data) {
								callback.passed();
								AWS.S3.deleteObject({
									'bucketName' : 'test794',
									'objectName' : 'KS_nav_views.png'
								}, function(data) {
									AWS.S3.deleteBucket({
										'bucketName' : 'test794'
									}, function(data) {
										AWS.S3.deleteObject({
											'bucketName' : 'test835',
											'objectName' : 'KS_nav_ui.png'
										}, function(data) {
											AWS.S3.deleteBucket({
												'bucketName' : 'test835'
											}, function(data) {

											}, function(error) {

											});
										}, function(error) {

										});
									}, function(error) {

									});
								}, function(error) {

								});
							}, function(error) {
								callback.failed('Some error occured');
							});
						}, function(error) {
							callback.failed('Some error occured');
						});
					}, function(error) {
						callback.failed('Some error occured');
					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	/**
	 *  Complete MultiPart Upload is used for completing the process of uploading in MultiPart.
	 */

	/*completeMultipartUpload_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 'test953'
		}, function(data) {
			alert('putBucket success');
			var f = Titanium.Filesystem.getFile('ATC.pdf');
			Ti.App.AWS.S3.putObject({
				'bucketName' : 'test953',
				'objectName' : 'ATC.pdf',
				'file' : f
			}, function(data) {
				alert('putObject success');
				Ti.App.AWS.S3.putBucket({
					bucketName : 'test1087890'
				}, function(data) {
					alert('putBucket success');
					var f1 = Titanium.Filesystem.getFile('Sxml.pdf');
					Ti.App.AWS.S3.putObject({
						'bucketName' : 'test1087890',
						'objectName' : 'Sxml.pdf',
						'file' : f
					}, function(data) {
						alert('putObject success');
						Ti.App.AWS.S3.initiateMultipartUpload({
							'bucketName' : 'test953',
							'objectName' : 'ATC.pdf'
						}, function(data) {
							alert('initiateMultipartUpload success');
							test = data.UploadId;
							Ti.App.AWS.S3.uploadPartCopy({
								'bucketName' : 'test953',
								'objectName' : 'ATC.pdf',
								'copySource' : '/test1087890/Sxml.pdf',
								'uploadId' : data.UploadId,
								'partNumber' : '2'
							}, function(data) {
								alert('uploadPartCopy success');
								Ti.API.info(JSON.stringify(data));
								Ti.App.AWS.S3.completeMultipartUpload({
									'bucketName' : 'test953',
									'objectName' : 'ATC.pdf',
									'uploadId' : test,
									'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>' + data.ETag + '</ETag></Part></CompleteMultipartUpload>'
								}, function(data) {
									alert('completeMultipartUpload success');
									Ti.API.info(JSON.stringify(data));
									//callback.passed();
									Ti.App.AWS.S3.deleteObject({
										'bucketName' : 'test953',
										'objectName' : 'ATC.pdf'
									}, function(data) {
										alert('deleteObject success');
										Ti.App.AWS.S3.deleteBucket({
											'bucketName' : 'test953'
										}, function(data) {
											alert('deleteBucket success');
											Ti.App.AWS.S3.deleteObject({
												'bucketName' : 'test1087890',
												'objectName' : 'Sxml.pdf'
											}, function(data) {
												alert('deleteObject success');
												Ti.App.AWS.S3.deleteBucket({
													'bucketName' : 'test1087890'
												}, function(data) {
													alert('deleteBucket success');
												}, function(error) {
													alert('Some error occured' + JSON.stringify(error));
												});
											}, function(error) {
												alert('Some error occured' + JSON.stringify(error));
											});
										}, function(error) {
											alert('Some error occured' + JSON.stringify(error));
										});
									}, function(error) {
										alert('Some error occured' + JSON.stringify(error));
									});
								}, function(error) {
									alert('Some error occured' + JSON.stringify(error));
									//callback.failed('Some error occured'+JSON.stringify(error));
								});
							}, function(error) {
								alert('Some error occured' + JSON.stringify(error));
							});
						}, function(error) {
							alert('Some error occured' + JSON.stringify(error));
						});
					}, function(error) {
						alert('Some error occured' + JSON.stringify(error));
					});
				}, function(error) {
					alert('Some error occured' + JSON.stringify(error));
				});
			}, function(error) {
				alert('Some error occured' + JSON.stringify(error));
			});
		}, function(error) {
			alert('Some error occured' + JSON.stringify(error));
		});
	},*/
	putObject_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'test535'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'test535',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				callback.passed();
				AWS.S3.deleteObject({
					'bucketName' : 'test535',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					AWS.S3.deleteBucket({
						'bucketName' : 'test535'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {

				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	listMultipartUploads_as_async : function(callback) {

		AWS.S3.putBucket({
			bucketName : 'test723'
		}, function(data) {
			AWS.S3.listMultipartUploads({
				'bucketName' : 'test723'
			}, function(data) {
				callback.passed();
				AWS.S3.deleteBucket({
					'bucketName' : 'test723'
				}, function(data) {

				}, function(error) {

				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	/*
	 *  delete Multiple Objects is used for deleting multiple Objects from a Single Bucket.
	 **/
	deleteMultipleObjects_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 'test024'
		}, function(data) {
			var f = Titanium.Filesystem.getFile('KS_nav_views.png');
			AWS.S3.putObject({
				'bucketName' : 'test024',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				var f1 = Titanium.Filesystem.getFile('KS_nav_ui.png');
				AWS.S3.putObject({
					'bucketName' : 'test024',
					'objectName' : 'KS_nav_ui.png',
					'file' : f1
				}, function(data) {
					AWS.S3.deleteMultipleObjects({
						'bucketName' : 'test024',
						'xmlTemplate' : '<Delete><Object><Key>KS_nav_views.png</Key></Object><Object><Key>KS_nav_ui.png</Key></Object></Delete>'
					}, function(data) {
						callback.passed();
						AWS.S3.deleteBucket({
							'bucketName' : 'test024'
						}, function(data) {

						}, function(error) {

						});
					}, function(error) {
						callback.failed('Some error occured');
					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	getBucketPolicy_as_async : function(callback) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketPolicy'
		}, function(data) {

			var jsonObject = {
				"Version" : "2008-10-17",
				"Id" : "bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364",
				"Statement" : [{
					"Effect" : 'Allow',
					"Sid" : "1",
					"Principal" : {
						"AWS" : "*"
					},
					"Action" : ["s3:*"],
					"Resource" : "arn:aws:s3:::DrillBitGetBucketPolicy/*"
				}]
			}

			AWS.S3.putBucketPolicy({
				'bucketName' : 'DrillBitGetBucketPolicy',
				'xmlTemplate' : JSON.stringify(jsonObject)
			}, function(data) {

				AWS.S3.getBucketPolicy({
					'bucketName' : 'DrillBitGetBucketPolicy'
				}, function(data) {

					callback.passed();
					AWS.S3.deleteBucket({
						'bucketName' : 'DrillBitGetBucketPolicy'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {

					callback.failed('Some error occured');
				});

			}, function(error) {

				callback.failed('Some error occured' + JSON.stringify(error));
			});
		}, function(error) {

			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	//Start Test Cases for put Bucket
	putBucket_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutBucket'
		}, function(data) {

			callback.passed();
			AWS.S3.deleteBucket({
				'bucketName' : 'DrillBitPutBucket'
			}, function(data) {

			}, function(error) {

			});
		}, function(error) {

			callback.failed('Some error occured  ' + JSON.stringify(error));
		});

	},
	putEmptyBucket_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	// End Test Cases for Put Bucket.
	// Start Test Cases for putBucketACL
	putBucketAcl_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutBucketAcl'
		}, function(data) {

			AWS.S3.putBucketAcl({
				'bucketName' : 'DrillBitPutBucketAcl',
				'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonAWS.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
			}, function(data) {
				callback.passed();

				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitPutBucketAcl'
				}, function(data) {

				}, function(error) {

				});
			}, function(error) {

				callback.failed('Some error occured' + JSON.stringify(error));
			});
		}, function(error) {

			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	putEmptyBucketACL_as_async : function(callback) {
		AWS.S3.putBucketAcl({
			'bucketName' : '',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketACLWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketAcl({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketACLWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketAcl({
			'bucketName' : 't16est12354',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketACLWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketAcl({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName></DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketLifeCycle_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 'test17'
		}, function(data) {
			AWS.S3.putBucketLifecycle({
				'bucketName' : 'test17',
				'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
			}, function(data) {
				callback.passed();
				AWS.S3.deleteBucketLifecycle({
					'bucketName' : 'test17'
				}, function(data) {
					AWS.S3.deleteBucket({
						'bucketName' : 'test17'
					}, function(data) {

					}, function(error) {
					});
				}, function(error) {

				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	putEmptyBucketLifeCycle_as_async : function(callback) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : '',
			'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketLifeCycleWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketLifeCycleWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketLifeCycleWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<LifecycleConfiguration><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></LifecycleConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketPolicy_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutBucketPolicy'
		}, function(data) {

			var jsonObject = {
				"Version" : "2008-10-17",
				"Id" : "bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364",
				"Statement" : [{
					"Effect" : 'Allow',
					"Sid" : "1",
					"Principal" : {
						"AWS" : "*"
					},
					"Action" : ["s3:*"],
					"Resource" : "arn:aws:s3:::DrillBitPutBucketPolicy/*"
				}]
			}

			AWS.S3.putBucketPolicy({
				'bucketName' : 'DrillBitPutBucketPolicy',
				'xmlTemplate' : JSON.stringify(jsonObject)
			}, function(data) {

				callback.passed();
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitPutBucketPolicy'
				}, function(data) {

				}, function(error) {

				});
			}, function(error) {

				callback.failed('Some error occured' + JSON.stringify(error));
			});
		}, function(error) {

			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	putEmptyBucketPolicy_as_async : function(callback) {
		var jsonObject = {
			"Version" : "2008-10-17",
			"Id" : "bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364",
			"Statement" : [{
				"Effect" : 'Allow',
				"Sid" : "1",
				"Principal" : {
					"AWS" : "*"
				},
				"Action" : ["s3:*"],
				"Resource" : "arn:aws:s3:::test12354/*"
			}]
		}
		AWS.S3.putBucketPolicy({
			'bucketName' : '',
			'xmlTemplate' : JSON.stringify(jsonObject)
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketPolicyWithInvalidbucketName_as_async : function(callback) {
		var jsonObject = {
			"Version" : "2008-10-17",
			"Id" : "bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364",
			"Statement" : [{
				"Effect" : 'Allow',
				"Sid" : "1",
				"Principal" : {
					"AWS" : "*"
				},
				"Action" : ["s3:*"],
				"Resource" : "arn:aws:s3:::test12354/*"
			}]
		}
		AWS.S3.putBucketPolicy({
			'bucketName' : 'xyzw',
			'xmlTemplate' : JSON.stringify(jsonObject)
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketPolicyWithEmptyXmlTemplate_as_async : function(callback) {

		AWS.S3.putBucketPolicy({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketPolicyWithInvalidXmlTemplate_as_async : function(callback) {
		var jsonObject = {
			"Version" : "",
			"Id" : "bdffafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364",
			"Statement" : [{
				"Effect" : 'Allow',
				"Sid" : "1",
				"Principal" : {
					"AWS" : "*"
				},
				"Action" : ["s3:*"]
			}]
		}
		AWS.S3.putBucketPolicy({
			'bucketName' : 'xyzw',
			'xmlTemplate' : JSON.stringify(jsonObject)
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketLogging_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutBucketLogging'
		}, function(data) {
			AWS.S3.putBucketLogging({
				'bucketName' : 'DrillBitPutBucketLogging',
				'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>global123</TargetBucket><TargetPrefix>global123-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
			}, function(data) {
				callback.passed();
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitPutBucketLogging'
				}, function(data) {
				}, function(error) {
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	putEmptyBucketLogging_as_async : function(callback) {
		AWS.S3.putBucketLogging({
			'bucketName' : '',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>pankaj1234567</TargetBucket><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketLoggingWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketLogging({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>pankaj1234567</TargetBucket><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketLoggingWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketLogging({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketLoggingWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketLogging({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketNotification_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutBucketNotification'
		}, function(data) {
			AWS.S3.putBucketNotification({
				'bucketName' : 'DrillBitPutBucketNotification',
				'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687501311:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
			}, function(data) {
				callback.passed();
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitPutBucketNotification'
				}, function(data) {
				}, function(error) {
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	putEmptyBucketNotification_as_async : function(callback) {
		AWS.S3.putBucketNotification({
			'bucketName' : '',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687501311:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketNotificationWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketNotification({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687501311:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketNotificationWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketNotification({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketNotificationWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketNotification({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putEmptyBucketRequestPayment_as_async : function(callback) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : '',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Payer>Requester</Payer></RequestPaymentConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketRequestPaymentWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Payer>Requester</Payer></RequestPaymentConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketRequestPaymentWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketRequestPaymentWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"></RequestPaymentConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketVersioning_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutBucketVersioning'
		}, function(data) {
			AWS.S3.putBucketVersioning({
				'bucketName' : 'DrillBitPutBucketVersioning',
				'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
			}, function(data) {
				callback.passed();
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitPutBucketVersioning'
				}, function(data) {
				}, function(error) {
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	putEmptyBucketVersioning_as_async : function(callback) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketVersioningWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketVersioningWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketVersioningWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status></VersioningConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketWebsite_as_async : function(callback) {

		AWS.S3.putBucket({
			bucketName : 'test12345987'
		}, function(data) {

			AWS.S3.putBucketWebsite({
				bucketName : 'test12345987',
				'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
			}, function(data) {

				callback.passed();
				AWS.S3.deleteBucketWebsite({
					bucketName : 'test12345987'
				}, function(data) {

					AWS.S3.deleteBucket({
						bucketName : 'test12345987'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {

				});
			}, function(error) {

				callback.failed('Some error occured');
			});
		}, function(error) {

			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	putBucketWebsitewithEmptyBucketName_as_async : function(callback) {
		AWS.S3.putBucketWebsite({
			'bucketName' : '',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketWebsiteWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketWebsite({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketWebsiteWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketWebsite({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketWebsiteWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketWebsite({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putObjectWithEmptybucketName_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_ui.png');
		AWS.S3.putObject({
			'bucketName' : '',
			'objectName' : 'KS_nav_ui.png',
			'file' : f
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putObjectWithInvalidbucketName_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_ui.png');
		AWS.S3.putObject({
			'bucketName' : 'xyzw',
			'objectName' : 'KS_nav_ui.png',
			'file' : f
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putObjectWithEmptyobjectName_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_ui.png');
		AWS.S3.putObject({
			'bucketName' : 'pankaj12345',
			'objectName' : '',
			'file' : f
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putObjectAcl_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutObjectAcl'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'DrillBitPutObjectAcl',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.putObjectAcl({
					'bucketName' : 'DrillBitPutObjectAcl',
					'objectName' : 'KS_nav_views.png',
					'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
				}, function(data) {
					callback.passed();
					AWS.S3.deleteObject({
						'bucketName' : 'DrillBitPutObjectAcl',
						'objectName' : 'KS_nav_views.png'
					}, function(data) {
						AWS.S3.deleteBucket({
							'bucketName' : 'DrillBitPutObjectAcl'
						}, function(data) {

						}, function(error) {

						})
					}, function(error) {

					})
				}, function(error) {
					callback.failed('Some error occured');
				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	putObjectAclWithEmptybucketName_as_async : function(callback) {
		AWS.S3.putObjectAcl({
			'bucketName' : '',
			'objectName' : 'myFile1.png',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putObjectAclWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putObjectAcl({
			'bucketName' : 'xyzw',
			'objectName' : 'myFile1.png',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putObjectAclWithEmptyobjectName_as_async : function(callback) {
		AWS.S3.putObjectAcl({
			'bucketName' : 'pankaj12345',
			'objectName' : '',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putObjectAclWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putObjectAcl({
			'bucketName' : 'test12354',
			'objectName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getService_as_async : function(callback) {
		AWS.S3.getService({}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	getBucket_as_async : function(callback) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucket'
		}, function(data) {
			AWS.S3.getBucket({
				'bucketName' : 'DrillBitGetBucket'
			}, function(data) {
				callback.passed();
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucket'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	getBucketWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucket({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucket({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketAcl_as_async : function(callback) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketAcl'
		}, function(data) {
			AWS.S3.getBucketAcl({
				'bucketName' : 'DrillBitGetBucketAcl'
			}, function(data) {
				callback.passed();
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketAcl'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	getBucketAclWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketAcl({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketAclWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketAcl({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketLifecycle_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketLifecycle'
		}, function(data) {

			AWS.S3.putBucketLifecycle({
				'bucketName' : 'DrillBitGetBucketLifecycle',
				'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
			}, function(data) {

				AWS.S3.getBucketLifecycle({
					'bucketName' : 'DrillBitGetBucketLifecycle'
				}, function(data) {
					callback.passed();

					AWS.S3.deleteBucket({
						'bucketName' : 'DrillBitGetBucketLifecycle'
					}, function(data) {

					}, function(error) {

					})
				}, function(error) {
					callback.failed('Some error occured  ' + JSON.stringify(error));
				})
			}, function(error) {

				callback.failed('Some error occured  ' + JSON.stringify(error));
			})
		}, function(error) {

			callback.failed('Some error occured');
		});

	},
	getBucketLifecycleWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketLifecycle({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketlifecycleWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketLifecycle({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketPolicyWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketPolicy({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketPolicyWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketPolicy({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketLocation_as_async : function(callback) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketLocation'
		}, function(data) {
			AWS.S3.getBucketLocation({
				'bucketName' : 'DrillBitGetBucketLocation'
			}, function(data) {
				callback.passed();
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketLocation'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	getBucketLocationWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketLocation({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketLocationWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketLocation({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketLogging_as_async : function(callback) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketLogging'
		}, function(data) {
			AWS.S3.getBucketLogging({
				'bucketName' : 'DrillBitGetBucketLogging'
			}, function(data) {
				callback.passed();
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketLogging'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	getBucketLoggingWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketLogging({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketLoggingWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketLogging({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketNotification_as_async : function(callback) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketNotification'
		}, function(data) {
			AWS.S3.getBucketNotification({
				'bucketName' : 'DrillBitGetBucketNotification'
			}, function(data) {
				callback.passed();
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketNotification'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	getBucketNotificationWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketNotification({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketNotificationWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketNotification({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketObjectVersions_as_async : function(callback) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketObjectVersions'
		}, function(data) {
			AWS.S3.getBucketObjectVersions({
				'bucketName' : 'DrillBitGetBucketObjectVersions'
			}, function(data) {
				callback.passed();
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketObjectVersions'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	getBucketObjectVersionsWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketObjectVersions({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketObjectVersionsWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketObjectVersions({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketRequestPayment_as_async : function(callback) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketRequestPayment'
		}, function(data) {
			AWS.S3.getBucketRequestPayment({
				'bucketName' : 'DrillBitGetBucketRequestPayment'
			}, function(data) {
				callback.passed();
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketRequestPayment'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	getBucketRequestPaymentWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketRequestPayment({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketRequestPaymentWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketRequestPayment({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketVersioning_as_async : function(callback) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketVersioning'
		}, function(data) {
			AWS.S3.getBucketVersioning({
				'bucketName' : 'DrillBitGetBucketVersioning'
			}, function(data) {
				callback.passed();
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketVersioning'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	getBucketVersioningWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketVersioning({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketVersioningWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketVersioning({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketWebsite_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 'test543219876'
		}, function(data) {
			AWS.S3.putBucketWebsite({
				bucketName : 'test543219876',
				'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
			}, function(data) {
				AWS.S3.getBucketWebsite({
					'bucketName' : 'test543219876'
				}, function(data) {
					callback.passed();
					AWS.S3.deleteBucket({
						bucketName : 'test543219876'
					}, function(data) {
					}, function(error) {
					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	getBucketWebsiteWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketWebsite({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getBucketWebsiteWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketWebsite({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	listMultipartUploadsWithEmptybucketName_as_async : function(callback) {
		AWS.S3.listMultipartUploads({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	listMultipartUploadsWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.listMultipartUploads({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteBucket_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 'DrillBucketDeleteBucket'
		}, function(data) {
			AWS.S3.deleteBucket({
				'bucketName' : 'DrillBucketDeleteBucket'
			}, function(data) {
				callback.passed();
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	deleteBucketWithEmptybucketName_as_async : function(callback) {
		AWS.S3.deleteBucket({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteBucketWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.deleteBucket({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteBucketLifecycle_as_async : function(callback) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitDeleteBucketLifecycle'
		}, function(data) {
			AWS.S3.putBucketLifecycle({
				'bucketName' : 'DrillBitDeleteBucketLifecycle',
				'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
			}, function(data) {
				AWS.S3.deleteBucketLifecycle({
					'bucketName' : 'DrillBitDeleteBucketLifecycle'
				}, function(data) {
					callback.passed();
					AWS.S3.deleteBucket({
						'bucketName' : 'DrillBitDeleteBucketLifecycle'
					}, function(data) {
					}, function(error) {
					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	deleteBucketLifecycleWithEmptybucketName_as_async : function(callback) {
		AWS.S3.deleteBucketLifecycle({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteBucketLifecycleWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.deleteBucketLifecycle({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteBucketPolicy_as_async : function(callback) {
		var jsonObject = {
			"Version" : "2008-10-17",
			"Id" : "bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364",
			"Statement" : [{
				"Effect" : 'Allow',
				"Sid" : "1",
				"Principal" : {
					"AWS" : "*"
				},
				"Action" : ["s3:*"],
				"Resource" : "arn:aws:s3:::DrillBitDeleteBucketPolicy/*"
			}]
		}

		AWS.S3.putBucket({
			bucketName : 'DrillBitDeleteBucketPolicy'
		}, function(data) {
			AWS.S3.putBucketPolicy({
				'bucketName' : 'DrillBitDeleteBucketPolicy',
				'xmlTemplate' : JSON.stringify(jsonObject)
			}, function(data) {
				AWS.S3.deleteBucketPolicy({
					'bucketName' : 'DrillBitDeleteBucketPolicy'
				}, function(data) {
					callback.passed();
					AWS.S3.deleteBucket({
						'bucketName' : 'DrillBitDeleteBucketPolicy'
					}, function(data) {
					}, function(error) {
					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},
	deleteBucketPolicyWithEmptybucketName_as_async : function(callback) {
		AWS.S3.deleteBucketPolicy({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteBucketPolicyWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.deleteBucketPolicy({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteBucketWebsite_as_async : function(callback) {

		AWS.S3.putBucket({
			bucketName : 'test987654321'
		}, function(data) {

			AWS.S3.putBucketWebsite({
				'bucketName' : 'test987654321',
				'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
			}, function(data) {

				AWS.S3.deleteBucketWebsite({
					'bucketName' : 'test987654321'
				}, function(data) {

					callback.passed();
					AWS.S3.deleteBucket({
						'bucketName' : 'test987654321'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {

					callback.failed('Some error occured  ' + JSON.stringify(error));
				})
			}, function(error) {

			callback.failed('Some error occured  ' + JSON.stringify(error));
			});
		}, function(error) {

			callback.failed('Some error occured  ' + JSON.stringify(error));
		});

	},
	deleteBucketWebsiteWithEmptybucketName_as_async : function(callback) {
		AWS.S3.deleteBucketWebsite({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteBucketWebsiteWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.deleteBucketWebsite({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteObject_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'DrillBitDeleteObject'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'DrillBitDeleteObject',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.deleteObject({
					'bucketName' : 'DrillBitDeleteObject',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					callback.passed();
					AWS.S3.deleteBucket({
						'bucketName' : 'DrillBitDeleteObject'
					}, function(data) {

					}, function(error) {

					})
				}, function(error) {
					callback.failed('Some error occured');
				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	deleteObjectWithEmptybucketName_as_async : function(callback) {
		AWS.S3.deleteObject({
			'bucketName' : '',
			'objectName' : 'image.part.63'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteObjectWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.deleteObject({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteObjectWithEmptyobjectName_as_async : function(callback) {
		AWS.S3.deleteObject({
			'bucketName' : 'velocity-gl',
			'objectName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteObjectWithInvalidobjectName_as_async : function(callback) {
		AWS.S3.deleteObject({
			'bucketName' : 'pankaj123456',
			'objectName' : 'xyz'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteMultipleObjectsWithEmptybucketName_as_async : function(callback) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : '',
			'xmlTemplate' : '<Delete><Object><Key>sample1.txt</Key></Object><Object><Key>sample2.txt</Key></Object></Delete>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteMultipleObjectsWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<Delete><Object><Key>sample1.txt</Key></Object><Object><Key>sample2.txt</Key></Object></Delete>'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	deleteMultipleObjectsWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : 'velocity-gl',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteMultipleObjectsWithInvalidobjectName_as_async : function(callback) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : 'velocity-gl',
			'xmlTemplate' : '<Delete><Object><Key>sample1.txt</Key></Object><Object></Object></Delete>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getObject_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'DrillBitGetObject'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'DrillBitGetObject',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.getObject({
					'bucketName' : 'DrillBitGetObject',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					callback.passed();
					AWS.S3.deleteObject({
						'bucketName' : 'DrillBitGetObject',
						'objectName' : 'KS_nav_views.png'
					}, function(data) {
						AWS.S3.deleteBucket({
							'bucketName' : 'DrillBitGetObject'
						}, function(data) {

						}, function(error) {

						})
					}, function(error) {

					})
				}, function(error) {
					callback.failed('Some error occured');
				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	getObjectWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getObject({
			'bucketName' : '',
			'objectName' : 'image.part.63'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getObjectWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getObject({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getObjectWithEmptyobjectName_as_async : function(callback) {
		AWS.S3.getObject({
			'bucketName' : 'pankaj123456',
			'objectName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getObjectWithInvalidobjectName_as_async : function(callback) {
		AWS.S3.getObject({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getObjectAcl_as_async : function(callback) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'DrillBitAcl'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'DrillBitAcl',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.getObjectAcl({
					'bucketName' : 'DrillBitAcl',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					callback.passed();
					AWS.S3.deleteObject({
						'bucketName' : 'DrillBitAcl',
						'objectName' : 'KS_nav_views.png'
					}, function(data) {
						AWS.S3.deleteBucket({
							'bucketName' : 'DrillBitAcl'
						}, function(data) {

						}, function(error) {

						})
					}, function(error) {

					})
				}, function(error) {
					callback.failed('Some error occured');
				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	getObjectAclWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getObjectAcl({
			'bucketName' : '',
			'objectName' : 'image.part.63'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getObjectAclWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getObjectAcl({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getObjectAclWithEmptyobjectName_as_async : function(callback) {
		AWS.S3.getObjectAcl({
			'bucketName' : 'pankaj123456',
			'objectName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	getObjectAclWithInvalidobjectName_as_async : function(callback) {
		AWS.S3.getObjectAcl({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *  abort MultiPart upload is used to Abort the MultiPart Upload.
	 */

	abortMultipartUpload_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 'DrillBitUpload'
		}, function(data) {
			var f = Titanium.Filesystem.getFile('KS_nav_views.png');
			AWS.S3.putObject({
				'bucketName' : 'DrillBitUpload',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.initiateMultipartUpload({
					'bucketName' : 'DrillBitUpload',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					AWS.S3.abortMultipartUpload({
						'bucketName' : 'DrillBitUpload',
						'objectName' : 'KS_nav_views.png',
						'uploadId' : data.UploadId

					}, function(data) {
						callback.passed();
						AWS.S3.deleteObject({
							'bucketName' : 'DrillBitUpload',
							'objectName' : 'KS_nav_views.png'
						}, function(data) {
							AWS.S3.deleteBucket({
								'bucketName' : 'DrillBitUpload'
							}, function(data) {

							}, function(error) {

							})
						}, function(error) {

						});
					}, function(error) {
						callback.failed('Some error occured');
					})
				}, function(error) {
					callback.failed('Some error occured');
				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	abortMultipartUploadWithEmptybucketName_as_async : function(callback) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'Rahul.png',
			'uploadId' : uploadId

		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	abortMultipartUploadWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63',
			'uploadId' : uploadId
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	abortMultipartUploadWithEmptyobjectName_as_async : function(callback) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'velocity-gl',
			'objectName' : '',
			'uploadId' : uploadId
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	abortMultipartUploadWithInvalidobjectName_as_async : function(callback) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63',
			'uploadId' : uploadId
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	abortMultipartUploadWithEmptyuploadId_as_async : function(callback) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'velocity-gl',
			'objectName' : '',
			'uploadId' : uploadId
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	abortMultipartUploadWithInvaliduploadId_as_async : function(callback) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63',
			'uploadId' : uploadId
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	abortMultipartUploadWithEmptyPartNumber_as_async : function(callback) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'velocity-gl',
			'objectName' : '',
			'uploadId' : uploadId
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	abortMultipartUploadWithInvalidpartNumber_as_async : function(callback) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63',
			'uploadId' : uploadId
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	initiateMultipartUploadWithEmptybucketName_as_async : function(callback) {
		AWS.S3.initiateMultipartUpload({
			'bucketName' : '',
			'objectName' : 'Rahul.png'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	initiateMultipartUploadWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.initiateMultipartUpload({
			'bucketName' : 'xyzw',
			'objectName' : 'Rahul.png'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	initiateMultipartUploadWithEmptyobjectName_as_async : function(callback) {
		AWS.S3.initiateMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	initiateMultipartUploadsWithInvalidobjectName_as_async : function(callback) {
		AWS.S3.initiateMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'xyz'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured ' + JSON.stringify(error));
		});
	},
	listParts_as_async : function(callback) {

		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'DrillBitlist123'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'DrillBitlist123',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.initiateMultipartUpload({
					'bucketName' : 'DrillBitlist123',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					uploadId = data.UploadId;
					AWS.S3.listParts({
						'bucketName' : 'DrillBitlist123',
						'objectName' : 'KS_nav_views.png',
						'uploadId' : uploadId
					}, function(data) {
						callback.passed();
						AWS.S3.deleteObject({
							'bucketName' : 'DrillBitlist123',
							'objectName' : 'KS_nav_views.png'
						}, function(data) {
							AWS.S3.deleteBucket({
								'bucketName' : 'DrillBitlist123'
							}, function(data) {

							}, function(error) {

							})
						}, function(error) {

						})
					}, function(error) {
						callback.failed('Some error occured');
					})
				}, function(error) {
					callback.failed('Some error occured');
				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	listPartsWithEmptybucketName_as_async : function(callback) {
		AWS.S3.listParts({
			'bucketName' : '',
			'objectName' : 'Rahul.png',
			'uploadId' : 'WDy5XnIR1AM6mo1yYTOCfNvkNxSCv4OW8vlMCbHAc2Se6XKkXFRlv_nKIY7IQ3PM0DSzWiSyodqcUC8V.lhufQ--'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	listPartsWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.listParts({
			'bucketName' : 'xyzw',
			'objectName' : 'Rahul.png',
			'uploadId' : 'WDy5XnIR1AM6mo1yYTOCfNvkNxSCv4OW8vlMCbHAc2Se6XKkXFRlv_nKIY7IQ3PM0DSzWiSyodqcUC8V.lhufQ--'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	listPartsWithEmptyobjectName_as_async : function(callback) {
		AWS.S3.listParts({
			'bucketName' : 'test12398',
			'objectName' : '',
			'uploadId' : 'WDy5XnIR1AM6mo1yYTOCfNvkNxSCv4OW8vlMCbHAc2Se6XKkXFRlv_nKIY7IQ3PM0DSzWiSyodqcUC8V.lhufQ--'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	listPartsWithInvalidobjectName_as_async : function(callback) {
		AWS.S3.listParts({
			'bucketName' : 'test12398',
			'objectName' : 'imag',
			'uploadId' : 'WDy5XnIR1AM6mo1yYTOCfNvkNxSCv4OW8vlMCbHAc2Se6XKkXFRlv_nKIY7IQ3PM0DSzWiSyodqcUC8V.lhufQ--'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	listPartsWithEmptyuploadId_as_async : function(callback) {
		AWS.S3.listParts({
			'bucketName' : 'test12398',
			'objectName' : 'Rahul.png',
			'uploadId' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	listPartsWithInvaliduploadId_as_async : function(callback) {
		AWS.S3.listParts({
			'bucketName' : 'test12398',
			'objectName' : 'Rahul.png',
			'uploadId' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	uploadPartCopyWithEmptybucketName_as_async : function(callback) {
		AWS.S3.uploadPartCopy({
			'bucketName' : '',
			'objectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : uploadId,
			'partNumber' : '1'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	uploadPartCopyWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'xyzw',

			'objectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : uploadId,
			'partNumber' : '1'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	uploadPartCopyWithEmptyobjectName_as_async : function(callback) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : '',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : uploadId,
			'partNumber' : '1'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	uploadPartCopyWithInvalidobjectName_as_async : function(callback) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : 'image.63',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : uploadId,
			'partNumber' : '1'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	uploadPartCopyWithEmptyuploadId_as_async : function(callback) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'copySource' : '/pankaj2344/Spring.pdf',
			'objectName' : 'struts2.pdf',
			'uploadId' : '',
			'partNumber' : '1'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	uploadPartCopyWithInvaliduploadId_as_async : function(callback) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : '',
			'partNumber' : '1'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	uploadPartCopyWithEmptyPartNumber_as_async : function(callback) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : uploadId,
			'partNumber' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	uploadPartCopyWithInvalidpartNumber_as_async : function(callback) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : uploadId,
			'partNumber' : 'xy'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	uploadPartCopyWithEmptyCopySource_as_async : function(callback) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'copySource' : '',
			'uploadId' : uploadId,
			'partNumber' : '2'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	uploadPartCopyWithInvalidCopySource_as_async : function(callback) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'copySource' : '/blah/blah',
			'uploadId' : uploadId,
			'partNumber' : '2'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	completeMultipartUploadWithEmptybucketName_as_async : function(callback) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : '',
			'objectName' : 'struts2.pdf',
			'uploadId' : uploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"&quot;038969b6c419420d05e62ead4a9dd88e&quot;"</ETag></CompleteMultipartUpload>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	completeMultipartUploadWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'xyzw',
			'objectName' : 'struts2.pdf',
			'uploadId' : uploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '""</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	completeMultipartUploadWithEmptyobjectName_as_async : function(callback) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : '',
			'uploadId' : uploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	completeMultipartUploadWithInvalidobjectName_as_async : function(callback) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'image.63',
			'uploadId' : uploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	completeMultipartUploadWithEmptyuploadId_as_async : function(callback) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'uploadId' : '',
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	completeMultipartUploadWithInvaliduploadId_as_async : function(callback) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'uploadId' : 'bQZXGLyBw6hwwp9P9pk_Rk17Y5escQ_E949jTPySaJEvcrUfEAPE7Ng--',
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	completeMultipartUploadWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'uploadId' : uploadId,
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	completeMultipartUploadWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'uploadId' : uploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>1</PartNumber><ETag>"a54357aff0632cce46d942af68356b38"</ETag></Part><Part><ETag>"0c78aef83f66abc1fa1e8477f296d394"</ETag></Part><Part><PartNumber>3</PartNumber><ETag>"acbd18db4cc2f85cedef654fccc4a4d8"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	}
});
