/**
A simple script to gather emails with the label "DELETABLE" and delete them if they are inactive for 7 days.
*/
function cleanUp() {
  var delayDays = 7; // Enter # of days before messages are moved to trash
  
  // Find out the date before which we should delete DELETABLE emails
  var maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - delayDays);
  
  // Find all DELETABLE emails
  var label = GmailApp.getUserLabelByName("DELETABLE");
  var threads = label.getThreads();
  
  // Filter out the emails that are before the maxDate
  console.log('Considering # of threads to delete: ', threads.length);
  var threadsToDelete = threads.filter(function(thread) { return thread.getLastMessageDate() < maxDate; });
  
  // Execute deletion
  console.log('Deleting # threads: ', threads.length);
  threads.forEach(function(thread) { thread.moveToTrash(); });
}