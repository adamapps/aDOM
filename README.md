aDOM
====

Desktop runtime for html applications based off of Node-Webkit

aDOM is an open source project I am hoping to get kicked off and is basically a desktop runtime for html applications based off of <a title="Runtime for HTML Applications " href="https://github.com/rogerwang/node-webkit" target="_blank">Node-Webkit</a> and the <a title="Front-End Framework for HTML Applications" href="http://foundation.zurb.com/" target="_blank">Foundation front-end framework</a>. It's real raw right now but I'm hoping to continue adding to the project when ever I make changes. The runtime is based off of two main html files that are located inside the app folder, runtime.html and launcher.html. The API for the application is located inside the js folder that is housed inside the main app directory and the libs directory inside of it houses the library files that aDOM comes embedded with (JQuery, Zepto and FoundationJS). The package.json file located inside the root folder controls the startup configurations for Node-Webkit, so first you'll need to download and add that to the app, you can find them on the Node-Webkit Github page linked to above.

However if you want to download a prepacked version of aDOM you can for <a title="aDOM Linux 32Bit" href="http://customizedclouds.com/wp-content/uploads/2014/08/aDOM-linux32.zip" target="_blank">Linux 32Bit here</a>, <a title="aDOM Linux 64Bit" href="http://customizedclouds.com/wp-content/uploads/2014/08/aDOM-linux64.zip" target="_blank">Linux 64Bit here</a>, <a title="aDOM Windows 32Bit" href="http://customizedclouds.com/wp-content/uploads/2014/08/aDOM-Win.zip" target="_blank">Windows 32Bit here</a> and <a title="aDOM Mac 32Bit" href="http://customizedclouds.com/wp-content/uploads/2014/08/aDOM-Mac.zip" target="_blank">Mac 32Bit here</a>. Please note that these packaged apps are based off of Node-Webkit 0.8.6 and this version did not have 64Bit binaries for either Mac or Windows. If you have a 64Bit operating system for either Mac or Windows and want to give aDOM a try then you'll have to download the latest version of Node-Webkit which does come with these binaries. aDOM comes embedded with the Foundation front-end framework, v4 (cause I'm just old school like that;), but you can easily replace it with v5 if that's your flavor (or even Bootstrap for that matter). The launcher file is completely unstyled as this really is just a starting point for applications I create and I wanted the initial application to be as flexible as possible. The style.css file in the app folder is really just a copy of foundation.css with only one change that is placed at the bottom of the file. This addition just removes the scrollbars for the application launcher if the window is constricted too small. I like to keep files down to a minimum so I would advise just making any css changes to the app at the bottom of this file but you can obviously break up your css files, additional folders etc. if you like. Here's the directions for launching aDOM and then I explain what exactly is happening after that (if you downloaded a package version of aDOM you can skip this part and just launch the app).
<h2>Directions for adding Node-Webkit</h2>
<ol>
	<li>First head over to the main <a title="Runtime for HTML Applications " href="https://github.com/rogerwang/node-webkit" target="_blank">Node-Webkit Github Page</a>  and download the binaries for your platform.</li>
	<li>Next visit our AdamApps Github page and <a title="AdamApps Github aDOM Page" href="https://github.com/adamapps/aDOM" target="_blank">download aDOM here.</a></li>
	<li>Finally extract the entire contents of Node-Webkit inside the main root folder, where the package.json and icon.png files are located (you can obv change the icon to whatever you like). After doing this you'll now have a file titled nw.something (depending on your OS) located inside the main root folder for the application, this file will launch aDOM and you should now see the application launcher and subsequent runtime icon located in your systems tray.</li>
