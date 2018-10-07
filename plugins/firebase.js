const fb = require('firebase')
var moment = require('moment');
moment.locale('id');

const API_KEY = process.env.FIREBASE_KEY
const PROJECT_ID = process.env.FIREBASE_PROJECT


var config = {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
};

fb.initializeApp(config);

var firebase = {}

firebase.database = fb.database()
firebase.saveDaily = (squad, message) => {
  let userName = message.chat.username
  let userFirstName = message.chat.first_name
  let userLastName = message.chat.last_name
  let userRef = firebase.database.ref(`teleuser/${userName}`)

  userRef.once('value').then(snapshot => {
    if(!snapshot.val()){
      userRef.set({
        first_name: userFirstName,
        last_name: userLastName,
        username: userName
      })
    }

  })

  let chatRef = firebase.database.ref(`daily/${squad}/${moment().format('DD-MM-YYYY')}/${userName}/${message.message_id}`)

  chatRef.set(message)
}

firebase.getDailyMembersToday = (squad) => {
  let chatRef = firebase.database.ref(`daily/${squad}/${moment().format('DD-MM-YYYY')}`)
  return chatRef.once('value')
}

firebase.addSquad = (name) => {
  let squadRef = firebase.database.ref(`squads/${name}`)

  return squadRef.once('value').then(snapshot => {
    if(!snapshot.val()){
      squadRef.set({
        name: name,
        members: []
      })
    }

  })
}

firebase.getSquads = (name) => {
  if (name) {
    let squadRef = firebase.database.ref(`squads/${name}`)
    return squadRef.once('value')
  }
  let squadRef = firebase.database.ref(`squads`)
  return squadRef.once('value')
}

firebase.addMember = (squad, name) => {
  let squadMemberRef = firebase.database.ref(`squads/${squad}/members`)

  return squadMemberRef.once('value').then(snapshot => {
    const val = snapshot.val() || []
    squadMemberRef.set([name, ...val])
  })
}

firebase.getMembers = (squad) => {
  let squadMemberRef = firebase.database.ref(`squads/${squad}/members`)

  return squadMemberRef.once('value')
}

module.exports = firebase;
