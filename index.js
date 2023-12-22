
localStorage.setItem("maxScore", "0");
var rods=document.getElementsByClassName('rod');
var ball=document.getElementById('ball');
var x=0;
let ballPosition="bottom";
var windWidth=window.innerWidth;
var windHeight=window.innerHeight;
function changeWindow(){
    windWidth=window.innerWidth;
    windHeight=window.innerHeight;
  
}
let nameofPerson="";
function initiateApp(){
    alert("Start Playing");
    x=0;
    ball.style.transition="all 0s";
    rods[0].style.transform=`translateX(${x}px)`;
    rods[1].style.transform=`translateX(${x}px)`;
    ball.style.transform=`translateX(${0}px)`;
    ball.style.transform=`translateY(${0}px)`;
    
    nameofPerson="";
     let score=localStorage.getItem("maxScore");
     if(score=="0"){
        alert("This is your First Time");
        


     }else{
        alert(`${localStorage.getItem("maxScorePerson")} has maximum score of ${score}`);
     }
     nameofPerson=prompt("Enter your name");
  
        if(nameofPerson==""){
           alert("Invalid name");
           nameofPerson=prompt("Enter your name");
           
        }
     document.addEventListener('keypress',moveTheRods);
     initialBallPosition(ballPosition);


}
let newposx;
let newposy;
function initialBallPosition(){
    
    if(ballPosition!="top"){
        ball.style.top=`${windHeight-50}px`;
        ball.style.left="0px";
        ball.style.right="0px";

        ball.style.margin="0 auto";
    }else{
        ball.style.top="20px";
        ball.style.left="0px";
        ball.style.right="0px";

        ball.style.margin="0 auto";
    }
    
    document.addEventListener('keypress',moveTheRods);
    newposx=ball.getBoundingClientRect().left;
    newposy=ball.getBoundingClientRect().top;
    let count=0;
    moveTheball();
    let IntervalId=setInterval(function(){
        let posRod=rods[0].getBoundingClientRect();
        let posball=ball.getBoundingClientRect();
        if(posball.left>posRod.right || posball.right<posRod.left){

            if(ballPosition=="top"){
                console.log("over");
                ball.style.transform=`translate(${posball.left-newposx}px,${-30-newposy}px)`;
                ball.style.transition="all 0.2s";
                
            }else{
                console.log("over");
                ball.style.transform=`translate(${posball.left-newposx}px,${windWidth-newposy}px)`;
                ball.style.transition="all 0.2s"; 
            }

          
            clearInterval(IntervalId);
            let maxScore=parseInt(localStorage.getItem("maxScore"));
            setTimeout(function(){
                if(count>maxScore){
                    alert(`Yayyy!!!!, you beat the highest score. Your score is ${count}`);
                    localStorage.setItem("maxScore",count.toString());
                    localStorage.setItem("maxScorePerson",nameofPerson);
                }else{
                    alert(`${nameofPerson} wins with a score of ${count}. Max score is ${maxScore}`);
                }
                initiateApp();
            },1000);
            
            
            
            
        }else{
            moveTheball();
            count+=100;
        }

       
       

    },6000);
   

    
}
console.log(windWidth,windHeight);

function moveTheball(){
    
    let pos=ball.getBoundingClientRect();
    let newx;
    let newy;
    let randomNum=Math.floor(Math.random() * 2) + 1;

    if(ballPosition=="top"){
        if(randomNum==1){
            console.log("random","top");
            newx=Math.floor(Math.random() * (windWidth-30)) + 1;
            newy=windHeight-50;
          
  
            ball.style.transform=`translate(${newx-newposx}px,${newy-newposy}px)`;
            ball.style.transition="all 6s linear";
        }else{
            console.log("","top");
            let newarr=[1,(windWidth-30)];
            let randIndex=Math.floor(Math.random() * 2);
            newx=newarr[randIndex];
            newy=Math.floor(Math.random() * (windHeight-190)) + 150;
   
            ball.style.transform=`translate(${newx-newposx}px,${newy-newposy}px)`;
            ball.style.transition="all 3s linear";

            setTimeout(function(){
                newx=Math.floor(Math.random() * (windWidth-30)) + 1;
                newy=windHeight-50;
            
                ball.style.transform=`translate(${newx-newposx}px,${newy-newposy}px)`;
                ball.style.transition="all 3s linear";
            },3000);
           

        }
       
        ballPosition="bottom";

    }else{
        if(randomNum==1){
            console.log("random","bottm");
            newx=Math.floor(Math.random() * (windWidth-30)) + 1;
            newy=20;
         
            ball.style.transform=`translate(${newx-newposx}px,${newy-newposy}px)`;
            ball.style.transition="all 6s";
        }else{
            console.log("","bottm");
            let newarr=[1,(windWidth-30)];
            let randIndex=Math.floor(Math.random() * 2);
            newx=newarr[randIndex];
            newy=Math.floor(Math.random() * (windHeight-190)) + 150;
           
            ball.style.transform=`translate(${newx-newposx}px,${newy-newposy}px)`;
            ball.style.transition="all 3s";
            setTimeout(function(){
                newx=Math.floor(Math.random() * (windWidth-30)) + 1;
                newy=20;
            
                ball.style.transform=`translate(${newx-newposx}px,${newy-newposy}px)`;
                ball.style.transition="all 3s";
          
            },3000);
           
           

        }
        ballPosition="top";
       

       
    }
    

    

}
function moveTheRods(event){
    let coordRods=rods[0].getBoundingClientRect();

    if(event.key=="a"){
  
       if(coordRods.left>5){
            x-=25;
            rods[0].style.transform=`translateX(${x}px)`;
         
            rods[1].style.transform=`translateX(${x}px)`;
       }
       
       
         
    }else if(event.key=="d"){
        if(coordRods.right+5<windWidth){
            x+=25;
            rods[0].style.transform=`translateX(${x}px)`;
            rods[1].style.transform=`translateX(${x}px)`;
        }
        
       
    }

}
function start(){
 
    window.addEventListener('resize',changeWindow);
    initiateApp();
}
start();

