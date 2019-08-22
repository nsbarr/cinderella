// ideally this script would run at a specific time, but it looks like time-driven 
// triggers have a +/- 15 minute window! https://developers.google.com/apps-script/reference/script/clock-trigger-builder
// but at the same time there's a trigger that runs every minute... confused...
// basically we could run a function at exactly 11:45 and another at exactly 12, if we were confident in the timing
// the backup plan is to run this script every minute!?!? and change permissions based on what time it is.

function setPermissions() {
  
  Logger.log("setting permissions...");
  
  // find the doc you want to do this for, and paste in its ID
  // get ID from: https://docs.google.com/document/d/LONGIDSTRINGHERE/edit

  var pumpkinDoc = DriveApp.getFileById('1pDkYbLDteEQtk1V2ufR3Y9gghyiPxgwJRloRomQVCbk');
  var currentTime = new Date();
  
  var chatWindowBegins = new Date();
  chatWindowBegins.setHours(20,45,0); // 8.45 pm
  var chatWindowCloses = new Date();
  chatWindowCloses.setHours(21,0,0); // 9.00 pm
  
  Logger.log("Current Time:" + currentTime);
  Logger.log("Chat Window Begins:" + chatWindowBegins);
  Logger.log("Chat Window Closes:" + chatWindowCloses);

  if((currentTime >= chatWindowBegins) && (currentTime < chatWindowCloses)){
      Logger.log("time to chat!");
        //change overall editing permissions to anyone can edit 
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
    
    //change overall editing permissions to anyone can view
    pumpkinDoc.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW)
      
    }
  
}
