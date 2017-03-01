
var     MIN_ALTITUDE = -175.0;
var     INITIAL_VELOCITY = 24;
var     OPACITY_DECREMENT = 0.005;
var     CANNON_ANGLE = 45;
var		posX      = 0;
var		posY      = 0;
var		bFlying   = false;
var		startTime;
var		deltaTime;
var		CannonSound;
var		CannonBall;
var		CannonBallPath;
var     FireButtonFill;
var     FireButton;
var     TrajectoryInfo;
var		opacity = 1.0;
var		velocity;
var		gravity = 9.802;    // m/s**
var		speedY = 0;
var		speedX = 0;
var		DEG2RAD   = 0.0174532925199433
var		points      = "";


function on_load(evt)
{
    window.JS_svgdoc = document.getElementById('cannon');
    window.CannonBall_next_update = next_update;

    CannonBall     = window.JS_svgdoc.getElementById('CannonBall');
    TrajectoryInfo = window.JS_svgdoc.getElementById('TrajectoryInfo');
    CannonBallPath = window.JS_svgdoc.getElementById('CannonBallPath');
    FireButton     = window.JS_svgdoc.getElementById('FireButton');
    FireButtonFill = window.JS_svgdoc.getElementById('FireButtonFill');
    CannonSound    = window.parent.document.getElementById("audio-cannon");
}

function OnMouseDownFire(evt)
{
    CannonSound.play();
    startTime = new Date();

    posX = evt.screenX;
    posY = evt.screenY;
    CannonBall.setAttribute("display", "inline" );

    points="";
    bFlying = true;
    CannonBall.setAttribute("display", "inline" );

    velocity = INITIAL_VELOCITY;
    speedY = velocity * Math.sin(CANNON_ANGLE * DEG2RAD);
    speedX = velocity * Math.cos(CANNON_ANGLE * DEG2RAD);

    // figure out time to max height, half the flight-time
    flightTime  = speedY / gravity;
    // then get the max height
    maxHeight = speedY * flightTime;
    // the the flight length
    flightTime *= 2;
    maxLength = flightTime * speedX;

    opacity = 1.0;

    CannonBallPath.setAttribute("points", points );
    CannonBallPath.setAttribute("stroke-opacity", 1.0 );
    FireButtonFill.setAttribute("fill", "#000080");
    FireButton.setAttribute("pointer-events", "none" );
    FireButton.setAttribute("opacity", "0.5");
    intervalID = window.setInterval('CannonBall_next_update()', 16);
}

function next_update ()
{
    var curTime = new Date();
    deltaTime = (curTime.getTime() - startTime.getTime()) / 1000.0;

    if (posY < MIN_ALTITUDE && bFlying == true)
    {
        bFlying = false;
        console.log("Done flying");
    }
    else
    {
        if (bFlying == true)
        {
            posX = deltaTime * speedX;
            posY = deltaTime * speedY - 0.5 * gravity * deltaTime * deltaTime;
            velocity = Math.sqrt(speedX*speedX + speedY*speedY);

            //console.log(" x: " + posX.toFixed(1) + " y:" + posY.toFixed(1) + " v: " + velocity.toFixed(1));

            points = points + posX.toFixed(1) + ',';
            points = points + posY.toFixed(1) + ' ';

            CannonBall.setAttribute("cy", posY );
            CannonBall.setAttribute("cx", posX );
            CannonBallPath.setAttribute("points", points );

            TrajectoryInfo.firstChild.nodeValue = 't: ' + deltaTime.toFixed(1) + ' v: ' + velocity.toFixed(1) + ' y: ' + posY.toFixed(1);
        }
        else {
            opacity -= OPACITY_DECREMENT;
            CannonBallPath.setAttribute("stroke-opacity", opacity );
            if (opacity <= 0) {
                window.clearTimeout( intervalID );
                points = "";
                FireButtonFill.setAttribute("fill", "#C00000");
                FireButton.setAttribute("opacity", "1");
                FireButton.setAttribute("pointer-events", "auto" );
            }
        }
    }
}


