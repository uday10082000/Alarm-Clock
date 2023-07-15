 // Update the clock every second
 setInterval(updateClock, 1000);

 function updateClock() {
     var now = new Date();
     var hours = now.getHours();
     var minutes = now.getMinutes();
     var seconds = now.getSeconds();

     document.getElementById('hours').textContent = formatTime(hours);
     document.getElementById('minutes').textContent = formatTime(minutes);
     document.getElementById('seconds').textContent = formatTime(seconds);
 }

 function formatTime(time) {
     return time.toString().padStart(2, '0');
 }

 function setAlarm() {
     var alarmHours = parseInt(document.getElementById('alarm-hours').value);
     var alarmMinutes = parseInt(document.getElementById('alarm-minutes').value);
     var alarmSeconds = parseInt(document.getElementById('alarm-seconds').value);
     var alarmAmPm = document.getElementById('alarm-am-pm').value;

     var currentTime = new Date();
     var alarmTime = new Date();

     if (alarmAmPm === 'AM') {
         alarmHours += 12;
     }

     alarmTime.setHours(alarmHours);
     alarmTime.setMinutes(alarmMinutes);
     alarmTime.setSeconds(alarmSeconds);
     alarmTime.setMilliseconds(0);

     if (alarmTime.getTime() <= currentTime.getTime()) {
         alert('Invalid time! Please select a future time.');
         return;
     }

     var alarm = {
         time: alarmTime.toLocaleTimeString(),
         timestamp: alarmTime.getTime()
     };

     var alarmsList = document.getElementById('alarms-list');
     var alarmItem = document.createElement('li');
     alarmItem.textContent = alarm.time;

     var deleteButton = document.createElement('button');
     deleteButton.textContent = 'Delete';
     deleteButton.className = 'btn btn-danger btn-sm ml-2';
     deleteButton.addEventListener('click', function () {
         deleteAlarm(alarmItem, alarm.timestamp);
     });

     alarmItem.appendChild(deleteButton);
     alarmsList.appendChild(alarmItem);

     setTimeout(function () {
         alert('Wake up!');
         deleteAlarm(alarmItem, alarm.timestamp);
     }, alarmTime.getTime() - currentTime.getTime());
 }

 function deleteAlarm(alarmItem, timestamp) {
     alarmItem.parentNode.removeChild(alarmItem);
     clearTimeout(timestamp);
 }

 document.getElementById('set-alarm').addEventListener('click', setAlarm);