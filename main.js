// Modules to control application life and create native browser window
const { app, BrowserWindow, electron, ipcMain, Menu } = require('electron')
const shell = require("electron").shell;
const path = require('path')


// ----------------------------------------------------------------------------
// ERROR-HANDLING
// ----------------------------------------------------------------------------
//
require("./app/js/crashReporting.js");
//myUndefinedFunctionFromMain();



// ----------------------------------------------------------------------------
// VARIABLES & CONSTANTS
// ----------------------------------------------------------------------------
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const gotTheLock = app.requestSingleInstanceLock(); // for: single-instance handling

// project-urls
let urlGitHubGeneral = "https://github.com/yafp/media-dupes";
let urlGitHubIssues = "https://github.com/yafp/media-dupes/issues";
let urlGitHubChangelog = "https://github.com/yafp/media-dupes/blob/master/docs/CHANGELOG.md";
let urlGitHubFAQ = "https://github.com/yafp/media-dupes/blob/master/docs/FAQ.md";
let urlGitHubReleases = "https://github.com/yafp/media-dupes/releases";



// ----------------------------------------------------------------------------
// FUNCTIONS
// ----------------------------------------------------------------------------

/**
* @name createWindow
* @summary Creates the mainWindow
* @description Creates the mainWindow
*/
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 800,
    height: 900,
    minHeight: 900,
    icon: path.join(__dirname, "app/img/icon/icon.png"),

    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })


  // Call from renderer: Open folder with user configured services
