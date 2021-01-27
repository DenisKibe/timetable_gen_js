//js
$(document).ready(function(){
    
    count=0
       /**console.log(ResponseBody.length)**/
       for(let i=0;i<JSON.parse(localStorage.finalTimetable).length;i++){
           //console.log(ResponseBody[i])
           $('#content').append('<div class="card card-cascade wider"><div class="view view-cascade"><!--Title--><h2 class="card-header-title mb-3">'+JSON.parse(localStorage.TimetableDatils)['School_Name']+'</h2><h4>'+JSON.parse(localStorage.TimetableDatils)['Stream_Name']+'</h4></div><div class="card-body card-body-cascade"><table class="table table-bordered"><thead><tr><th scope="col">#</th><th scope="col">8:00-8:40</th><th scope="col">8:40-9:20</th><th scope="col">9:20-9:30</th><th scope="col">9:30-10:10</th><th scope="col">10:10-10:50</th><th scope="col">10:50-11:20</th><th scope="col">11:20-12:00</th><th scope="col">12:00-12:40</th><th scope="col">12:40-1:20</th><th scope="col">1:20-2:00</th><th scope="col">2:00-2:40</th><th scope="col">2:40-3:20</th><th scope="col">3:20-4:00</th></tr></thead><tbody id="r'+count+'x'+i+'"></tbody></table></div>')
           
           for(let j=0;j<JSON.parse(localStorage.finalTimetable)[i].length;j++){
               
               $('#r'+count+'x'+i).append('<tr id="c'+count+'x'+j+'"></tr> <br>');
               
               for(let k=0;k<JSON.parse(localStorage.finalTimetable)[i][j].length;k++){
                   if('c'+count+'x'+j+'x'+k=='c'+count+'x0x0'){
                       $('#c'+count+'x'+j).append('<th scope="row">Monday</th>');
                       
                   }else if('c'+count+'x'+j+'x'+k=='c'+count+'x1x0'){
                       $('#c'+count+'x'+j).append('<th scope="row">Tuesday</th>');
                       
                   }else if('c'+count+'x'+j+'x'+k=='c'+count+'x2x0'){
                       $('#c'+count+'x'+j).append('<th scope="row">Wednesday</th>');
                       
                   }else if('c'+count+'x'+j+'x'+k=='c'+count+'x3x0'){
                       $('#c'+count+'x'+j).append('<th scope="row">Thursday</th>');
                       
                   }else if('c'+count+'x'+j+'x'+k=='c'+count+'x4x0'){
                       $('#c'+count+'x'+j).append('<th scope="row">Friday</th>');
                       
                   }else if(k==2){
                       $('#c'+count+'x'+j).append('<th scope="row">short<br>break</th>');
                   }else if(k==4){
                       $('#c'+count+'x'+j).append('<th scope="row">Long <br> break</th>');
                   }else if(k==7){
                       $('#c'+count+'x'+j).append('<th scope="row">Lunch <br> break</th>');
                   }
                   
                   
                   $('#c'+count+'x'+j).append('<td>'+JSON.parse(localStorage.finalTimetable)[i][j][k]+'</td>');
                   
                   
                    
               }
               
           }
           count++;
       }
              
});