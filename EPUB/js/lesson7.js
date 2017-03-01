
var		posX      = 0;
var		posY      = 0;
var		deltaX    = 0;
var		deltaY    = 0;
var		bFlying   = 0;
var		bStarted  = 0;
var		startTime;
var		endTime;
var		deltaTime;
var		soundEffectID;
var		CannonBall;
var		CannonBallPath;
var     TrajectoryInfo
var		initialiVelocity = 0;
var		intervalID;
var		velocityID;
var		intervalIndex = 0;
var		maxIndex = 0;
var		gravity = 9.802;    // m/s**
var		cannonAngle = 50;	// degrees
var		speedY = 0;
var		speedX = 0;
var		DEG2RAD   = 0.0174532925199433
var		points      = "";
var		pointsCount = 0;

function on_load(evt)
{
    window.JS_svgdoc = document.getElementById('cannon');
    window.CannonBall_next_update = next_update;

    CannonBall     = window.JS_svgdoc.getElementById('CannonBall');
    TrajectoryInfo   = window.JS_svgdoc.getElementById('TrajectoryInfo');
    CannonBallPath   = window.JS_svgdoc.getElementById('PathAnim');
}

function OnMouseDownFire(evt)
{
    posX = evt.getScreenX();
    posY = evt.getScreenY();
    bFlying  = 1;

    initialVelocity = 28;
    speedY = initialVelocity * Math.sin(cannonAngle * DEG2RAD);
    speedX = initialVelocity * Math.cos(cannonAngle * DEG2RAD);

    // figure out time to max height, half the flight-time
    flightTime  = speedY / gravity;
    // then get the max height
    maxHeight = speedY * flightTime;
    // the the flight length
    flightTime *= 2;
    maxLength = flightTime * speedX;

    // soundEffectID.setAttribute("xlink:href", "hit1.wav" );

    intervalIndex = 0;
    maxInterval = Math.ceil(flightTime * 20);  // in intervals of 50 milliseconds

    CannonBallPathID.setAttribute("points", points );
    CannonBallPathID.setAttribute("stroke-opacity", 1.0 );

    intervalID = window.setTimeout('CannonBall_next_update()', 50);
}

function next_update ()
{
    intervalIndex += 1;
    var curTime  = intervalIndex / 20;	// 20 intervals per second

    if (intervalIndex == 1 && bFlying == 1)
    {
        CannonBallID.setAttribute("display", "inline" );
        points="";
    }

    if (intervalIndex >= maxInterval)
    {
        if (bFlying == 0)
        {
            window.clearTimeout( intervalID );
            points = "";
        }
        else
        {
            intervalID = window.setTimeout('CannonBall_next_update()', 50);
            bFlying = 0;
            intervalIndex = 0;
        }
    }
    else
    {
        intervalID = window.setTimeout('CannonBall_next_update()', 50);

        if (bFlying == 1)
        {
            posX = curTime * speedX;
            posY = curTime * speedY - 0.5 * gravity * curTime * curTime;

            points = points + FFormat(posX,1) + ',';
            points = points + FFormat(posY,1) + ' ';
            // InfoID.getFirstChild().setData( 'points: ' + points);

            CannonBallID.setAttribute("cy", posY );
            CannonBallID.setAttribute("cx", posX );
            CannonBallPathID.setAttribute("points", points );

            velocityID.getFirstChild().setData( 't: ' + curTime.toFixed(1) + ' v: ' + velocity.toFixed(1) + ' y: ' + altitude.toFixed(1));
        }
        else
        {
            CannonBallPathID.setAttribute("stroke-opacity", 1.0 - (intervalIndex / maxInterval) );
        }
    }
}


