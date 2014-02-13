  TestStream = new Meteor.Stream('teststream');

  TestStream.on('test', function (name) {
     alert(name);
  });

  TestStream.on('limitedSteam', function (userId,data) {
     if(Meteor.userId() == userId)
     alert(data);
  });

  Template.hello.greeting = function () {
    return "Welcome to stream.";
  };

  Template.hello.events({
    'click #stream' : function () {
     Meteor.call('teststream'); 
    },
    'click #notify' : function () {
     Meteor.call('notify',Meteor.userId()); 
    }
  });


Deps.autorun(function(){
 var status = Meteor.status().status;
 if(status == 'connected' && Meteor.userId()){
   Meteor.call('cameOnline',Meteor.userId());
  }
})
