//core js
$(document).ready(function(){
    alert('Generating...');
    //function get difference between two arrays
    Array.prototype.diff=function(a){
      return this.filter(function(i){return a.indexOf(i)<0;});
    };
    
    /*function to shuffle array*/
    function shuffle(array){
        for(let i=array.length-1;i>0;i--){
            let j=Math.floor(Math.random()*(i+1));
            [array[i],array[j]]=[array[j],array[i]];
        }
    }
    /*end*/
    
    /*class to get Random Science or Humanities*/
    class RandomPicker {
        constructor(ArrSubjects,Cat){
            this.subjects=ArrSubjects;
            this.picCat=Cat;
        }
        
        getRandom(Times){
            localStorage.setItem(this.picCat,JSON.stringify([]));
            
            for(let i=0;i<Times;i++){
                let catSub=this.subjects;
                let newSub=catSub.diff(JSON.parse(localStorage.toRemove));
               let dd=newSub[Math.floor(Math.random()*newSub.length)];
console.log('picked='+dd);
               if(JSON.parse(eval(`localStorage`+`.`+this.picCat)).length==1){
                    
                        if(!(JSON.parse(localStorage.DoubleLessons).includes(dd))){
                            new Changer(this.picCat,dd).startAppend();
                            new Changer('toRemove',dd).startAppend();
                            
                        }else{
                           new Changer('toRemove',dd).startAppend();
                           i--; 
                        }
                    
               }else{
                    if(JSON.parse(localStorage.DoubleLessons).includes(dd)){
                        new Changer('toRemove',dd).startAppend();
                        i--;
                    }else{
                        new Changer(this.picCat,dd).startAppend();
                        new Changer('toRemove',dd).startAppend();
                    }
               }
                 
            }
        }

        getRandomSubject(){
            let CatSub=this.subjects
            let newCatSub=CatSub.diff(this.picCat);
            let dg=newCatSub[Math.floor(Math.random()*newCatSub.length)];
            
            return dg;
        }        
    }
    /*end of class to get Random Science or Humanities*/
    
    /*class for timetable periods;*/
    class TimetablePeriods {
        checkDouble(subj){
            return JSON.parse(localStorage.DoubleLessons).includes(subj);
        }
    }
    /*end of class*/
    
    /*make categories for double Lessons*/
    makeDoublesCat=()=>{
        let ys=[[],[]];
        for(let i=0;i<JSON.parse(localStorage.subjects).length;i++){
            for(let j=0;j<JSON.parse(localStorage.subjects)[i].length;j++){
                
                if(i==1 && j>1){
                    ys[1].push(JSON.parse(localStorage.subjects)[i][j]);
                }
                
                else if(i==3){
                    ys[1].push('Technicals');
                    break;
                }
                else if(i<2){
                    ys[0].push(JSON.parse(localStorage.subjects)[i][j]);
                }
                else if(i>1){
                    ys[1].push(JSON.parse(localStorage.subjects)[i][j]);
                }
            }
        }
        localStorage.doublesCategorying=JSON.stringify(ys);
    }
    makeDoublesCat();
    /*end of function*/
    
    /*function to shuffle categories to be called every new stream*/
    shuffleCat=()=>{
        let vc=JSON.parse(localStorage.doublesCategorying);
        
        shuffle(vc[0]);
        
        shuffle(vc[1]);
        
        localStorage.doublesCategorying=JSON.stringify(vc);
    }
    /*end*/
    
    /*pick a double*/
    pickDouble=()=>{
        let LessonsDouble=[];
        let doublesCat=[0,1,2,3,4].diff(JSON.parse(localStorage.exhaustedCat));
        
        let hj=doublesCat[Math.floor(Math.random()*doublesCat.length)];
        
        LessonsDouble.push(JSON.parse(localStorage.doublesCategorying)[0][hj]);
        LessonsDouble.push(JSON.parse(localStorage.doublesCategorying)[1][hj]); 
        new Changer('exhaustedCat',hj).startAppend();
        
        return LessonsDouble;
    }
    /*end*/
    
    //append a done double lesson
    class Changer {
        constructor(change,appendThis){
            this.changes=change;
            this.toAppend=appendThis;
        }
        startAppend(){
            
            let lsc=JSON.parse(eval(`localStorage`+`.`+this.changes));
            
            lsc.push(this.toAppend);
            
            
            localStorage.setItem(this.changes,JSON.stringify(lsc));
        }
    }
    
    //function to get the number of Random Humanities or sciences to pick
    let NumDet=(subToCheck)=>{
        let numToPick=2;
        for(let i=0;i<JSON.parse(localStorage.DoubleLessons).length;i++){
            if(subToCheck.includes(JSON.parse(localStorage.DoubleLessons)[i])){
                new Changer('toAppCat',JSON.parse(localStorage.DoubleLessons)[i]).startAppend();
                numToPick--;
            }
        }
        return numToPick;
    }
    
    
    /* let startTime=JSON.parse(localStorage.TimetableDatils)['Start_Time'].split(":");
    let endTime=JSON.parse(localStorage.TimetableDatils)['End_Time'].split(":");
    //convert the end time to 24hrs
    if(Number(endTime[0])<12)
        endTime[0]=Number(endTime[0])+12;
     */
    //time difference in minutes between the startTime and Endtime
    //let totalTime=((new Date().setHours(endTime[0],endTime[1]))-(new Date().setHours(startTime[0],startTime[1])))/60000;
    
    //get the total number of periods
    //(totalTime - totalBreaktime)/timePerLesson;
    //let noOfPeriods=(Number(totalTime)-Number(JSON.parse(localStorage.TimetableDatils)['Tbreak_Time']))/Number(JSON.parse(localStorage.TimetableDatils)['Lesson_Dulation']);
    
    let streamsCount=0;
    localStorage.finalTimetable=JSON.stringify([]);
    
    while(streamsCount<Number(JSON.parse(localStorage.TimetableDatils)['Stream_No'])){
        
        let timetable=[[],[],[],[],[]];
        
        var dayCount=0;
        
        //pick a random time for PE, appears once in a week
        let PEperiods=[3,6,9];
        let PE=[PEperiods[Math.floor(Math.random()*PEperiods.length)],Math.floor(Math.random()*5)];
console.log('PE='+PE);
        
        localStorage.exhaustedCat=JSON.stringify([]);
        
        //shuffle the category for doubles.
        shuffleCat();
        
        //loop for the days
        while(dayCount<5){
            localStorage.toAppCat=JSON.stringify([]);
            localStorage.subjectsDone=JSON.stringify([]);
            localStorage.toRemove=JSON.stringify([]);
            //get a lesson double for today;
            localStorage.DoubleLessons=JSON.stringify(pickDouble());
            
            //technical
            localStorage.Technicals=JSON.stringify(['Technicals']);
            //get Random sciences for today
            new RandomPicker(JSON.parse(localStorage.subjects)[1],'Sciences').getRandom(NumDet(JSON.parse(localStorage.subjects)[1]));
            if(JSON.parse(localStorage.Sciences).length<2){
                for(let i=0;i<JSON.parse(localStorage.toAppCat).length;i++){
                    new Changer('Sciences',JSON.parse(localStorage.toAppCat)[i]).startAppend();
                }
                
            };
            
            //get Random humanities for today
            new RandomPicker(JSON.parse(localStorage.subjects)[2],'Humanities').getRandom(NumDet(JSON.parse(localStorage.subjects)[2]));
            if(JSON.parse(localStorage.Humanities).length<2){
                for(let i=0;i<JSON.parse(localStorage.toAppCat).length;i++){
                    if(JSON.parse(localStorage.subjects)[2].includes(JSON.parse(localStorage.toAppCat)[i])){
                        new Changer('Humanities',JSON.parse(localStorage.toAppCat)[i]).startAppend();
                    }
                    
                }
                
            };
            
            //some few variaables
            let p1_c_done=[];
            let p1_c_count=0;
            let p1_c=JSON.parse(localStorage.Sciences);
            var doubleJump=[];
            p1_c.push(JSON.parse(localStorage.subjects)[0][0]);
            var periodCount=0;
            
            //loop period count
            while(periodCount<10/*noOfPeriods*/){
                if(periodCount==0){
                    //period 1
                    var subjectsToday=JSON.parse(localStorage.subjects)[0];
                    for(let i=0;i<JSON.parse(localStorage.Sciences).length;i++){
                        subjectsToday.push(JSON.parse(localStorage.Sciences)[i]);
                    };
                    
                    let subjectPicked=new RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                    if(new TimetablePeriods().checkDouble(subjectPicked)){
                        timetable[dayCount][periodCount]=subjectPicked;
                        timetable[dayCount][periodCount+1]=subjectPicked;
                        new Changer('subjectsDone',subjectPicked).startAppend();
                        periodCount=periodCount+2;
                        if(p1_c.includes(subjectPicked)){
                            p1_c_count++;
                            p1_c_done.push(subjectPicked);
                        }
                    }else{
                        timetable[dayCount][periodCount]=subjectPicked;
                        new Changer('subjectsDone',subjectPicked).startAppend();
                        periodCount++;
                        if(p1_c.includes(subjectPicked)){
                            p1_c_count++;
                            p1_c_done.push(subjectPicked);
                        }
                    }
                }
                else if(periodCount==1){
                    //period 2
                    while(true){
                        subjectPicked=new RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                        if(subjectPicked!=null){
                            break;
                        }
                    };
                    
                    while(true){
                        if(new TimetablePeriods().checkDouble(subjectPicked)){
                            doubleJump.push(subjectPicked);
                            new Changer('subjectsDone',subjectPicked).startAppend();
                            subjectPicked=new RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                        }else{
                            timetable[dayCount][periodCount]=subjectPicked;
                            new Changer('subjectsDone',subjectPicked).startAppend();
                            periodCount++;
                            if(p1_c.includes(subjectPicked)){
                                p1_c_count++;
                                p1_c_done.push(subjectPicked);
                            }
                            
                            break;
                        }
                    };
                    
                }
                else if(periodCount==2){
                    //period 3
                    for(let i=0;i<JSON.parse(localStorage.Humanities).length;i++){
                        subjectsToday.push(JSON.parse(localStorage.Humanities)[i]);
                    };
                    if(doubleJump.length > 0){
                        subjectPicked=doubleJump.shift();
                        timetable[dayCount][periodCount]=subjectPicked;
                        timetable[dayCount][periodCount+1]=subjectPicked;
                        if(p1_c.includes(subjectPicked)){
                            p1_c_count++;
                            p1_c_done.push(subjectPicked);
                        }
                        //check if PE is available on the next period
                        //move it to the next available period.
                        if(PE[0]==(periodCount + 1) && (PE[1]==dayCount))
                            PE=[periodCount+4,dayCount]
                        periodCount=periodCount+2;
                    }
                    else{
                        
                        subjectPicked=new RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                        if(new TimetablePeriods().checkDouble(subjectPicked)){
                            timetable[dayCount][periodCount]=subjectPicked;
                            timetable[dayCount][periodCount+1]=subjectPicked;
                            new Changer('subjectsDone',subjectPicked).startAppend();
                            if(p1_c.includes(subjectPicked)){
                                p1_c_count++;
                                p1_c_done.push(subjectPicked);
                            }
                            //check if PE is available on the next period
                            //move it to the next available period.
                            if(PE[0]==(periodCount + 1) && (PE[1]==dayCount))
                                PE=[periodCount+4,dayCount]
                            periodCount=periodCount+2;
                        }else{
                            timetable[dayCount][periodCount]=subjectPicked;
                            new Changer('subjectsDone',subjectPicked).startAppend();
                            periodCount++;
                            if(p1_c.includes(subjectPicked)){
                                p1_c_count++;
                                p1_c_done.push(subjectPicked);
                            }
                        }    
                    }
                }
                else if(periodCount==3){
                    //period 4
        
                    //if PE is scheduled for today
                    if((PE[0]==periodCount) && (PE[1]==dayCount)){
                        //replace with a humanity
                        let replace=[];
                        
                        for(let i=0;i<JSON.parse(localStorage.Humanities).length;i++){
                            if(!(JSON.parse(localStorage.DoubleLessons).includes(JSON.parse(localStorage.Humanities)[i])) && !(JSON.parse(localStorage.subjectsDone).includes(JSON.parse(localStorage.Humanities)[i]))){
                                replace.push(JSON.parse(localStorage.Humanities)[i]);
                            }
                        }
                        
                        if(replace.length==0){
                            for(let i=0;i<JSON.parse(localStorage.Technicals).length;i++){
                                if(!(JSON.parse(localStorage.DoubleLessons).includes(JSON.parse(localStorage.Technicals)[i]))){
                                    new Changer('subjectsDone',JSON.parse(localStorage.Technicals)[i]).startAppend();
                                    timetable[dayCount][periodCount]='P.E';
                                    periodCount++;
                                  
                                }
                            }
                        }
                        else if(replace.length==1){
                            for(let i=0;i<replace.length;i++){
                                new Changer('subjectsDone',replace[i]).startAppend();
                                timetable[dayCount][periodCount]='P.E';
                                periodCount++;
                                
                            };
                        }
                        else if(replace.length==2){
                            let gg=replace[Math.floor(Math.random()*replace.length)];
                            new Changer('subjectsDone',gg).startAppend();
                            timetable[dayCount][periodCount]='P.E';
                            periodCount++;
                        }
                                
                    }
                    else if(p1_c_count==1){
                        subjectPicked=new RandomPicker(p1_c,p1_c_done).getRandomSubject();
                        let counSet=0;
                        while(true){
                            if(JSON.parse(localStorage.DoubleLessons).includes(subjectPicked)){
                                doubleJump.push(subjectPicked);
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                counSet++;
                                if(counSet<2){
                                    p1_c.splice(p1_c.indexOf(subjectPicked),1);
                                    
                                    subjectPicked=new RandomPicker(p1_c,p1_c_done).getRandomSubject();
                                }
                                else{
                                    subjectPicked=new RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                                }
                            }else{
                                timetable[dayCount][periodCount]=subjectPicked;
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                periodCount++;
                                if(p1_c.includes(subjectPicked)){
                                    p1_c_count++;
                                    p1_c_done.push(subjectPicked);
                                }
                                break;
                            }
                        }
                    }
                    else if(p1_c_count==2){
                        subjectPicked=new RandomPicker(p1_c,p1_c_done).getRandomSubject();
                        while(true){
                            if(JSON.parse(localStorage.DoubleLessons).includes(subjectPicked)){
                                doubleJump.push(subjectPicked);
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                
                                subjectPicked=new RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                            }
                            else{
                                timetable[dayCount][periodCount]=subjectPicked;
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                periodCount++;
                                if(p1_c.includes(subjectPicked)){
                                    p1_c_count++;
                                    p1_c_done.push(subjectPicked);
                                }
                                break;
                            }
                        };
                    }
                    else{
                        subjectPicked=new RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                        while(true){
                            if(JSON.parse(localStorage.DoubleLessons).includes(subjectPicked)){
                                doubleJump.push(subjectPicked);
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                subjectPicked=new RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                            }else{
                                timetable[dayCount][periodCount]=subjectPicked;
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                periodCount++;
                                break;
                            }
                        };
                    }
                }
                else if(periodCount==4){
                    //period 5
                    if(p1_c_count==1){
                        subjectPicked=new RandomPicker(p1_c,p1_c_done).getRandomSubject();
                        let counSet=0;
                        while(true){
                            if(JSON.parse(localStorage.DoubleLessons).includes(subjectPicked)){
                                try{
                                    if(doubleJump.includes(subjectPicked)){
                                        doubleJump.splice(doubleJump.indexOf(subjectPicked),1);
                                    }
                                }
                                finally{
                                    timetable[dayCount][periodCount]=subjectPicked;
                                    timetable[dayCount][periodCount+1]=subjectPicked;
                                    new Changer('subjectsDone',subjectPicked).startAppend();
                                    periodCount=periodCount+2;
                                    if(p1_c.includes(subjectPicked)){
                                        p1_c_count++;
                                        p1_c_done.push(subjectPicked);
                                    }
                                    break;
                                };
                            }else{
                                timetable[dayCount][periodCount]=subjectPicked;
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                periodCount++;
                                if(p1_c.includes(subjectPicked)){
                                    p1_c_count++;
                                    p1_c_done.push(subjectPicked);
                                }
                                break;
                            }
                        }
                    }
                    else if(p1_c_count==2){
                        
                            subjectPicked=new RandomPicker(p1_c,p1_c_done).getRandomSubject();
                            if(subjectPicked==null){
                                if(doubleJump.length>0){
                                    subjectPicked=doubleJump.pop();
                                }
                            }
                        
                        
                        while(true){
                            if(JSON.parse(localStorage.DoubleLessons).includes(subjectPicked)){
                                try{
                                    if(doubleJump.includes(subjectPicked)){
                                        doubleJump.splice(doubleJump.indexOf(subjectPicked),1);
                                    }
                                }
                                finally{
                                    timetable[dayCount][periodCount]=subjectPicked;
                                    timetable[dayCount][periodCount+1]=subjectPicked;
                                    new Changer('subjectsDone',subjectPicked).startAppend();
                                    periodCount=periodCount+2;
                                    if(p1_c.includes(subjectPicked)){
                                        p1_c_count++;
                                        p1_c_done.push(subjectPicked);
                                    }
                                    break;
                                };
                            }else{
                                timetable[dayCount][periodCount]=subjectPicked;
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                periodCount++;
                                if(p1_c.includes(subjectPicked)){
                                    p1_c_count++;
                                    p1_c_done.push(subjectPicked);
                                }
                                break;
                            }
                        };
                    }
                    else{
                        if(doubleJump.length>0){
                            subjectPicked=doubleJump.shift();
                            timetable[dayCount][periodCount]=subjectPicked;
                            timetable[dayCount][periodCount+1]=subjectPicked;
                            periodCount=periodCount+2;
                        }
                        else{
                            subjectPicked=new RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                            if(new TimetablePeriods().checkDouble(subjectPicked)){
                                timetable[dayCount][periodCount]=subjectPicked;
                                timetable[dayCount][periodCount+1]=subjectPicked;
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                periodCount=periodCount+2;
                            }
                            else{
                                timetable[dayCount][periodCount]=subjectPicked;
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                periodCount++;
                            }
                        }
                    }
                }
                else if(periodCount==5){
                    //period 6
                    if(p1_c_count==2){
                        subjectPicked=new RandomPicker(p1_c,p1_c_done).getRandomSubject();
                        while(true){
                            if(JSON.parse(localStorage.DoubleLessons).includes(subjectPicked)){
                                try{
                                    if(doubleJump.includes(subjectPicked)){
                                        doubleJump.splice(doubleJump.indexOf(subjectPicked),1);
                                    }
                                }
                                finally{
                                    timetable[dayCount][periodCount]=subjectPicked;
                                    timetable[dayCount][periodCount+1]=subjectPicked;
                                    new Changer('subjectsDone',subjectPicked).startAppend();
                                    if(p1_c.includes(subjectPicked)){
                                        p1_c_count++;
                                        p1_c_done.push(subjectPicked);
                                    }
                                    //check PE.
                                    if(PE[0]==(periodCount + 1) && (PE[1]==dayCount))
                                        PE=[periodCount+4,dayCount];
                                    periodCount=periodCount+2;
                                    break;
                                };
                            }else{
                                timetable[dayCount][periodCount]=subjectPicked;
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                periodCount++;
                                if(p1_c.includes(subjectPicked)){
                                    p1_c_count++;
                                    p1_c_done.push(subjectPicked);
                                }
                                break;
                            }
                        };
                    }
                    else{
                        if(doubleJump.length>0){
                            subjectPicked=doubleJump.shift();
                            timetable[dayCount][periodCount]=subjectPicked;
                            timetable[dayCount][periodCount]=subjectPicked;
                            
                            //check PE
                            if(PE[0]==(periodCount + 1) && (PE[1]==dayCount))
                                PE=[periodCount+4,dayCount];
                            periodCount=periodCount+2;
                        }
                        else{
                            subjectPicked=new RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                            if(new TimetablePeriods().checkDouble(subjectPicked)){
                                timetable[dayCount][periodCount]=subjectPicked;
                                timetable[dayCount][periodCount+1]=subjectPicked;
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                
                                //check PE
                                if(PE[0]==(periodCount + 1) && (PE[1]==dayCount))
                                    PE=[periodCount+4,dayCount];
                                periodCount=periodCount+2;
                            }
                            else{
                                timetable[dayCount][periodCount]=subjectPicked;
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                periodCount++;
                            }
                        }
                    }
                }
                else if(periodCount==6){
                    //period 7
                    for(let i=0;i<JSON.parse(localStorage.Technicals).length;i++){
                        subjectsToday.push(JSON.parse(localStorage.Technicals)[i]);
                    };
                    
                    //append PE
                    if((PE[0]==periodCount) && (PE[1]==dayCount)){
                        //replace with a humanity
                        let replace=[];
                        
                        for(let i=0;i<JSON.parse(localStorage.Humanities).length;i++){
                            if(!(JSON.parse(localStorage.DoubleLessons).includes(JSON.parse(localStorage.Humanities)[i])) && !(JSON.parse(localStorage.subjectsDone).includes(JSON.parse(localStorage.Humanities)[i]))){
                                replace.push(JSON.parse(localStorage.Humanities)[i]);
                            }
                        }
                        
                        if(replace.length==0){
                            for(let i=0;i<JSON.parse(localStorage.Technicals).length;i++){
                                if(!(JSON.parse(localStorage.DoubleLessons).includes(JSON.parse(localStorage.Technicals)[i]))){
                                    new Changer('subjectsDone',JSON.parse(localStorage.Technicals)[i]).startAppend();
                                    timetable[dayCount][periodCount]='P.E';
                                    periodCount++; 
                                }
                                else{
                                    PE=[periodCount+3,dayCount];
                                }
                            }
                        }
                        else if(replace.length==1){
                            for(let i=0;i<replace.length;i++){
                                new Changer('subjectsDone',replace[i]).startAppend();
                                timetable[dayCount][periodCount]='P.E';
                                periodCount++;
                                
                            }
                        }
                        else if(replace.length==2){
                            let gg=replace[Math.floor(Math.random()*replace.length)];
                            new Changer('subjectsDone',gg).startAppend();
                            timetable[dayCount][periodCount]='P.E';
                            periodCount++;
                        }
                    }
                    else{
                        
                        subjectPicked=new  RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                        console.log(subjectPicked+' 1st');
                        while(true){
                            if(new TimetablePeriods().checkDouble(subjectPicked)){
                                
                                doubleJump.push(subjectPicked);
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                subjectPicked=new  RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                                
                                if(doubleJump.length>1){
                                    subjectPicked=doubleJump.pop();
                                    timetable[dayCount][periodCount]=subjectPicked;
                                    timetable[dayCount][periodCount+1]=subjectPicked;
                                    // new Changer('subjectsDone',subjectPicked).startAppend();
                                    periodCount=periodCount+2;
                                    break;
                            
                                }
                            }
                            else{
                                timetable[dayCount][periodCount]=subjectPicked;
                                new Changer('subjectsDone',subjectPicked).startAppend();
                                periodCount++;
                                break;
                            }
                        };
                    }
                }
                else if(periodCount==7){
                    //period 8
                    for(let i=0;i<JSON.parse(localStorage.Technicals).length;i++){
                        if(! subjectsToday.includes(JSON.parse(localStorage.Technicals)[i])){
                            subjectsToday.push(JSON.parse(localStorage.Technicals)[i]);
                        }
                    };
                    console.log(doubleJump.length);
                    
                    if(doubleJump.length>0){
                        subjectPicked=doubleJump.shift();
                        timetable[dayCount][periodCount]=subjectPicked;
                        timetable[dayCount][periodCount+1]=subjectPicked;
                        periodCount=periodCount+2;
                    }
                    else{
                        subjectPicked=new RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                        if(new TimetablePeriods().checkDouble(subjectPicked)){
                            timetable[dayCount][periodCount]=subjectPicked;
                            timetable[dayCount][periodCount+1]=subjectPicked;
                            new Changer('subjectsDone',subjectPicked).startAppend();
                            periodCount=periodCount+2;
                        }else{
                            timetable[dayCount][periodCount]=subjectPicked;
                            new Changer('subjectsDone',subjectPicked).startAppend();
                            periodCount++;
                        }
                    }
                }
                else if(periodCount==8){
                    //period 9
                    if(doubleJump.length>0){
                        subjectPicked=doubleJump.shift();
                        timetable[dayCount][periodCount]=subjectPicked;
                        timetable[dayCount][periodCount+1]=subjectPicked;
                        //check PE
                        if((PE[0]==(periodCount+1)) && (PE[1]==dayCount))
                            PE=[periodCount-5,dayCount+1];
                        periodCount=periodCount+2;
                    }
                    else{
                        subjectPicked=new RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                        console.log(subjectPicked);
                        console.log(subjectsToday);
                        if(new TimetablePeriods().checkDouble(subjectPicked)){
                            timetable[dayCount][periodCount]=subjectPicked;
                            timetable[dayCount][periodCount+1]=subjectPicked;
                            new Changer('subjectsDone',subjectPicked).startAppend();
                            //check PE
                            if((PE[0]==(periodCount+1)) && (PE[1]==dayCount))
                                PE=[periodCount-5,dayCount+1];
                            periodCount=periodCount+2;
                        }else{
                            timetable[dayCount][periodCount]=subjectPicked;
                            new Changer('subjectsDone',subjectPicked).startAppend();
                            periodCount++;
                        }
                    }
                }
                else if(periodCount==9){
                    //period 10
                    if((PE[0]==periodCount) && (PE[1]==dayCount)){
                        //replace with a humanity
                        let replace=[];
                        
                        for(let i=0;i<JSON.parse(localStorage.Humanities).length;i++){
                            if(!(JSON.parse(localStorage.DoubleLessons).includes(JSON.parse(localStorage.Humanities)[i])) && !(JSON.parse(localStorage.subjectsDone).includes(JSON.parse(localStorage.Humanities)[i]))){
                                replace.push(JSON.parse(localStorage.Humanities)[i]);
                            }
                        }
                        
                        if(replace.length==0){
                            for(let i=0;i<JSON.parse(localStorage.Technicals).length;i++){
                                if(!(JSON.parse(localStorage.DoubleLessons).includes(JSON.parse(localStorage.Technicals)[i]))){
                                    new Changer('subjectsDone',JSON.parse(localStorage.Technicals)[i]).startAppend();
                                    timetable[dayCount][periodCount]='P.E';
                                    periodCount++; 
                                }
                                else{
                                    PE=[periodCount-6,dayCount+1];
                                }
                            }
                        }
                        else if(replace.length==1){
                            for(let i=0;i<replace.length;i++){
                                new Changer('subjectsDone',replace[i]).startAppend();
                                timetable[dayCount][periodCount]='P.E';
                                periodCount++;
                                
                            }
                        }
                        else if(replace.length==2){
                            let gg=replace[Math.floor(Math.random()*replace.length)];
                            new Changer('subjectsDone',gg).startAppend();
                            timetable[dayCount][periodCount]='P.E';
                            periodCount++;
                        }
                    }
                    else{
                        subjectPicked=new RandomPicker(subjectsToday,JSON.parse(localStorage.subjectsDone)).getRandomSubject();
                        timetable[dayCount][periodCount]=subjectPicked;
                        new Changer('subjectsDone',subjectPicked).startAppend();
                        periodCount++;
                        
                    }
                }
            };//while loop periods
            dayCount++;
            
        }
        new Changer('finalTimetable',timetable).startAppend();
        streamsCount++;
        
    }
    setTimeout(window.location.href='timetable.html',5000);

});
