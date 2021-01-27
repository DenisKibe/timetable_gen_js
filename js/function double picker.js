//pick a double category without replacement.
    
    doubleCategoryPicker=(cat,times)=>{
        let lessonDouble=[]
        let doubleCategory=cat;
        for(j=0;j<times;j++){
            
            yy=doubleCategory[Math.floor(Math.random()*doubleCategory.length)];
            
            lessonDouble.push(yy);
            //remove the selected cat to prevent replacement.
            doubleCategory=cat.diff(lessonDouble);
            
        }
        return lessonDouble;
    }
  
    function pickDouble(){
        let LessonsDouble=[];
        let Times=2;
        while(true){
            
            //get two cats for today.
            let newCat=[0,1,2,3].diff(JSON.parse(localStorage.exhaustedCat));
            
            localStorage.catsDoubleToday=JSON.stringify(doubleCategoryPicker(newCat,Times));
            
            
            //get the lessons from the cats.
            for(i=0;i<JSON.parse(localStorage.catsDoubleToday).length;i++){
                
                
                if(Number(JSON.parse(localStorage.catsDoubleToday)[i])==3){
                    
                    //This is technical
                    //check if it has already been done or not
                    
                    if(JSON.parse(localStorage.DoublesDone).includes('Technicals')){
                        
                        if(JSON.parse(localStorage.exhaustedCat).includes(JSON.parse(localStorage.catsDoubleToday)[i])){
                            
                        }else{
                            new Changer('exhaustedCat',Number(JSON.parse(localStorage.catsDoubleToday)[i])).startAppend();
                        }
                    }else{
                        LessonsDouble.push('Technicals');
                        //append to DoublesDone
                        new Changer('DoublesDone','Technicals').startAppend();
                    }
                }else{
                    
                    for(let j=0;j<((JSON.parse(localStorage.subjects)[JSON.parse(localStorage.catsDoubleToday)[i]].length)+1);j++){
                        if(j==(JSON.parse(localStorage.subjects)[JSON.parse(localStorage.catsDoubleToday)[i]].length)){
                            
                            //append this to exhaustedCat
                            if(JSON.parse(localStorage.exhaustedCat).includes(JSON.parse(localStorage.catsDoubleToday)[i])){
                               
                               break;
                            }else{
                                
                                new Changer('exhaustedCat',Number(JSON.parse(localStorage.catsDoubleToday)[i])).startAppend();
                                break;
                            }
                            
                        }
                        else if((JSON.parse(localStorage.DoublesDone)).includes(JSON.parse(localStorage.subjects)[JSON.parse(localStorage.catsDoubleToday)[i]][j])){
                            
                          //go to the next item
                        }else{
                           
                            LessonsDouble.push(JSON.parse(localStorage.subjects)[JSON.parse(localStorage.catsDoubleToday)[i]][j]);
                            new Changer('DoublesDone',JSON.parse(localStorage.subjects)[JSON.parse(localStorage.catsDoubleToday)[i]][j]).startAppend();
                            break;
                        }
                    }
                }
                
            }
            
            if(LessonsDouble.length==2){
                break;
            }else{
                if(Times==2){
                    Times=Times-(LessonsDouble.length);
                }
                
            }
        }
        console.log('DoubleLessons='+LessonsDouble);
        return LessonsDouble;
        
    };
    
    /*end of the function to get double lessons*/