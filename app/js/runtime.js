// Require Node-Webkit
 var gui = require('nw.gui');

 // Reference to window and tray
    var win = gui.Window.get();
    var tray;

    // Get the minimize event
    win.on('minimize', function() {
        
      // Hide window
      this.hide();
		
      // Show tray and grab icon
      tray = new gui.Tray({ icon: 'icon.png' });

      // Show window and remove tray when clicked
      tray.on('click', function() {
          
	  // Open the application launcher on click to systems tray icon
	  window.open('launcher.html', '_blank', 'screenX=500,screenY=200,width=700,height=460');

      });
    });
	
    // Minimize aDOM whenever application is launched
	win.minimize();
	
	// Open application launcher the first time aDOM is started
        // This script only runs on start, every other open event thereafter is controlled 
        // from open event above
	window.open('launcher.html', '_blank', 'screenX=500,screenY=200,width=700,height=460');

	 