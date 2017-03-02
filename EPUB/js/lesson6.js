    var     posY      = 0;
    var     initialVelocity = 0;
    var     traveling = false;
    var     startTime;
    var     deltaTime;
    var     sledgeAnchorX = 227;
    var     sledgeAnchorY = 614;
    var     sledge;
    var     bellSound;
    var     hitSound;
    var     traveller;
    var     intervalID;
    var     velocity;
    var     gravity = 9.8;    // m/s**

    function on_load(evt) {
        console.log("On load");
        window.JS_svgdoc = document.getElementById('HighStriker');
        window.Traveller_next_update = next_update;

        sledge    = window.JS_svgdoc.getElementById('Sledge');
        traveller = window.JS_svgdoc.getElementById('Traveller');
        info      = window.JS_svgdoc.getElementById('Velocity');
        bellSound = window.parent.document.getElementById("audio-bell");
        hitSound  = window.parent.document.getElementById('audio-hit');
    }

    function OnMouseDownSledge(evt)
    {
        console.log("OnMouseDownBlock");
        if (traveling == false) {
            traveling = true;
            setSledge( -90 );

            startTime = new Date();

            initialVelocity = 13.85;

            console.log( 'InitialVelocity: ' + initialVelocity );

            hitSound.play();

            intervalID = window.setInterval('Traveller_next_update()', 16);
        }
    }

    function next_update ()
    {
        var curTime = new Date();
        deltaTime = (curTime.getTime() - startTime.getTime()) / 1000.0;

        velocity = initialVelocity - deltaTime * gravity;
        posY = deltaTime * initialVelocity - 0.5 * gravity * deltaTime * deltaTime;

        //console.log("v: " + velocity + " alt: " + altitude);

        // did we ring the bell?
        if (posY >= 9.7) {
            posY = 9.7;
            velocity = 0;
            bellSound.play();
        }
        else if (posY <= 0 ) {
            posY = 0;
            traveling = false;
            hitSound.play();
            window.clearInterval( intervalID );
        }

        if (deltaTime > 1.0)
            setSledge(0);

        traveller.setAttribute("y", posY + 0.4778 );
        info.firstChild.nodeValue = ( 't: ' + deltaTime.toFixed(1) + ' v: ' + velocity.toFixed(1) + ' y: ' + posY.toFixed(1));
    }

    function setSledge( angle )
    {
        sledge.setAttribute("transform", "rotate("+ angle + " " + sledgeAnchorX + " " + sledgeAnchorY + ")");
    }

