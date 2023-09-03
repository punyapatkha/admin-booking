 // utility
    /**
 * Generate an array of timeslots based on timeinterval
 * Assumption for brevity: 
 * - startTime and endTime are of valid time
 * - in the case where startTime is greater than endTime, the timeSlots 
 *   will go into the next "day". i.e: 
 *      generateTimeslots(60, '23:00', '02:00') = ["23:00", "00:00", "01:00", "02:00"]
 * 
 * @param  {integer} timeInterval   In mins. Can only accept 15, 30 or 60
 *                                  * my version will work with any interval > 0
 * @param  {string}  startTime      '03:45'. Min - '00:00', Max - '24:00'
 * @param  {string}  endTime        '15:00'. Min - '00:00', Max - '24:00'
 * @return {array}                  ['03:45', ....., '15:00']
 */

    function generateTimeslots(timeInterval, startTime, endTime) {
        // get the total minutes between the start and end times.
        var totalMins = subtractTimes(startTime, endTime);
        
        // set the initial timeSlots array to just the start time
        var timeSlots = [startTime];
        
        // get the rest of the time slots.
        return getTimeSlots(timeInterval, totalMins, timeSlots);
      }
      
      /**
       * Generate an array of timeSlots based on timeInterval and totalMins
       *
       * @param  {integer} timeInterval   In mins.
       * @param  {integer} totalMins      In mins.
       * @param  {array}   timeSlots      ['03:45', ....., '15:00']
       * @return {array}                  ['03:45', ....., '15:00']
       */
      function getTimeSlots(timeInterval, totalMins, timeSlots) {
        // base case - there are still more minutes
        if (totalMins - timeInterval >= 0) {
          // get the previous time slot to add interval to
          var prevTimeSlot = timeSlots[timeSlots.length - 1];
          // add timeInterval to previousTimeSlot to get nextTimeSlot
          var nextTimeSlot = addMinsToTime(timeInterval, prevTimeSlot);
          timeSlots.push(nextTimeSlot);
          
          // update totalMins
          totalMins -= timeInterval;
          
          // get next time slot
          return getTimeSlots(timeInterval, totalMins, timeSlots);
        } else {
          // all done!
          return timeSlots;
        }
      }
      
      /**
       * Returns the total minutes between 2 time slots
       *
       * @param  {string} t1    a time string: "12:15"
       * @param  {string} t2    a time string: "14:15"
       * @return {integer}      120
       */
      function subtractTimes(t2, t1) {
        // get each time's hour and min values
        var [t1Hrs, t1Mins] = getHoursAndMinsFromTime(t1);
        var [t2Hrs, t2Mins] = getHoursAndMinsFromTime(t2);
        
        // time arithmetic (subtraction)
        if (t1Mins < t2Mins) {
          t1Hrs--;
          t1Mins += 60;
        }
        var mins = t1Mins - t2Mins;
        var hrs = t1Hrs - t2Hrs;
        
        // this handles scenarios where the startTime > endTime
        if (hrs < 0) {
          hrs += 24;
        }
        
        return (hrs * 60) + mins;
      }
      
      /**
       * Gets the hours and minutes as intergers from a time string
       * 
       * @param  {string} time    a time string: "12:15"
       * @return {array}          [12, 15]
       */
      function getHoursAndMinsFromTime(time) {
        return time.split(':').map(function(str) {
          return parseInt(str);
        });
      }
      
      /**
       * Adds minutes to a time slot.
       *
       * @param  {interger} mins      number of mintues: 15
       * @param  {string}   time      a time slot: "12:15"
       * @return {string}             a time slot: "12:30"
       */
      function addMinsToTime(mins, time) {
        // get the times hour and min value
        var [timeHrs, timeMins] = getHoursAndMinsFromTime(time);
        
        // time arithmetic (addition)
        if (timeMins + mins >= 60) {
          var addedHrs = parseInt((timeMins + mins) / 60);
          timeMins = (timeMins + mins) % 60
          if (timeHrs + addedHrs > 23) {
            timeHrs = (timeHrs + addedHrs) % 24;
          } else {
            timeHrs += addedHrs;
          }
        } else {
          timeMins += mins;
        }
        
        // make sure the time slots are padded correctly
        return String("00" + timeHrs).slice(-2) + ":" + String("00" + timeMins).slice(-2);
      }

      function format2digit_month(any){
        var valAsString = any.toString();
        if (valAsString.length === 1) {
          return"0"+valAsString
        }
        else{
          return valAsString
        }
        return "99"
      }

export {generateTimeslots,format2digit_month};