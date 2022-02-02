song = "";
 function preload()
  {
       song = loadSound("music2.mp3"); 
    }
scoreRightWrist=0;
scoreLeftWrist=0;
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded() {
    console.log('posenet is initalized');
}
function gotPoses(results)
{
    if(results.length>0)
{
    scoreRightWrist=results[0].pose.keypoints[10].score;
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("rightwristX= " + scoreRightWrist + "scoreLeftWrist= " + scoreLeftWrist);

    rightWristX=results[0].pose.rightWrist.X;
    rightWristY=results[0].pose.rightWrist.X;
    console.log("rightwristX= " + rightWristX + "rightWristY = " +rightWristY);

    leftWristX=results[0].pose.leftWrist.X;
    leftWristY=results[0].pose.leftWrist.X;
    console.log("leftwristX= " + leftWristX + "leftWristY = " +leftWristY);  
}
}

function draw() {
    image(video,0,0,600,500);

    fill("#FFB6C1");
    stroke("#FFB6C1");

    if(scoreRightWrist>0.9)
    {
        circle(rightWristX,rightWristY,20);

        if(rightWristY>0&&rightWristY<=100);
        {
            document.getElementById("speed").innerHTML="speed=0.5x";
            song.rate(0.5);
        }
        elseif(rightWristY>100&&rightWristY<=200);
        {
            document.getElementById("speed").innerHTML="speed=1x";
            song.rate(1);
        }
        elseif(rightWristY>200&&rightWristY<=300);
        {
            document.getElementById("speed").innerHTML="speed=1.5x";
            song.rate(1.5);
        }
        elseif(rightWristY>300&&rightWristY<=400);
        {
            document.getElementById("speed").innerHTML="speed=2x";
            song.rate(2);
        }
        elseif(rightWristY>400)
        {
            document.getElementById("speed").innerHTML="speed=2.5x";
            song.rate(2.5); 
        }
    }
    if(scoreLeftWrist>0.9);
    {
        circle(leftWristX,leftWristY,20);
        InNumberleftwristY=Number(leftWristY);
        new_leftWristY=floor(InNumberleftwristY*2);
        leftWristY_divide_1000=new_leftWristY/1000;
        document.getElementById("volume").innerHTML="volume ="+leftWristY_divide_1000;
        song.setVolume(leftWristY_divide_1000);
    }
}
function play()
 {
song.play();
song.setVolume(1);
song.rate(1);
}