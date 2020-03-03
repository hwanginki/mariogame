function coinbox(i,j)					//Konstruktor einer M�nzbox
{
	this.i = i;							//damit ist die M�nzbox eindeutig identifizierbar
	this.j = j;
	this.x = 32*i;						//world-Koordinaten -> f�r Animation in GameLoop()
	this.y = (14-j)*32;
	
	$('#world').append('<div id=\'coinbox' + i.toString() + '_' + j.toString() + '\'></div>');		//erzeuge div f�r die M�nzbox und setze sie in die Spielwelt ein
	this.body = $('#coinbox'+i.toString()+'_'+j.toString());										//hiermit l�sst sich das M�nzbox-div ansprechen
	this.body.css( { 'margin' : '0' ,
					 'padding' : '0' ,
		 		 	 'width' : '32px' , 
		 		 	 'height' : '32px' , 
		 			 'background-image' : 'url(\'mario-img/mario-objects.png\')' , 
					 'background-position' : '-346px -328px' , 	//Bild der M�nzbox bevor Mario die Box aktiviert
					 'position' : 'absolute' ,					//Positionierung der M�nzbox erfolgt relativ zum �bergeordneten world-Div
					 'left' : (32*i).toString() + 'px' ,
					 'bottom' : ((14-j)*32).toString() + 'px' ,
					 'z-index' : '10'  } );						//M�nzboxen sind hinter Mario
	
	$('#world').append('<div id=\'coinboxcoin' + i.toString() + '_' + j.toString() + '\'></div>');	//erzeuge div f�r die M�nze hinter der M�nzbox und setze sie in die Spielwelt ein
	this.coin = $('#coinboxcoin'+i.toString()+'_'+j.toString());									//hiermit l�sst sich das M�nzen-div ansprechen
	this.coin.css( { 'margin' : '0' ,
					 'padding' : '0' ,
		 		 	 'width' : '32px' , 
		 		 	 'height' : '32px' , 
		 			 'background-image' : 'url(\'mario-img/mario-objects.png\')' , 
					 'background-position' : '-96px 0px' , 		//Bild der M�nze hinter der M�nzbox
					 'position' : 'absolute' ,					//Positionierung der M�nze erfolgt relativ zum �bergeordneten world-Div
					 'left' : (32*i).toString() + 'px' ,
					 'bottom' : ((14-j)*32).toString() + 'px' ,
					 'z-index' : '9'  } );						//M�nze ist hinter der M�nzbox
};