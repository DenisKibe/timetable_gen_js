$(document).ready(function(){
   
    $('#startTime').pickatime({
        autoclose:false,
        darktheme:true
    });
    $('#endTime').pickatime({darktheme:true});
    
    ErrorChecker=''
    
    School_Name='';
    School_Term='';
    Stream_Name='';
    Stream_No='';
    Start_Time='';
    Lesson_Dulation='';
    End_Time='';
    Tbreak_Time='';
    Break_No='';
    
    compulsory=new Array();
    sciences=new Array();
    humanities=new Array();
    technicals=new Array();
    
    $('input[type="checkbox"]').change(function(){
        if($(this).attr('checked'))
            $(this).removeAttr('checked','checked');
        else
            $(this).attr('checked','checked');
    });
    
    $('#generateTT').click(function(e){
       e.preventDefault();
       if($('#schoolName').val() ==''){
          $('#schoolName').removeClass('valid');
          $('#schoolName').addClass('invalid');
          $('#LFS').attr({'data-error':'This is empty'}); 
          ErrorChecker="Error";
       }else{
           $('#schoolName').removeClass('invalid');
           $('#schoolName').addClass('valid');
           $('#LFS').attr({'data-success':'right'});
           School_Name=$('#schoolName').val();
       }
       if($('#term').val() ==''){
          $('#term').removeClass('valid');
          $('#term').addClass('invalid');
          $('#LFT').attr({'data-error':'This is empty'}); 
          ErrorChecker="Error";
       }else{
           $('#term').removeClass('invalid');
           $('#term').addClass('valid');
           $('#LFT').attr({'data-success':'right'});
           School_Term=$('#term').val();
       }
       if($('#streamName').val()==''){
            $('#streamName').removeClass('valid');
            $('#streamName').addClass('invalid');
            $('#LFsN').attr({'data-error':'This is empty'});
            ErrorChecker="Error";
       }else{
            $('#streamName').removeClass('invalid');
            $('#streamName').addClass('valid');
            $('#LFsN').attr({'data-success':'right'});
            Stream_Name=$('#streamName').val();
       }
       if($('#streamNo').val()==''){
           $('#streamNo').removeClass('valid');
           $('#streamNo').addClass('invalid');
           $('#LFsNo').attr({'data-error':'This is empty'});
           ErrorChecker="Error";
       }else{
           $('#streamNo').removeClass('invalid');
           $('#streamNo').addClass('valid');
           $('#LFsNo').attr({'data-success':'right'});
           Stream_No=$('#streamNo').val();
       }
       /*if($('#startTime').val()==''){
           $('#startTime').removeClass('valid');
           $('#startTime').addClass('invalid');
           $('#LFLST').attr({'data-error':'This is empty'});
           ErrorChecker="Error";
       }else{
           $('#startTime').removeClass('invalid');
           $('#startTime').addClass('valid');
           $('#LFLST').attr({'data-success':'right'});
           Start_Time=$('#startTime').val();
       }
       if($('#lessonsDulation').val()==''){
           $('#lessonsDulation').removeClass('valid');
           $('#lessonsDulation').addClass('invalid');
           $('#LFLD').attr({'data-error':'This is empty'});
           ErrorChecker="Error";
       }else{
           $('#lessonsDulation').removeClass('invalid');
           $('#lessonsDulation').addClass('valid');
           $('#LFLD').attr({'data-success':'right'});
           Lesson_Dulation=$('#lessonsDulation').val();
       }
       if($('#endTime').val()==''){
           $('#endTime').removeClass('valid');
           $('#endTime').addClass('invalid');
           $('#LFLET').attr({'data-error':'This is empty'});
           ErrorChecker="Error";
       }else{
           $('#endTime').removeClass('invalid');
           $('#endTime').addClass('valid');
           $('#LFLET').attr({'data-success':'right'});
           End_Time=$('#endTime').val();
       }
       if($('#breaksNo').val()==''){
           $('#breaksNo').removeClass('valid');
           $('#breaksNo').addClass('invalid');
           $('#LFBNo').attr({'data-error':'This isempty'});
           ErrorChecker="Error";
       }else{
           $('#breaksNo').removeClass('invalid');
           $('#breaksNo').addClass('valid');
           $('#LFBNo').attr({'data-success':'right'});
           Break_No=$('#breaksNo').val();
       }
       if($('#TbreakTime').val()==''){
           $('TbreakTime').removeClass('valid');
           $('#TbreakTime').addClass('invalid');
           $('#LFTBT').attr({'data-error':'This is empty'});
           ErrorChecker="Error";
       }else{
           $('#TbreakTime').removeClass('invalid');
           $('#TbreakTime').addClass('valid');
           $('#LFTBT').attr({'data-success':'right'});
           Tbreak_Time=$('#TbreakTime').val();
       }
       */
       
       
       if($('#mathsCheck').attr('checked'))
           compulsory.push('Mathematics');
       if($('#engCheck').attr('checked'))
           compulsory.push('English');
       if($('#kiswCheck').attr('checked'))
           compulsory.push('Kiswahili');
       
       if($('#chemCheck').attr('checked'))
           sciences.push('Chemistry');
       if($('#phyCheck').attr('checked'))
           sciences.push('Physics');
       if($('#bioCheck').attr('checked'))
           sciences.push('Biology');
       
       if($('#geoCheck').attr('checked'))
           humanities.push('Geography');
       if($('#histCheck').attr('checked'))
           humanities.push('History');
       if($('#creCheck').attr('checked'))
           humanities.push('CRE');
       
       if($('#bsCheck').attr('checked'))
           technicals.push('Business Studies');
       if($('#agrCheck').attr('checked'))
           technicals.push('Agriculture');
       if($('#compCheck').attr('checked'))
           technicals.push('Computer');
       
       
       if(ErrorChecker != ''){
           return false;
       }
       else{
           /*  School_Name='';Stream_Name='';Stream_No='';Start_Time='';Lesson_Dulation='';End_Time='';Tbreak_Time='';Break_No=''; */
           localStorage.TimetableDatils=JSON.stringify({'School_Name':School_Name,'School_Term':School_Term,'Stream_Name':Stream_Name,'Stream_No':Stream_No});
           localStorage.subjects=JSON.stringify([compulsory,sciences,humanities,technicals]);
           let subjectsNaNcategory=[];
           
           for(let i=0;i<JSON.parse(localStorage.subjects).length;i++){
               for(let j=0;j<JSON.parse(localStorage.subjects)[i].length;j++){
                   subjectsNaNcategory.push(JSON.parse(localStorage.subjects)[i][j]);
               }
           }
           
           localStorage.subjectsNaNcategory=JSON.stringify(subjectsNaNcategory);
           
           window.location.href='generator.html';
           
       }
       
    });
    
    
    
});