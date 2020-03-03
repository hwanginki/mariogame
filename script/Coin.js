function coin(i,j)						//Konstruktor einer M�nze
{
	this.i = i;							//damit ist die M�nze eindeutig identifizierbar
	this.j = j;
	this.x = 32*i;						//world-Koordinaten -> f�r Animation in GameLoop()
	this.y = (14-j)*32;
	
	$('#world').append('<div id=\'coin' + i.toString() + '_' + j.toString() + '\'></div>');		//erzeuge div f�r die M�nze und setze sie in die Spielwelt ein
	this.body = $('#coin'+i.toString()+'_'+j.toString());										//hiermit l�sst sich das M�nzen-div ansprechen
	
	this.body.css( { 'margin' : '0' ,
					 'padding' : '0' ,
		 		 	 'width' : '32px' , 
		 		 	 'height' : '32px' , 
		 			 'background-image' : 'url(\'mario-img/mario-objects.png\')' , 
					 'background-position' : '0px 0px' ,	 	//Bild der M�nze
					 'position' : 'absolute' ,					//Positionierung der M�nze erfolgt relativ zum �bergeordneten world-Div
					 'left' : (32*i).toString() + 'px' ,
					 'bottom' : ((14-j)*32).toString() + 'px' ,
					 'z-index' : '10'  } );						//M�nzen sind hinter Mario
	
	this.body.sprite( { fps: 10 , no_of_frames: 4 } );			//damit sich die M�nze dreht
};