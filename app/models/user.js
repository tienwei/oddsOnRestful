var Firebase = require('firebase');


function Users (opts) {
  var myFirebaseRef = new Firebase("https://torid-heat-6127.firebaseio.com/users");
  myFirebaseRef.on('value' ,function(snapshot) {
  	console.log(JSON.stringify(snapshot.val()));
	  this.users = JSON.stringify(snapshot.val()); 
	});
}

module.exports = Users;

