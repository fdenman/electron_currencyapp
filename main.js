const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell

let win 

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  }))


  win.webContents.openDevTools()

  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
  
  
  var menu = Menu.buildFromTemplate([ 
    {
        label: 'Menu', 
          submenu: [
              { label: 'Adjust Notification Value' },
              { 
                  label: 'CoinMarketCap',
                  click() {
                      shell.openExternal('http://coinmarketcap.com')
                  } 
                },

                {type: 'separator'},
              {
                  label: 'Exit',
                  click() {
                      app.quit()
                  }
              }
          ]
    },
      {
        label: 'info'
      }
  ])
  Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})