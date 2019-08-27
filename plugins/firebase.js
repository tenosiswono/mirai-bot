const fb = require('firebase')
const moment = require('moment');
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
  let userFirstName = message.chat.first_name || ''
  let userLastName = message.chat.last_name || ''
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

firebase.getDailyMembersToday = async (squad) => {
  let chatRef = firebase.database.ref(`daily/${squad}/${moment().format('DD-MM-YYYY')}`)
  const snapshot = await chatRef.once('value')
  return snapshot.val()
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

firebase.getSquads = async (name) => {
  if (name) {
    let squadRef = firebase.database.ref(`squads/${name}`)
    const snapshot = await squadRef.once('value')
    return snapshot.val()
  }
  let squadRef = firebase.database.ref(`squads`)
  const snapshot = await squadRef.once('value')
  return snapshot.val()
}

firebase.addMember = (squad, name) => {
  let squadMemberRef = firebase.database.ref(`squads/${squad}/members`)

  return squadMemberRef.once('value').then(snapshot => {
    const val = snapshot.val() || []
    squadMemberRef.set([name, ...val])
  })
}

firebase.setChannel = (squad, name) => {
  let squadMemberRef = firebase.database.ref(`squads/${squad}/channel`)

  squadMemberRef.set(name)
}

firebase.getChannel = (squad) => {
  let squadMemberRef = firebase.database.ref(`squads/${squad}/channel`)

  return squadMemberRef.once('value').then(snapshot => {
    return snapshot.val()
  })
}

firebase.setGroupSquad = async (squad, message) => {
  let groupId = message.chat.id
  let groupName = message.chat.title
  let groupType = message.chat.type

  let groupRef = firebase.database.ref(`groups/${groupId}`)

  const snapshot = await groupRef.once('value')

  if(!snapshot.val()){
    await groupRef.set({
      id: groupId,
      name: groupName,
      type: groupType,
      squad: squad
    })
  }
  squadMemberRef = firebase.database.ref(`squads/${squad}/group`)
  await squadMemberRef.set(groupId)
}

firebase.getGroupSquad = async (message) => {
  let groupId = message.chat.id

  // Store group Info
  let groupRef = firebase.database.ref(`groups/${groupId}`)

  const snapshot = await groupRef.once('value')
  if(snapshot.val()){
    return snapshot.val().squad
  }
}

firebase.getMembers = (squad) => {
  let squadMemberRef = firebase.database.ref(`squads/${squad}/members`)

  return squadMemberRef.once('value')
}

module.exports = firebase;
