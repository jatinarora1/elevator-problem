

(function() {
  'use strict';
  window.elevator = {
    
    currentFloor: 1,

    moveTo: [],
    
    moving: false,

    travelTime: 1000,

    ding: new Audio('elevatorDing.mp3'),
    
    move: function(){
      if(this.moveTo.length > 0) {

        // move upwards
        if(this.currentFloor - this.moveTo[0] < 0) {
          // move the floor
          if(this.moving) {
            $('.elevator-background').css({'background-position': '0 0px'});
            $('.elevator-background').animate({"background-position-y": "+=460px"}, this.travelTime - 100, 'linear');
          } else {
            $('.elevator-background').animate({"background-position-y": "+=460px"}, this.travelTime - 100, 'linear');
          }
          
          this.moving = true;
          $('.up').attr('color','green');

          setTimeout(function(){
            if(elevator.currentFloor < elevator.moveTo[0]){
              elevator.currentFloor += 1;
              $('.floor').text(elevator.currentFloor);
            }
            elevator.move();
          }, this.travelTime);

        // move downwards
        } else if(this.currentFloor - this.moveTo[0] > 0) {
          // move the floor
          if(this.moving) {
            $('.elevator-background').css({'background-position': '0 442px'});
            $('.elevator-background').animate({"background-position-y": "-=460px"}, this.travelTime - 100, 'linear');
          } else {
            $('.elevator-background').animate({"background-position-y": "-=460px"}, this.travelTime - 100, 'linear');
          }

          this.moving = true;
          $('.down').attr('color','red');
          setTimeout(function(){
            if(elevator.currentFloor > elevator.moveTo[0]){
              elevator.currentFloor -= 1;
              $('.floor').text(elevator.currentFloor);
            }
            elevator.move();
          }, this.travelTime);

        // on floor
        } else {
          $('.elevator-background').css({'background-position': '0 442px'});
          this.moveTo.shift();
          $('.up').removeAttr('color');
          $('.down').removeAttr('color');
          this.moving = false;
          $('.floor' + this.currentFloor).removeClass('glow');
          this.openDoor();
        }
      }
    },

    openDoor: function() {
      // ding
      this.ding.play();

      // open and close door
      $('.door').animate({'width': '0'}, 1000, 'linear');
      $('.door').animate({'width': '100%'}, 1000, 'linear');


      // see if there are still floors to visit if so call move()
      // leaving enough time for door to open and close
      setTimeout(function() {
        if(elevator.moveTo.length) {
          elevator.move();
        }
      }, 1400);
    }

  };

})();

$(function() {

  // add event listener to buttons after document loads
  $('.button').on('click', function(button){
    $(this).addClass('glow');
    elevator.moveTo.push(parseInt(this.dataset.floor));
    if(!elevator.moving) { 
      elevator.move();
    }
  });
  
});
