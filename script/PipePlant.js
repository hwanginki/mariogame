function pipeplant(i,j)					//Konstruktor einer R�hrenpflanze
{
	this.i = i;							//damit ist die Pflanze eindeutig identifizierbar
	this.j = j;
	this.x = 32*i + 15;					//world-Koordinaten -> f�r Animation in GameLoop()
	this.y = (14-j)*32;
	this.Delta_y = -2;					//so weit ist die Pflanze in der R�hre verschwunden
	
	this.state = 'up';					//'up', 'down', 'moving_up' und 'moving_down'
	this.timecount = 0;
	
	this.dead = false;
	
	$('#world').append('<div id=\'pipeplantframe' + i.toString() + '_' + j.toString() + '\'></div>');	//erzeuge div f�r die Pflanze und setze sie in die Spielwelt ein
	this.frame = $('#pipeplantframe'+i.toString()+'_'+j.toString());									//hiermit l�sst sich das Framecontainer-div ansprechen
	
	this.frame.css( { 'margin' : '0' ,
					  'padding' : '0' ,
		 		 	  'width' : '34px' , 
		 		 	  'height' : '42px' , 
					  'position' : 'absolute' ,					//Positionierung des Framecontainers erfolgt relativ zum �bergeordneten world-Div
					  'left' : (32*i+15).toString() + 'px' ,
					  'bottom' : ((14-j)*32).toString() + 'px' ,
					  'overflow' : 'hidden' ,					//damit die Pflanze in der darunterliegenden R�hre verschwinden kann
					  'z-index' : '99'  } );					//Pflanzen sind hinter Mario
	
	this.frame.append('<div id=\'pipeplant' + i.toString() + '_' + j.toString() + '\'></div>');		//erzeuge div f�r die Pflanze und setze sie in den Framecontainer ein
	this.body = $('#pipeplant'+i.toString()+'_'+j.toString());										//hiermit l�sst sich das Pflanzen-div ansprechen
	
	this.body.css( { 'margin' : '0' ,
					 'padding' : '0' ,
		 		 	 'width' : '34px' , 
		 		 	 'height' : '42px' , 
		 			 'background-image' : 'url(\'mario-img/mario-enemies.png\')' , 
					 'background-position' : '0px -56px' ,	 	//Bild der Pflanze
					 'position' : 'absolute' ,					//Positionierung der Pflanze erfolgt relativ zum �bergeordneten Framecontainer
					 'left' : '0px' ,
					 'bottom' : '-2px' } );
	
	this.body.sprite( { fps: 5 , no_of_frames: 2 } );			//damit die Pflanze schnappt
};

pipeplant.prototype.bite = function()		//die Pflanze beisst zu
{
	if( this.dead )    return;
	
	//Bewegung der Pflanze:
	if( this.state === 'up' )
	{
		this.timecount++;
		if( this.timecount > 150 )			//entspricht Dauer, die die Pflanze oben bleibt
		{
			this.state = 'moving_down';
			this.timecount = 0;
		}
	}
	else if( this.state === 'moving_down' )
	{
		this.Delta_y -= 1;					//Pflanze verschwindet in der R�hre
		if( this.Delta_y < -44 )
			this.state = 'down';
	}
	else if( this.state === 'down' )
	{
		this.timecount++;
		if( this.timecount > 150 )			//entspricht Dauer, die die Pflanze unten bleibt
			if( this.y != mario.y || this.x + 2 <= mario.x  || this.x >= mario.x + 50 )	//Mario steht auf der R�hre => die Pflanze bleibt weiterhin unten!
			{
				this.state = 'moving_up';
				this.timecount = 0;
			}
	}
	else
	{
		this.Delta_y += 1;					//Pflanze kommt wieder aus der R�hre raus
		if( this.Delta_y > -3 )
			this.state = 'up';
	}
	
	//Erwischt die Planze den Mario?
	if( this.x + 2 > mario.x  && this.x < mario.x + 50 && this.y + this.Delta_y + 42 > mario.y && this.y + this.Delta_y < mario.y + 40 )
		if( mario.deadly )
			this.die();
		else
			mario.hurt();
	
	//Falls Mario lebendig und noch nicht fertig ist, kommt der n�chste Move:
	if( !mario.dead && !mario.finished )
	{
		var This = this;
		setTimeout( function() { This.bite(); } , 20 );
	}
};

pipeplant.prototype.die = function()	//die Pflanze stirbt, weil Mario gerade unbesiegbar ist
{
	if( this.dead )	return;
	sounds.play('shell');
	this.dead = true;
	
	this.body.destroy().css( { 'background-position' : '-68px -56px' } );	//Bild der umgedrehten Pflanze
	this.Delta_y = -2;					//die Pflanze schaut ganz aus der R�hre raus
	
	var This = this;		//Erstellen eines this-Klons, weil in der complete-Fkt. der jQuery-animate()-Methode this auf this.body verweist!!!! 
	this.frame.animate( { 'bottom' : '+=100' } , 250 , function() 
			{
				This.frame.animate( { 'bottom' : '-=100' } , 250 , function() 
						{
							var timer = setInterval( function() 
									{
										This.Delta_y -= 8;
										
										if( This.Delta_y < -50 )
										{
											clearInterval(timer);
											This.body.remove();
											This.frame.remove();
										}
									} , 20 );
						} );
			} );
};