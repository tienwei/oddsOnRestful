var Firebase = require('firebase');

function Users (opts) {
	/* Comment out before sorting out the asyn call issue */
	
  // var myFirebaseRef = new Firebase("https://torid-heat-6127.firebaseio.com/users");
	// myFirebaseRef.on('value' ,function(snapshot) {
	//   this.users = JSON.stringify(snapshot.val()); 
	// });
}

module.exports = Users;

