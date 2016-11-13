
// Load native UI library & Node.js FileSystem API
var gui = require('nw.gui');
var fs = require('fs');

// Create an empty menu
var menu = new gui.Menu();

// Add some items with label
menu.append(new gui.MenuItem({ label: 'Item A' }));
menu.append(new gui.MenuItem({ label: 'Item B' }));
menu.append(new gui.MenuItem({ type: 'separator' }));
menu.append(new gui.MenuItem({ label: 'Item C' }));

// Remove one item
menu.removeAt(1);

// Iterate menu's items
for (var i = 0; i < menu.items.length; ++i) {
  console.log(menu.items[i]);
}

// Get the current window
var win = gui.Window.get();

// Create a menubar for window menu
var menubar = new gui.Menu({ type: 'menubar' });

// Create a menuitem
var sub1 = new gui.Menu();

// Here's Our Submenu
 sub1.append(new gui.MenuItem({
label: 'Close All',
click: function() {

	var gui = require('nw.gui');
	gui.App.closeAllWindows()
}
}));

// Here's us adding our submenu
menubar.append(new gui.MenuItem({ label: 'Menu',  submenu: sub1}));

//assign the menubar to window menu
win.menu = menubar;

// add a click event to an existing menuItem
menu.items[0].click = function() { 
    console.log("CLICK"); 
};