</ol>
<h2>aDOM Runtime</h2>
aDOM launches in two separate stages. Whenever you first launch the app, aDOM goes inside the app folder and starts the runtime.html file. If you look inside this file there is nothing there but a reference to runtime.js inside the main JS folder because this file isn't actually shown. The runtime.js file controls the startup configurations for aDOM. What happens is that the runtime.html file starts, and then immediately minimizes itself to the systems tray, adds the icon for the app and then opens the launcher.html file that is located inside the same folder. The runtime.js file (located below) controls this behavior and after starting, opens the launcher.html file and then minimizes itself to the OS systems tray using the Node-Webkit tray API. Subsequent clicks to the tray icon will open the application launcher. Here's an example of the runtime files:
<h2>runtime.html</h2>
There's not much to see here because this file isn't actually seen, it simply launches aDOM and holds state for the application by continuously running.
<pre class="lang:default decode:true " title="Runtime.html File">&lt;html&gt;
	&lt;head&gt;
		&lt;title&gt;Runtime&lt;/title&gt;
	&lt;/head&gt;
	&lt;body&gt;	
	
        &lt;!-- Reference to runtime.js--&gt;
		&lt;script src="js/runtime.js"&gt;&lt;/script&gt;
	&lt;/body&gt;
&lt;/html&gt;</pre>
&nbsp;
<h2>runtime.js</h2>
The runtime.js file controls the runtime behavior for aDOM. The CSS comments walk you through what happens but I'll still recap here. Once aDOM is started he goes inside the main app folder and grabs the runtime.html file. The runtime.html file references the runtime.js file and the following code is fired. First, runtime.js requires the Node-Webkit UI library, grabs the current window and defines the tray variable. Next the file sets up the minimize event that will handle clicks to the tray icon and adds the applications icon to the systems tray.  The next function adds a click event to the tray icon that is a simple JS window.open event that opens the application launcher and adds a few sizing parameters. This function doesn't actually run the first time aDOM is started but rather opens the launcher with every subsequent click to the systems tray icon after initial launch. Next the window is actually minimized and on the first launch calls an identical window.open event on the launcher.html file to open the application launcher. Again this function is only called once in the entire aDOM life cycle as the application will remain running until you close all windows from the launchers native menu (we'll see that in a sec).
```javascript
<pre class="lang:default decode:true" title="Runtime.js File">// Require Node-Webkit
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
	
    // Minimize aDOM whenever application is launched (only happens one time through the applications life cycle)
	win.minimize();

     /* Open application launcher the first time aDOM is launched. This script only runs on start,
        every other open event thereafter is controlled from window open event above */
     window.open('launcher.html', '_blank', 'screenX=500,screenY=200,width=700,height=460');

</pre>
```
here's a screenshot of the systems tray icon on Lubuntu 12.04, it's the circular AdamApps logo in case you're reading this without viewing the icon.png file first

<a href="http://customizedclouds.com/wp-content/uploads/2014/11/aDOM-runtime-icon-screenshot.png"><img class="alignnone size-full wp-image-12321" src="http://customizedclouds.com/wp-content/uploads/2014/11/aDOM-runtime-icon-screenshot.png" alt="aDOM-runtime-icon-screenshot" width="504" height="93" /></a>
<h2>The Application Launcher</h2>
After the runtime cycle completes you'll now see the application launcher and the runtime icon inside the systems tray. Once you close the launcher, aDOM will save state for your application because the intial runtime.html file is still open. As mentioned above you can't actually close aDOM from the runtime file itself, you have to close the entire app from the native menu option titled 'Close All' that is created from the menu.js file and located inside the application launcher (again we'll see that in a sec). This particular application is basically a desktop client to easily administer a WordPress website and is completely unstyled. Located inside the launcher.html file is 3, 4 column rows with 12 separate buttons. The buttons are created by referencing placehold.it and Foundation handles the responsiveness for the launcher. Every button has an onClick function attached to it that is controlled by the launcher.js file (except for the last modal button that shows an example Foundation widget).

The launcher.html file also references every other js file inside aDOM, with the exception of the runtime.js file. Those files are location.js, menu.js, shortcuts.js and inside the lib folder is jquery.js, zepto.js and the minified foundation.js library. Below is the launcher.html and launcher.js files and then I'll explain the rest of the files (excluding the helper files inside the lib folder). PS: The purpose of this explanation isn't really to showcase the Wordpress desktop client but rather to provide a theoretical framework for how you could create html applications based off of aDOM, but if you want to try out the Wordpress client you can either replace the yourip variable with a different Wordpress URL (assuming you have access to a Wordpress install) or you can test it out with a demo account I set up on AdamApps.org, the username is demo and the password is 123456.
<h2>launcher.html</h2>
<pre class="lang:default decode:true         " title="Launcher.html">&lt;html&gt;
	&lt;head&gt;
		&lt;title&gt;Launcher&lt;/title&gt;
		  &lt;link rel="stylesheet" href="style.css"&gt;
			&lt;script&gt;
				 /*  
                    
                    Place the URL for your Wordpress install below
					If you want to try it out first you can on AdamApps.org
					(Please note the demo user has author privileges only so will be blocked from viewing some pages)

						user: demo
						pass: 123456

				 */
				var yourip = 'http://adamapps.org'
			&lt;/script&gt;
	&lt;/head&gt;
	&lt;body&gt;	
		&lt;div id="wrapper"&gt;

			    /* Row 1 */
				&lt;div class="row"&gt; 
					&lt;div class="small-3 columns"&gt;
						&lt;a onClick="button1();"&gt;
							&lt;img src="http://placehold.it/300x240&amp;text=Dash" /&gt;
						&lt;/a&gt;
					&lt;/div&gt;
					&lt;div class="small-3 columns"&gt;
						&lt;a onClick="button2();"&gt;
							&lt;img src="http://placehold.it/300x240&amp;text=Posts" /&gt;
						&lt;/a&gt;
					&lt;/div&gt;
					&lt;div class="small-3 columns"&gt;
						&lt;a onClick="button3();"&gt;
							&lt;img src="http://placehold.it/300x240&amp;text=Pages" /&gt;
						&lt;/a&gt;
					&lt;/div&gt;
					&lt;div class="small-3 columns"&gt;
						&lt;a onClick="button4();"&gt;
							&lt;img src="http://placehold.it/300x240&amp;text=Files" /&gt;
						&lt;/a&gt;
					&lt;/div&gt;
				&lt;/div&gt;
				
			     /* Row 2 */
				&lt;div class="row"&gt;
					&lt;div class="small-3 columns"&gt;
						&lt;a onClick="button5();"&gt;
							&lt;img src="http://placehold.it/300x240&amp;text=Upload" /&gt;
						&lt;/a&gt;
					&lt;/div&gt;
					&lt;div class="small-3 columns"&gt;
						&lt;a onClick="button6();"&gt;
							&lt;img src="http://placehold.it/300x240&amp;text=Plugins" /&gt;
						&lt;/a&gt;
					&lt;/div&gt;
					&lt;div class="small-3 columns"&gt;
						&lt;a onClick="button7();"&gt;
							&lt;img src="http://placehold.it/300x240&amp;text=Users" /&gt;
						&lt;/a&gt;
					&lt;/div&gt;
					&lt;div class="small-3 columns"&gt;
						&lt;a onClick="button8();"&gt;
							&lt;img src="http://placehold.it/300x240&amp;text=Settings" /&gt;
						&lt;/a&gt;
					&lt;/div&gt;					
				&lt;/div&gt;
			
			     /* Row 3 */
				&lt;div class="row"&gt;
					&lt;div class="small-3 columns"&gt;
						&lt;a onClick="button9();"&gt;
							&lt;img src="http://placehold.it/300x240&amp;text=Themes" /&gt;
						&lt;/a&gt;
					&lt;/div&gt;
					&lt;div class="small-3 columns"&gt;
						&lt;a onClick="button10();"&gt;
							&lt;img src="http://placehold.it/300x240&amp;text=Widgets" /&gt;
						&lt;/a&gt;
					&lt;/div&gt;
					&lt;div class="small-3 columns"&gt;
						&lt;a onClick="button11();"&gt;
							&lt;img src="http://placehold.it/300x240&amp;text=Menus" /&gt;
						&lt;/a&gt;
					&lt;/div&gt;
					&lt;div class="small-3 columns"&gt;
						&lt;a href="#" data-reveal-id="myModal"&gt;
							&lt;img src="http://placehold.it/300x240&amp;text=Modal" /&gt;
						&lt;/a&gt;
					&lt;/div&gt;
				&lt;/div&gt;
			&lt;/div&gt;
		
		/* Jquery (used for shortcuts.js) */	
	 	&lt;script src="js/libs/jquery.js"&gt;&lt;/script&gt;

		/*  aDOM API */
		&lt;script src="js/shortcuts.js"&gt;&lt;/script&gt;
		&lt;script src="js/location.js"&gt;&lt;/script&gt;
		&lt;script src="js/menu.js"&gt;&lt;/script&gt;
		&lt;script src="js/launcher.js"&gt;&lt;/script&gt;
				
		/*  Adds Foundation JS */
		  &lt;script&gt;
			  document.write('&lt;script src=' +	  ('__proto__' in {} ? 'js/vendor/zepto' : 'js/vendor/jquery') +  '.js&gt;&lt;\/script&gt;')
		  &lt;/script&gt;
		  
		  &lt;script src="js/libs/foundation.js"&gt;&lt;/script&gt;

		/* Example Foundation Modal */
		&lt;div id="myModal" class="reveal-modal"&gt;
			  &lt;h2&gt;Example Foundation Modal&lt;/h2&gt;
			 	 &lt;p class="lead"&gt;This is an Example Foundation Modal&lt;/p&gt;
			 		 &lt;p&gt;Foundation is an amazing responsive library that helps create UI's for html applications (ala Twitter Bootstrap). If you want to learn about using foundation then check out the documentation for Foundation 4 (the library aDOM comes embedded with) &lt;a onClick="getFoundationDocs();"&gt;here&lt;/a&gt;&lt;/p&gt;
			 			  &lt;a class="close-reveal-modal"&gt;&amp;#215;&lt;/a&gt;
				
				/* Script that uses the Node-Webkit Shell API to open Foundation Docs in default native browser */
				  &lt;script&gt;
					function getFoundationDocs(){
						gui.Shell.openExternal('http://foundation.zurb.com/docs/v/4.3.2/');
					}
				&lt;/script&gt;
		&lt;/div&gt;
		  
		  &lt;script&gt;
		    $(document).foundation();
 		 &lt;/script&gt;

	&lt;/body&gt;
&lt;/html&gt;
</pre>
<h2> launcher.js</h2>
And here's the code for launcher.js, it's just twelve separate functions that fire window.open events whenever a button from launcher.html is clicked. The functions add a few window sizing parameters and replace the URL you give it above at runtime.
<pre class="lang:default decode:true" title="Launcher.js">/* function 12 is empty because the script to show the foundation modal was added directly to launcher.html */

function button1(){

	window.open( yourip + '/wp-admin', '_blank', 'screenX=200,screenY=50,width=700,height=950');

}
function button2(){

	window.open( yourip + '/wp-admin/edit.php', '_blank', 'screenX=200,screenY=50,width=700,height=950');

}
function button3(){

	window.open( yourip + '/wp-admin/', '_blank', 'screenX=200,screenY=50,width=700,height=950');

}
function button4(){

	window.open( yourip + '/wp-admin/media.php', '_blank', 'screenX=200,screenY=50,width=700,height=950');

}
function button5(){

	window.open( yourip + '/wp-admin/media-new.php', '_blank', 'screenX=200,screenY=250,width=700,height=500');

}
function button6(){

	window.open( yourip + '/wp-admin/plugins.php', '_blank', 'screenX=200,screenY=50,width=700,height=950');

}
function button7(){

	window.open( yourip + '/wp-admin/users.php', '_blank', 'screenX=200,screenY=50,width=700,height=950');

}
function button8(){

	window.open( yourip + '/wp-admin/options-general.php', '_blank', 'screenX=200,screenY=50,width=700,height=950');

}
function button9(){

	window.open( yourip + '/wp-admin/themes.php', '_blank', 'screenX=200,screenY=50,width=700,height=950');

}
function button10(){

	window.open( yourip + '/wp-admin/widgets.php', '_blank', 'screenX=200,screenY=50,width=700,height=950');

}
function button11(){

	window.open( yourip + '/wp-admin/nav-menus.php', '_blank', 'screenX=200,screenY=50,width=700,height=950');

}
function button12(){

	

}
</pre>
and here's a screenshot of the launcher on Lubuntu 12.04

<a href="http://customizedclouds.com/wp-content/uploads/2014/11/screenshot-aDOM-application-launcher.jpg"><img class="alignnone size-full wp-image-12320" src="http://customizedclouds.com/wp-content/uploads/2014/11/screenshot-aDOM-application-launcher.jpg" alt="screenshot-aDOM-application-launcher" width="1047" height="500" /></a>
<h2>location.js</h2>
location.js saves the windowing position for aDOM and does this by using the HTML5 localStorage api. It's a bit extensive so I won't list the code here but if you want to see the initial tutorial I got it from <a title="Save Window State Inside Node-Webkit" href="https://github.com/rogerwang/node-webkit/wiki/Preserve-window-state-between-sessions" target="_blank">click here</a>. Basically what this file does is allows you to drag the application launcher anywhere on the screen (or actually resize the window, etc.), close the app out and the launcher will start back at it's last closed position on the screen. Personally I think this is one of the best use cases for using the localStorage api i've seen outside of how it's mostly used, for like saving form state and stuff.
<h2>menu.js</h2>
menu.js uses the Node-Webkit menu api to create a native menu for the application launcher. Going back to its reference from earlier, aDOM only comes with one menu option by default and this is how you close the entire application. Remember, if you only close out the application launcher from the window menu then aDOM keeps running because the original runtime.html file is still open inside the systems tray. Whenever you click on the 'Menu' option and choose 'Close All' then menu.js is accessed and runs this command
<pre class="lang:default decode:true " title="Close aDOM">gui.App.closeAllWindows();</pre>
which is a Node-Webkit API that tells the application launcher to close all windows running inside the current application, which includes the runtime.html file as well. Here's a look at the menu.js file that uses the Node-Webkit Menu API to create a native menu for the application launcher and a submenu titled 'Close All' that houses the above code. The comments explain what each part is doing.
<pre class="lang:default decode:true " title="Menu.js">// Load native UI library &amp; Node.js FileSystem API
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
for (var i = 0; i &lt; menu.items.length; ++i) {
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
</pre>
<h2>shortcuts.js</h2>
The final JS file doesn't reference any native Node-Webkit API's, but rather uses a little JQuery magic to create keyboard shortcuts for aDOM. I've only included a few commands to show you how it works but you could really create as many shortcuts as you want. They should look familiar if you've ever worked with JQuery before. The commands are wrapped in a standard onReady event and come with a singular if statement for each command. They include the the keycode that corresponds to the key being pressed and also add the ctrl key. Here's a basic explanation of the command.

if (evt.keyCode==( keyboard keycode the key being pressed corresponds to ) &amp;&amp; (evt.ctrlKey)) (basically stating if the cntrl key and key x are pressed together do this {}). The next line prevents the default event from being fired and then finally loads the function you pass to it.
<pre class="lang:default decode:true  " title="Shortcuts.js">// Control c opens the chrome console
$(document).keydown(function(evt){
    if (evt.keyCode==67 &amp;&amp; (evt.ctrlKey)){
        evt.preventDefault();
        win.showDevTools();
		
     }
});

// Control r refreshes our application
$(document).keydown(function(evt){
    if (evt.keyCode==82 &amp;&amp; (evt.ctrlKey)){
        evt.preventDefault();
        location.reload();
		
     }
});

// Control w closes the application launcher (not the actual runtime file)
$(document).keydown(function(evt){
    if (evt.keyCode==87 &amp;&amp; (evt.ctrlKey)){
        evt.preventDefault();
        location.reload();
		
     }
});

//Add subsequent commands here or delete the above commands and add your own...</pre>
&nbsp;
<h2>timer.js</h2>
(not referenced in launcher.html)
I've also included a really small jQuery library that handles timer events very conveniently, it isn't really needed in the default launcher application but if you want to see it in action then open up timer.js and there is examples on how to use it in the comments head, plus the methods that are available to the library as well.