ipcMain.on("openUserDownloadFolder", (event) => {

        if (shell.openItem(downloadTarget) === true)
        {
            console.log("Opened the user download folder (ipcMain)");
        }
        else
        {
            console.log("Failed to open the user download folder (ipcMain)");
        }
    });



  const downloadTarget = app.getPath('downloads')
  global.sharedObj = {prop1: downloadTarget};


  // and load the index.html of the app.
  mainWindow.loadFile('app/index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}


/**
* @name createMenu
* @summary Creates the application menu
* @description Creates the application menu
*/
function createMenu()
{
    // Create a custom menu
    var menu = Menu.buildFromTemplate([

    // Menu: File
    {
        label: "File",
        submenu: [
        // Exit
        {
            role: "quit",
            label: "Exit",
            click() {
                app.quit();
            },
            accelerator: "CmdOrCtrl+Q"
        }
    ]
    },

    // Menu: Edit
    {
        label: "Edit",
        submenu: [
        {
            label: "Undo",
            accelerator: "CmdOrCtrl+Z",
            selector: "undo:"
        },
        {
            label: "Redo",
            accelerator: "Shift+CmdOrCtrl+Z",
            selector: "redo:"
        },
        {
            type: "separator"
        },
        {
            label: "Cut",
            accelerator: "CmdOrCtrl+X",
            selector: "cut:"
        },
        {
            label: "Copy",
            accelerator: "CmdOrCtrl+C",
            selector: "copy:"
        },
        {
            label: "Paste",
            accelerator: "CmdOrCtrl+V",
            selector: "paste:"
        },
        {
            label: "Select All",
            accelerator: "CmdOrCtrl+A",
            selector: "selectAll:"
        }
    ]
    },

    // Menu: View
    {
        label: "View",
        submenu: [
        {
            role: "reload",
            label: "Reload",
            click(item, mainWindow) {
                mainWindow.reload();
            },
            accelerator: "CmdOrCtrl+R"
        }
    ]
    },

    // Menu: Window
    {
        label: "Window",
        submenu: [
        {
            role: "togglefullscreen",
            label: "Toggle Fullscreen",
            click(item, mainWindow) {
                if(mainWindow.isFullScreen())
                {
                    mainWindow.setFullScreen(false);
                }
                else
                {
                    mainWindow.setFullScreen(true);
                }

            },
            accelerator: "F11" // is most likely predefined on osx - results in: doesnt work on osx
        },
        {
            role: "hide",
            label: "Hide",
            click(item, mainWindow) {
                mainWindow.hide();
                //mainWindow.reload();
            },
            accelerator: "CmdOrCtrl+H",
            enabled: true
        },
        {
            role: "minimize",
            label: "Minimize",
            click(item, mainWindow) {
                if(mainWindow.isMinimized())
                {
                    //mainWindow.restore();
                }
                else
                {
                    mainWindow.minimize();
                }
            },
            accelerator: "CmdOrCtrl+M",
        },
        {
            label: "Maximize",
            click(item, mainWindow) {
                if(mainWindow.isMaximized())
                {
                    mainWindow.unmaximize();
                }
                else
                {
                    mainWindow.maximize();
                }
            },
            accelerator: "CmdOrCtrl+K",
        }
    ]
    },

    // Menu: Help
    {
        role: "help",
        label: "Help",
        submenu: [
        // About
        {
            role: "about",
            label: "About",
            click() {
                openAboutWindow({
                    icon_path: path.join(__dirname, "app/img/about/icon_about.png"),
                    open_devtools: false,
                    use_version_info: true,
                    win_options:  // https://github.com/electron/electron/blob/master/docs/api/browser-window.md#new-browserwindowoptions
                    {
                        autoHideMenuBar: true,
                        titleBarStyle: "hidden",
                        minimizable: false, // not implemented on linux
                        maximizable: false, // not implemented on linux
                        movable: false, // not implemented on linux
                        resizable: false,
                        alwaysOnTop: true,
                        fullscreenable: false,
                        skipTaskbar: false
                    }
                });

            },
        },
        // open homepage
        {
            label: "Homepage",
            click() {
                shell.openExternal(urlGitHubGeneral);
            },
            accelerator: "F1"
        },
        // report issue
        {
            label: "Report issue",
            click() {
                shell.openExternal(urlGitHubIssues);
            },
            accelerator: "F2"
        },
        // open changelog
        {
            label: "Changelog",
            click() {
                shell.openExternal(urlGitHubChangelog);
            },
            accelerator: "F3"
        },
        // open FAQ
        {
            label: "FAQ",
            click() {
                shell.openExternal(urlGitHubFAQ);
            },
            accelerator: "F4"
        },
        // open Releases
        {
            label: "Releases",
            click() {
                shell.openExternal(urlGitHubReleases);
            },
            accelerator: "F5"
        },
        {
            type: "separator"
        },
        // Update
        {
            label: "Search updates",
            click(item, mainWindow) {
                mainWindow.webContents.send("startSearchUpdates");
            },
            enabled: true,
            accelerator: "F9"
        },
        {
            type: "separator"
        },

        // SubMenu Console
        {
            label: "Console",
            submenu: [
            // Console
            {
                id: "HelpConsole",
                label: "Console",
                click(item, mainWindow) {
                    mainWindow.webContents.toggleDevTools();
                },
                enabled: true,
                accelerator: "F12"
            },
            ]
        },
        {
            type: "separator"
        },
        // SubMenu of help
        {
            label: "Maintenance",
            submenu: [
            // Clear cache in userData
            {
                id: "ClearCache",
                label: "Clear cache",
                click(item, mainWindow) {
                    var chromeCacheDir = path.join(app.getPath("userData"), "Cache");
                    if(fs.existsSync(chromeCacheDir))
                    {
                        var files = fs.readdirSync(chromeCacheDir);
                        for(var i=0; i<files.length; i++)
                        {
                            var filename = path.join(chromeCacheDir, files[i]);
                            if(fs.existsSync(filename))
                            {
                                try {
                                    fs.unlinkSync(filename);
                                }
                                catch(e) {
                                    console.log(e);
                                }
                            }
                        }
                    }

                    mainWindow.reload();
                },
                enabled: true
            }
            ]
        }
        ]
    }
    ]);

    // use the menu
    Menu.setApplicationMenu(menu);
}




/**
* @name forceSingleAppInstance
* @summary Takes care that there is only 1 instance of this app running
* @description Takes care that there is only 1 instance of this app running
*/
function forceSingleAppInstance()
{
    if (!gotTheLock)
    {
        //writeLog("error", "forceSingleAppInstance ::: There is already another instance of tttth");
        app.quit(); // quit the second instance
    }
    else
    {
        app.on("second-instance", (event, commandLine, workingDirectory) =>
        {
            // Someone tried to run a second instance, we should focus our first instance window.
            if (mainWindow)
            {
                if (mainWindow === null) //#134
                {
                    // do nothing - there is no mainwindow - most likely we are on macOS
                }
                else // mainWindow exists
                {
                    if (mainWindow.isMinimized())
                    {
                        mainWindow.restore();
                    }
                    mainWindow.focus();
                }
            }
        });
    }
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//
//app.on('ready', createWindow)
app.on("ready", function ()
{
    forceSingleAppInstance(); // check for single instance
    createWindow(); // create the application UI
    createMenu(); // create the application menu
});




// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})