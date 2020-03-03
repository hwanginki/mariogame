function starbox(i,j)					//Konstruktor einer Sternbox
{
	this.i = i;							//damit ist die Box eindeutig identifizierbar
	this.j = j;
	this.x = 32*i;						//world-Koordinaten -> f�r Animation in GameLoop()
	this.y = (14-j)*32;
	
	this.star_x = this.x;				//world-Koordinaten des Sterns
	this.star_y = this.y;
	this.velocity_y = 12;				//Startgeschwindigkeit des Sterns
	
	this.activated = false;				//hat Mario die Box schon ausgel�st?
	
	$('#world').append('<div id=\'starbox' + i.toString() + '_' + j.toString() + '\'></div>');		//erzeuge div f�r die Box und setze sie in die Spielwelt ein
	this.body = $('#starbox'+i.toString()+'_'+j.toString());										//hiermit l�sst sich das Sternbox-div ansprechen
	this.body.css( { 'margin' : '0' ,
					 'padding' : '0' ,
		 		 	 'width' : '32px' , 
		 		 	 'height' : '32px' , 
		 			 'background-image' : 'url(\'mario-img/mario-objects.png\')' , 
					 'background-position' : '-96px -33px' , 	//Bild der ?-Box bevor Mario die Box aktiviert
					 'position' : 'absolute' ,					//Positionierung der Box erfolgt relativ zum �bergeordneten world-Div
					 'left' : (32*i).toString() + 'px' ,
					 'bottom' : ((14-j)*32).toString() + 'px' ,
					 'z-index' : '99'  } );						//Boxen sind hinter Mario
	this.body.sprite( { fps: 8 , no_of_frames: 4 } );			//damit sich die ?-Box dreht
	
	$('#world').append('<div id=\'star' + i.toString() + '_' + j.toString() + '\'></div>');	//erzeuge div f�r den Stern hinter der Sternbox und setze ihn in die Spielwelt ein
	this.star = $('#star'+i.toString()+'_'+j.toString());									//hiermit l�sst sich das Stern-div ansprechen
	this.star.css( { 'margin' : '0' ,
					 'padding' : '0' ,
		 		 	 'width' : '32px' , 
		 		 	 'height' : '32px' , 
		 			 'background-image' : 'url(\'mario-img/mario-objects.png\')' , 
					 'background-position' : '-32px -69px' ,	//Bild des Sterns hinter der Box
					 'position' : 'absolute' ,					//Positionierung des Sterns erfolgt relativ zum �bergeordneten world-Div
					 'left' : (32*i).toString() + 'px' ,
					 'bottom' : ((14-j)*32).toString() + 'px' ,
					 'z-index' : '98'  } );						//Stern ist hinter der Box
};

starbox.prototype.move = function()			//der Flug des Sterns
{
	this.star_x += 3;						//neue Sternkoordinaten
	this.star_y += this.velocity_y;
	this.velocity_y -= 0.5;					//Reduzierung der Fallgeschwindigkeit aufgrund der Fallbeschleunigung
	
	//F�ngt Mario den Stern?
	if( this.star_x + 2 > mario.x  && this.star_x < mario.x + 50 && this.star_y + 32 > mario.y && this.star_y < mario.y + 40 )
	{
		this.star.destroy().remove();		//der Stern wird aufgefangen
		if( !mario.deadly && !mario.dead && !mario.finished )//wenn man gerade eben schon einen Stern gefangen hat, wirkt der neue nicht
		{
			music.pause();
			invincibilityMusic.currentTime = 0;
			invincibilityMusic.play();
			mario.deadly = true;
			mario.invincible(10);			// 무적시간
			setTimeout( function() 
							{ 
								mario.deadly = false; 
								if(music.paused) 
								{ 
									music.currentTime = 0; 
									music.play(); 
								} 
							} , 11000 );
		}
	}
	
	//der n�chste Move:
	else if( this.star_y > -32 && !mario.dead )	//falls der Stern noch nicht im Boden verschwunden ist
	{
		var This = this;					//Erstellen eines this-Klons f�r das folgende setTimeout!!!
		setTimeout( function() { This.move(); } , 20 );
	}
};