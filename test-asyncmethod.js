if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', '');

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked

      for(var i=0; i<10; i++) {
        var before = moment();
        console.log(i + ' start', before.toString());
        Session.set('counter', Session.get('counter') + i + ' start ' + before.toString() + '\n');
        Meteor.call('test', i, function (err, res) {
          var after = moment();
          Session.set('counter', Session.get('counter') + res + ' stop ' + after.toString() + ' ' + after.diff(before)/1000 + '\n');
          console.log(res, 'stop', after.toString(), after.diff(before)/1000);
        });
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    test: function(i) {
      var before = moment();
      console.log(i + ' start', before.toString());

      var stop = new Date().getTime();
      while(new Date().getTime() < stop + 1000 * 3) {
        ;
      }

      var after = moment();
      console.log(i + ' stop', after.toString(), after.diff(before)/1000);
      return i + ' done ' + after.diff(before)/1000;
    }
  });

}
