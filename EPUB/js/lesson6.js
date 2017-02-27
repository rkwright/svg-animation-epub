    var     posY      = 0;
    var     deltaX    = 0;
    var     deltaY    = 0;
    var     traveling = false;
    var     bStarted  = 0;
    var     startTime;
    var     endTime;
    var     deltaTime;
    var     sledgeAnchorX = 227;
    var     sledgeAnchorY = 614;
    var     sledgeID;
    var     bellSoundID;
    var     hitEffectID;
    var     travellerID;
    var     initialiVelocity = 0;
    var     intervalID;
    var     velocityID;
    var     intervalIndex = 0;
    var     maxIndex = 0;
    var     gravity = 9.8;    // m/s**

    function on_load(evt) {
        console.log("On load");
        window.JS_svgdoc = document.getElementById('HighStriker');
        window.Traveller_next_update = next_update;

        //window.JS_svgdoc.addEventListener("mousedown", alert_click, false);

        sledgeID = window.JS_svgdoc.getElementById('Sledge');
        travellerID  = window.JS_svgdoc.getElementById('Traveller');
        velocityID  = window.JS_svgdoc.getElementById('Velocity');
        bellSoundID = window.parent.document.getElementById("audio-bell");
        hitEffectID  = window.parent.document.getElementById('audio-hit');

    }

    function OnMouseDownSledge(evt)
    {
        console.log("OnMouseDownBlock");
        if (traveling == false) {
            traveling = true;
            setSledge( -90 );

            startTime = new Date();
            endTime = new Date();

            initialVelocity = 13.85;

            console.log( 'InitialVelocity: ' + initialVelocity );

            hitEffectID.play();

            intervalID = window.setInterval('Traveller_next_update()', 16);
        }
    }

    function next_update ()
    {
        var curTime = new Date();
        deltaTime = (curTime.getTime() - startTime.getTime()) / 1000.0;

        velocity = initialVelocity - deltaTime * gravity;
        altitude = deltaTime * initialVelocity - 0.5 * gravity * deltaTime * deltaTime;

        console.log("v: " + velocity + " alt: " + altitude);

        // did we ring the bell?
        if (altitude >= 9.7) {
            altitude = 9.7;
            velocity = 0;
            console.log('ringbell!');
            bellSoundID.play();
        }
        else if (altitude <= 0 ) {
            altitude = 0;
            traveling = false;
            hitEffectID.play();
            window.clearInterval( intervalID );
            console.log("Stopping animation");
        }

        if (deltaTime > 1.0)
            setSledge(0);

        travellerID.setAttribute("y", altitude + 0.4778 );
        velocityID.firstChild.nodeValue = ( 't: ' + deltaTime.toFixed(1) + ' v: ' + velocity.toFixed(1) + ' y: ' + altitude.toFixed(1));
    }

    function    setSledge( angle )
    {
        sledgeID.setAttribute("transform", "rotate("+ angle + " " + sledgeAnchorX + " " + sledgeAnchorY + ")");
    }

