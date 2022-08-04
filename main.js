song = "";

leftWristY = 0;
rightWristY = 0;

rightWristX = 0;
leftWristX = 0;

scoreleftWrist = 0;
scorerightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    fill("cyan");

    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        inNumberleftWristY = Number(leftWristY);
        removedecimals = floor(inNumberleftWristY);
        volume = removedecimals / 500;
        document.getElementById("volume").innerHTML = 'volume =' + volume;
        song.setVolume(volume);
    }

    if(scorerightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        }
        else if(rightWristY > 400){
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function play(){
    song.play();
    song.setVolume(0.6);
    song.rate(0.5);
}

function modelLoaded(){
    console.log("model has been intialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristY = results[0].pose.leftWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;

        scoreleftWrist =  results[0].pose.keypoints[9].score;
        scorerightWrist =  results[0].pose.keypoints[10].score;
    }
}