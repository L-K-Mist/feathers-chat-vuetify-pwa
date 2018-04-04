// // Possibilities to use later
// "pouch-vue"
// "pouchdb-find"
// "pouchdb-live-find"

import PouchDB from "pouchdb-browser"
PouchDB.plugin(require('pouchdb-find'));

var db = new PouchDB('controller');

db.remote = new PouchDB('http://mysite:5984/mydb'); // You will need to use the link to your own cloudant db here.
// But don't worry, so far this code doesn't call on db.remote <-- it's something you can plug in if you want to.

PouchDB.debug.enable('*');
PouchDB.debug.disable() // If you've enabled debugging, you must explicitly disable it. Simply deleting debug.enable later is not enough.

db.info().then(function (info) {
    console.log(info);
})




export default db