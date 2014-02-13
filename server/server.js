var notifiedClient = null;
//var Uuids = new Meteor.Collection('uuids');

TestStream = new Meteor.Stream('teststream');

/*
TestStream.permissions.write(function(uuid) {
    return true
});
*/

TestStream.permissions.read(function(eventName,arg2) {
    console.log('eventName:' + eventName);
    console.log('userId from client:' + arg2);
    console.log('userId in server:' + this.userId);
    if(this.userId) 
       if(this.userId == arg2){
          if(Meteor.users.findOne({_id:this.userId}).username == 'prabhakar'){
            console.log('success');
            return true;
       }

    }
},false);


Meteor.methods({
  teststream : function(){
    
  },
  notify : function(userId){
     check(userId, Match.Any);
    // console.log(uuid);
     TestStream.emit('test',userId);
     if(!notifiedClient){
      notifiedClient = userId;
    } 
  },
  cameOnline : function(userId){
   check(userId, Match.Any);
   console.log('online ' + userId);
  // TestStream.emit('limitedSteam',userId,'data for user');
  }
})
