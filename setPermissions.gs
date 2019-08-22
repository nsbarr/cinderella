// ideally this script would run at a specific time, but it looks like time-driven 
// triggers have a +/- 15 minute window! https://developers.google.com/apps-script/reference/script/clock-trigger-builder
// but at the same time there's a trigger that runs every minute... confused...
// basically we could run a function at exactly 11:45 and another at exactly 12, if we were confident in the timing
// the backup plan is to run this script every minute!?!? and change permissions based on what time it is.

function setPermissions() {
  
  Logger.log("setting permissions...");
  
  // find the doc you want to do this for, and paste in its ID
  // get ID from: https://docs.google.com/document/d/LONGIDSTRINGHERE/edit

  var pumpkinDoc = DriveApp.getFileById('1qM0iTpxjq_3Q-tuM5LNZU8-XeNrObcDnuUNm4-TWVJ4');
  var d = new Date();
  var currentTime = d.toLocaleTimeString();

  Logger.log(currentTime);
  
  var chatWindowBegins = new Date().toLocaleTimeString();
  chatWindowBegins.setHours(12,05,0); // 12.05 pm
  var chatWindowCloses = new Date().toLocaleTimeString();
  chatWindowCloses.setHours(12,10,0); // 12.10 pm

  if(currentTime >= chatWindowBegins && currentTime < chatWindowCloses ){
      Logger.log("time to chat!");
        //change overall editing permissions
      pumpkinDoc.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);
  }
  else{
      Logger.log("time to pumpkin!");
         
    //remove explicit editors
    editors = pumpkinDoc.getEditors();
          for (i in editors) {
            email = editors[i].getEmail();
            Logger.log(email);
            if (email != "") {
              pumpkinDoc.removeEditor(email);
            }
          }
    
    //change overall editing permissions
    pumpkinDoc.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW)
      
    }
  
}
