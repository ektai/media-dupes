/**
* @file Contains all renderer code
* @author yafp
* @namespace renderer
*/

'use strict'

// ----------------------------------------------------------------------------
// IMPORT MEDIA-DUPES MODULES
// ----------------------------------------------------------------------------
const utils = require('./js/modules/utils.js')
const ffmpeg = require('./js/modules/ffmpeg.js')
const sentry = require('./js/modules/sentry.js')
const ui = require('./js/modules/ui.js')
const settings = require('./js/modules/settings.js')
const youtube = require('./js/modules/youtubeDl.js')

// ----------------------------------------------------------------------------
// ERROR HANDLING
// ----------------------------------------------------------------------------
const errorReporting = require('./js/errorReporting.js')
// myUndefinedFunctionFromRenderer();

// ----------------------------------------------------------------------------
// VARIABLES
// ----------------------------------------------------------------------------
// var arrayUserUrls = [] // contains the urls which should be downloaded
// var arrayUrlsThrowingErrors = [] // coontains urls which throws errors while trying to download

// Settings variables
//
var ytdlBinaryVersion = '0.0.0'
var youtubeDlBinaryDetailsVersion
var youtubeDlBinaryDetailsPath
var youtubeDLBinaryDetailsExec

// ----------------------------------------------------------------------------
// FUNCTIONS - MAIN WINDOW CLICKS
// ----------------------------------------------------------------------------

/**
* @function windowMainClickDistract
* @summary Handles the click on the app icon
* @description Triggered from the mainWindow. Starts the easteregg / distract function
* @memberof renderer
*/
function windowMainClickDistract () {
    ui.windowMainDistract()
}

/**
* @function windowMainClickButtonAddUrl
* @summary Handles the click on the AddUrl button
* @description Triggered from the mainWindow. Starts the add url function
* @memberof renderer
*/
function windowMainClickButtonAddUrl () {
    ui.windowMainAddUrl()
}

/**
* @function windowMainClickButtonVideo
* @summary Handles the click on the video button
* @description Triggered from the mainWindow. Starts the video download function
* @memberof renderer
*/
function windowMainClickButtonVideo () {
    ui.windowMainDownloadContent('video')
}

/**
* @function windowMainClickButtonVideo
* @summary Handles the click on the video button
* @description Triggered from the mainWindow. Starts the video download function
* @memberof renderer
*/
function windowMainClickButtonVideoV2 () {
    ui.windowMainDownloadVideo()
}

/**
* @function windowMainClickButtonAudio
* @summary Handles the click on the audio button
* @description Triggered from the mainWindow. Starts the audio download function
* @memberof renderer
*/
function windowMainClickButtonAudio () {
    ui.windowMainDownloadContent('audio')
}

/**
* @function windowMainClickButtonSettings
* @summary Handles the click on the settings button
* @description Triggered from the mainWindow. Starts the settings UI
* @memberof renderer
*/
function windowMainClickButtonSettings () {
    ui.windowMainSettingsUiLoad()
}

/**
* @function windowMainClickButtonIntro
* @summary Handles the click on the intro button
* @description Triggered from the mainWindow. Starts the application intro
* @memberof renderer
*/
function windowMainClickButtonIntro () {
    ui.windowMainIntroShow()
}

/**
* @function windowMainClickButtonExtrators
* @summary Handles the click on the extractors button
* @description Triggered from the mainWindow. Starts the show supported extractors function
* @memberof renderer
*/
function windowMainClickButtonExtrators () {
    ui.windowMainShowSupportedExtractors()
}

/**
* @function windowMainClickButtonDownloads
* @summary Handles the click on the Downloads button
* @description Triggered from the mainWindow. Starts the open-download-folder function
* @memberof renderer
*/
function windowMainClickButtonDownloads () {
    ui.windowMainOpenDownloadFolder()
}

/**
* @function windowMainClickButtonLogReset
* @summary Handles the click on the log-reset button
* @description Triggered from the mainWindow. Starts the reset-log function
* @memberof renderer
*/
function windowMainClickButtonLogReset () {
    ui.windowMainLogReset()
}

/**
* @function windowMainClickButtonUIReset
* @summary Handles the click on the reset-UI button
* @description Triggered from the mainWindow. Starts the reset-UI function
* @memberof renderer
*/
function windowMainClickButtonUIReset () {
    ui.windowMainResetAskUser()
}

// ----------------------------------------------------------------------------
// FUNCTIONS - SETTINGS WINDOW CLICKS
// ----------------------------------------------------------------------------
/**
* @function windowSettingsClickIconUserSettingsDir
* @summary Handles the click on the settings icon
* @description Triggered from the settingsWindow.
* @memberof renderer
*/
function windowSettingsClickIconUserSettingsDir () {
    settings.settingsFolderOpen()
}

/**
* @function windowSettingsClickButtonChooseDownloadDir
* @summary Handles the click on the choose download dir button
* @description Triggered from the settingsWindow.
* @memberof renderer
*/
function windowSettingsClickButtonChooseDownloadDir () {
    settings.settingsSelectDownloadDir()
}

/**
* @function windowSettingsClickCheckboxVerboseMode
* @summary Handles the click on the checkbox verbose mode
* @description Triggered from the settingsWindow.
* @memberof renderer
*/
function windowSettingsClickCheckboxVerboseMode () {
    settings.settingsToggleVerboseMode()
}

/**
* @function windowSettingsClickCheckboxUpdatePolicy
* @summary Handles the click on the checkbox verbose mode
* @description Triggered from the settingsWindow.
* @memberof renderer
*/
function windowSettingsClickCheckboxUpdatePolicy () {
    settings.settingsTogglePrereleases()
}

/**
* @function windowSettingsClickIconBug
* @summary Handles the click on the bug icon
* @description Triggered from the settingsWindow.
* @memberof renderer
*/
function windowSettingsClickIconBug () {
    settings.settingsOpenDevTools()
}

/**
* @function windowSettingsClickCheckboxErrorReporting
* @summary Handles the click on the checkbox error reporting
* @description Triggered from the settingsWindow.
* @memberof renderer
*/
function windowSettingsClickCheckboxErrorReporting () {
    settings.settingsToggleErrorReporting()
}

/**
* @function windowSettingsClickDropdownAudioFormats
* @summary Handles the click on the dropdown audio formats
* @description Triggered from the settingsWindow.
* @memberof renderer
*/
function windowSettingsClickDropdownAudioFormats () {
    settings.settingsAudioFormatSave()
}

/**
* @function windowSettingsClickOpenUrl
* @summary Handles the click on the dropdown audio formats
* @description Triggered from the settingsWindow.
* @param {string} url - the url
* @memberof renderer
*/
function windowSettingsClickOpenUrl (url) {
    settings.settingsOpenExternal(url)
}

// ----------------------------------------------------------------------------
// FUNCTIONS - OTHERS
// ----------------------------------------------------------------------------

/**
* @function titlebarInit
* @summary Init the titlebar for the frameless mainWindow
* @description Creates a custom titlebar for the mainWindow using custom-electron-titlebar (https://github.com/AlexTorresSk/custom-electron-titlebar).
* @memberof renderer
*/
function titlebarInit () {
    const customTitlebar = require('custom-electron-titlebar')

    const myTitlebar = new customTitlebar.Titlebar({
        titleHorizontalAlignment: 'center', // position of window title
        icon: 'img/icon/icon.png',
        drag: true, // whether or not you can drag the window by holding the click on the title bar.
        backgroundColor: customTitlebar.Color.fromHex('#171717'),
        minimizable: true,
        maximizable: true,
        closeable: true,
        itemBackgroundColor: customTitlebar.Color.fromHex('#525252') // hover color
    })

    // Be aware: the font-size of .window-title (aka application name) is set by app/css/core.css
    utils.writeConsoleMsg('info', 'titlebarInit ::: Initialized custom titlebar')
}

/**
* @function checkApplicationDependencies
* @function checkApplicationDependencies
* @summary Checks for missing dependencies
* @description Checks on startup for missing dependencies (youtube-dl and ffmpeg). Both are bundles and should be find
* @memberof renderer
*/
function checkApplicationDependencies () {
    var countErrors = 0

    // youtube-dl
    //
    var youtubeDlBinaryPath = youtube.youtubeDlBinaryPathGet()
    if (utils.pathExists(youtubeDlBinaryPath) === true) {
        utils.writeConsoleMsg('info', 'checkApplicationDependencies ::: Found youtube-dl in: _' + youtubeDlBinaryPath + '_.')
    } else {
        countErrors = countErrors + 1
        utils.writeConsoleMsg('error', 'checkApplicationDependencies ::: Unable to find youtube-dl in: _' + youtubeDlBinaryPath + '_.')
        utils.showNoty('error', 'Unable to find dependency <b>youtube-dl</b>. Please report this.', 0)
    }

    // ffmpeg
    //
    var ffmpegBinaryPath = ffmpeg.ffmpegGetBinaryPath()
    if (utils.pathExists(ffmpegBinaryPath) === true) {
        utils.writeConsoleMsg('info', 'checkApplicationDependencies ::: Found ffmpeg in: _' + ffmpegBinaryPath + '_.')
    } else {
        countErrors = countErrors + 1
        utils.writeConsoleMsg('error', 'checkApplicationDependencies ::: Unable to find ffmpeg in: _' + ffmpegBinaryPath + '_.')
        utils.showNoty('error', 'Unable to find dependency <b>ffmpeg</b>. Please report this', 0)
    }

    // if errors occured - disable / hide the action buttons
    //
    if (countErrors !== 0) {
        $('#buttonStartVideoExec').hide() // hide video button
        $('#buttonStartVideo').hide() // hide video button
        $('#buttonStartAudioExec').hide() // hide audio button
        utils.showNoty('error', 'Download buttons are now hidden. Please contact the developers via github.', 0)
    }

    utils.writeConsoleMsg('info', 'checkApplicationDependencies ::: Finished checking dependencies. Found overall _' + countErrors + '_ problems.')
}

/**
* @function settingsLoadAllOnAppStart
* @summary Reads all user-setting-files and fills some global variables
* @description Reads all user-setting-files and fills some global variables
* @memberof renderer
*/
function settingsLoadAllOnAppStart () {
    utils.writeConsoleMsg('info', 'settingsLoadAllOnAppStart ::: Gonna read several user config files now ...')
    utils.userSettingRead('enableVerboseMode') // verbose mode
    utils.userSettingRead('enablePrereleases') // pre-releases
    utils.userSettingRead('enableErrorReporting') // get setting for error-reporting
    utils.userSettingRead('downloadDir') // download dir
    utils.userSettingRead('audioFormat') // get setting for configured audio format
}

/**
* @function settingsLoadAllOnSettingsUiLoad
* @summary Reads all user-setting-files and fills some global variables and adjusts the settings UI
* @description Reads all user-setting-files and fills some global variables and adjusts the settings UI
* @memberof renderer
*/
function settingsLoadAllOnSettingsUiLoad () {
    utils.writeConsoleMsg('info', 'settingsLoadAllOnAppStart ::: Gonna read several user config files now and adjust the settings UI')
    utils.userSettingRead('enableVerboseMode', true) // verbose mode
    utils.userSettingRead('enablePrereleases', true) // pre-releases
    utils.userSettingRead('enableErrorReporting', true)
    utils.userSettingRead('downloadDir', true) // download dir
    utils.userSettingRead('audioFormat', true) // load configured audio format and update the settings UI
}

/**
* @function checkUrlInputField
* @summary Handles auto-pasting urls to url input field
* @description Executed on focus - checks if the clipboard contains a valid URL - if so - its auto-pasted into the field
* @memberof renderer
*/
function checkUrlInputField () {
    utils.writeConsoleMsg('info', 'checkUrlInputField ::: Triggered on focus')
    var currentContentOfUrlInputField = $('#inputNewUrl').val() // get current content of field

    // if the field is empty - continue
    if (currentContentOfUrlInputField === '') {
        const { clipboard } = require('electron')
        var currentClipboardContent = clipboard.readText() // get content of clipboard
        currentClipboardContent = currentClipboardContent.trim() // remove leading and trailing blanks

        // check if it is a valid url - if so paste it
        var isUrlValid = utils.validURL(currentClipboardContent)
        if (isUrlValid) {
            $('#inputNewUrl').val(currentClipboardContent) // paste it
            $('#inputNewUrl').select() // select it entirely
            utils.writeConsoleMsg('info', 'checkUrlInputField ::: Clipboard contains a valid URL (' + currentClipboardContent + '). Pasted it into the input field.')
        } else {
            utils.writeConsoleMsg('info', 'checkUrlInputField ::: Clipboard contains a non valid URL (' + currentClipboardContent + ').')
        }
    }
}

/**
* @function onEnter
* @summary Executed on keypress inside url-input-field
* @description Checks if the key-press was the ENTER-key - if so simulates a press of the button ADD URL
* @memberof renderer
* @event keyCode - The key press event
*/
function onEnter (event) {
    var code = 0
    code = event.keyCode
    if (code === 13) {
        windowMainClickButtonAddUrl() // simulare click on ADD URL buttom
    }
}

/**
* @function searchUpdate
* @summary Checks if there is a new media-dupes release available
* @description Compares the local app version number with the tag of the latest github release. Displays a notification in the settings window if an update is available. Is executed on app launch NOT on reload.
* @memberof renderer
* @param {booean} [silent] - Boolean with default value. Shows a feedback in case of no available updates If 'silent' = false. Special handling for manually triggered update search
*/
function searchUpdate (silent = true) {
    ui.windowMainApplicationStateSet('Searching media-dupes updates')

    // check if pre-releases should be included or not
    var curEnablePrereleasesSetting = utils.globalObjectGet('enablePrereleases')

    // get url for github releases / api
    const { urlGithubApiReleases } = require('./js/modules/githubUrls.js') // get API url

    var remoteAppVersionLatest = '0.0.0'
    var remoteAppVersionLatestPrerelease = false
    var localAppVersion = '0.0.0'
    var versions

    // get local version
    //
    localAppVersion = require('electron').remote.app.getVersion()
    // localAppVersion = '0.0.1'; //  overwrite variable to simulate

    var updateStatus = $.get(urlGithubApiReleases, function (data) {
        3000 // in milliseconds

        // success
        versions = data.sort(function (v1, v2) {
            // return semver.compare(v2.tag_name, v1.tag_name);
            // console.error(v1.tag_name)
            // console.error(v2.tag_name)
        })

        if (curEnablePrereleasesSetting === true) {
            // user wants the latest release - ignoring if it is a prerelease or an official one
            utils.writeConsoleMsg('info', 'searchUpdate ::: Including pre-releases in update search')
            remoteAppVersionLatest = versions[0].tag_name // Example: 0.4.2
            remoteAppVersionLatestPrerelease = versions[0].prerelease // boolean
        } else {
            // user wants official releases only
            utils.writeConsoleMsg('info', 'searchUpdate ::: Ignoring pre-releases in update search')
            // find the latest non pre-release build
            // loop over the versions array to find the latest non-pre-release
            var latestOfficialRelease
            for (var i = 0; i < versions.length; i++) {
                if (versions[i].prerelease === false) {
                    latestOfficialRelease = i
                    break
                }
            }

            remoteAppVersionLatest = versions[i].tag_name // Example: 0.4.2
            remoteAppVersionLatestPrerelease = versions[i].prerelease // boolean
        }

        utils.writeConsoleMsg('info', 'searchUpdate ::: Local media-dupes version: ' + localAppVersion)
        utils.writeConsoleMsg('info', 'searchUpdate ::: Latest media-dupes version: ' + remoteAppVersionLatest)

        // If a stable (not a prelease) update is available - see #73
        if (localAppVersion < remoteAppVersionLatest) {
            utils.writeConsoleMsg('info', 'searchUpdate ::: Found update, notify user')

            // ask user using a noty confirm dialog
            const Noty = require('noty')
            var n = new Noty(
                {
                    theme: 'bootstrap-v4',
                    layout: 'bottom',
                    type: 'info',
                    closeWith: [''], // to prevent closing the confirm-dialog by clicking something other then a confirm-dialog-button
                    text: 'A media-dupes update from <b>' + localAppVersion + '</b> to version <b>' + remoteAppVersionLatest + '</b> is available. Do you want to visit the release page?',
                    buttons: [
                        Noty.button('Yes', 'btn btn-success mediaDupes_btnDefaultWidth', function () {
                            n.close()
                            openReleasesOverview()
                        },
                        {
                            id: 'button1', 'data-status': 'ok'
                        }),

                        Noty.button('No', 'btn btn-secondary mediaDupes_btnDefaultWidth float-right', function () {
                            n.close()
                        })
                    ]
                })

            // show the noty dialog
            n.show()
        } else {
            utils.writeConsoleMsg('info', 'searchUpdate ::: No newer version of media-dupes found.')

            // when executed manually via menu -> user should see result of this search
            if (silent === false) {
                utils.showNoty('success', 'No <b>media-dupes</b> updates available')
            }
        }

        utils.writeConsoleMsg('info', 'searchUpdate ::: Successfully checked ' + urlGithubApiReleases + ' for available releases')
    })
        .done(function () {
        // utils.writeConsoleMsg('info', 'searchUpdate ::: Successfully checked ' + urlGithubApiReleases + ' for available releases');
        })

        .fail(function () {
            utils.writeConsoleMsg('info', 'searchUpdate ::: Checking ' + urlGithubApiReleases + ' for available releases failed.')
            utils.showNoty('error', 'Checking <b>' + urlGithubApiReleases + '</b> for available media-dupes releases failed. Please troubleshoot your network connection.', 0)
        })

        .always(function () {
            utils.writeConsoleMsg('info', 'searchUpdate ::: Finished checking ' + urlGithubApiReleases + ' for available releases')
            ui.windowMainButtonsOthersEnable()
            ui.windowMainApplicationStateSet()
        })
}

/**
* @function openReleasesOverview
* @summary Opens the media-dupes release page
* @description Opens the url https://github.com/yafp/media-dupes/releases in the default browser. Used in searchUpdate().
* @memberof renderer
*/
function openReleasesOverview () {
    const { urlGitHubReleases } = require('./js/modules/githubUrls.js')
    utils.writeConsoleMsg('info', 'openReleasesOverview ::: Opening _' + urlGitHubReleases + '_ to show available releases.')
    utils.openURL(urlGitHubReleases)
}

/**
* @function settingsShowYoutubeDLInfo
* @summary Searches the youtube-binary and shows it in the settings UI
* @description Searches the youtube-binary and shows it in the settings UI
* @memberof renderer
*/
function settingsShowYoutubeDLInfo () {
    const youtubedl = require('youtube-dl')

    settingsGetYoutubeDLBinaryVersion(function () {
        utils.writeConsoleMsg('info', 'settingsShowYoutubeDLInfo ::: Searching youtube-dl ...')
        var youtubeDl = youtubedl.getYtdlBinary()
        if (youtubeDl === '') {
            utils.writeConsoleMsg('error', 'settingsShowYoutubeDLInfo ::: Unable to find youtube-dl')
            utils.showNoty('error', 'Unable to find dependency <b>youtube-dl</b>.', 0)
        } else {
            utils.writeConsoleMsg('info', 'settingsShowYoutubeDLInfo ::: Found youtube-dl in: _' + youtubeDl + '_.')
            $('#userSettingsYouTubeDLPathInfo').val(youtubeDl) // show in UI
            $('#headerYoutubeDL').html('<i class="fab fa-youtube"></i> youtube-dl <small>Version: ' + ytdlBinaryVersion + '</small>')
        }
    })
}

/**
* @function settingsShowFfmpegInfo
* @summary Searches the ffmpeg-binary and shows it in the settings UI
* @description Searches the ffmpeg-binary and shows it in the settings UI
* @memberof renderer
*/
function settingsShowFfmpegInfo () {
    var ffmpeg = require('ffmpeg-static-electron')
    utils.writeConsoleMsg('info', 'settingsShowFfmpegInfo ::: Searching ffmpeg ...')
    if (ffmpeg === '') {
        utils.writeConsoleMsg('error', 'settingsShowFfmpegInfo ::: Unable to find ffmpeg')
        utils.showNoty('error', 'Unable to find dependency <b>ffmpeg</b>.', 0)
    } else {
        utils.writeConsoleMsg('info', 'settingsShowFfmpegInfo ::: Found ffmpeg in: _' + ffmpeg.path + '_.')
        $('#userSettingsFfmpegPathInfo').val(ffmpeg.path) // show in UI
    }
}

/**
* @function canWriteFileOrFolder
* @summary Checks if a file or folder is writeable
* @description Checks if a file or folder is writeable
* @memberof renderer
* @param {String} path - Path which should be checked
*/
function canWriteFileOrFolder (path, callback) {
    const fs = require('fs')
    fs.access(path, fs.W_OK, function (err) {
        callback(null, !err)
    })
}

/**
* @function searchYoutubeDLUpdate
* @summary Checks if there is a new release  for the youtube-dl binary available
* @description Compares the local app version number with the tag of the latest github release. Displays a notification in the settings window if an update is available.
* @memberof renderer
* @param {boolean} [silent] - Boolean with default value. Shows a feedback in case of no available updates If 'silent' = false. Special handling for manually triggered update search
*/
function searchYoutubeDLUpdate (silent = true) {
    ui.windowMainLoadingAnimationShow()
    ui.windowMainApplicationStateSet('Searching updates for youtube-dl binary')

    // check if we could update in general = is details file writeable?
    // if not - we can cancel right away
    var youtubeDlBinaryDetailsPath = youtube.youtubeDlBinaryDetailsPathGet()
    canWriteFileOrFolder(youtubeDlBinaryDetailsPath, function (error, isWritable) {
        if (error) {
            utils.writeConsoleMsg('error', 'searchYoutubeDLUpdate ::: Error while trying to read the youtube-dl details file. Error: ' + error)
            throw error
        }

        if (isWritable === true) {
            // technically we could execute an update if there is one.
            // so lets search for updates
            // check if there is an update
            utils.writeConsoleMsg('info', 'searchYoutubeDLUpdate ::: Updating youtube-dl binary is technically possible - so start searching for avaulable updates.')
            var isYoutubeBinaryUpdateAvailable = youtube.youtubeDlBinaryUpdateSearch(silent)
        } else {
            // details file cant be resetted due to permission issues
            utils.writeConsoleMsg('warn', 'searchYoutubeDLUpdate ::: Updating youtube-dl binary is not possible on this setup due to permission issues.')
        }
    })
}

/**
* @function settingsGetYoutubeDLBinaryVersion
* @summary Gets the youtube-dl binary version and displays it in settings ui
* @description Reads the youtube-dl binary version from 'node_modules/youtube-dl/bin/details'
* @memberof renderer
* @return ytdlBinaryVersion - The youtube-dl binary version string
*/
function settingsGetYoutubeDLBinaryVersion (_callback) {
    const fs = require('fs')

    var youtubeDlBinaryDetailsPath = youtube.youtubeDlBinaryDetailsPathGet() // get path to youtube-dl binary details
    fs.readFile(youtubeDlBinaryDetailsPath, 'utf8', function (error, contents) {
        if (error) {
            utils.writeConsoleMsg('error', 'settingsGetYoutubeDLBinaryVersion ::: Unable to detect youtube-dl binary version. Error: ' + error + '.')
            utils.showNoty('error', 'Unable to detect local youtube-dl binary version number. Error: ' + error, 0) // see sentry issue: MEDIA-DUPES-5A
            throw error
        } else {
            const data = JSON.parse(contents)
            ytdlBinaryVersion = data.version // extract and store the version number
            utils.writeConsoleMsg('info', 'settingsGetYoutubeDLBinaryVersion ::: youtube-dl binary is version: _' + ytdlBinaryVersion + '_.')
            _callback()
        }
    })
}

// ----------------------------------------------------------------------------
// IPC
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// IPC - on ready-to-show
// ----------------------------------------------------------------------------

/**
* @name startSearchUpdatesSilent
* @summary Triggers the check for media-dupes updates in silent mode
* @description Called via ipc from main.js on-ready to start the search for media-dupes updates
* @memberof renderer
*/
require('electron').ipcRenderer.on('startSearchUpdatesSilent', function () {
    searchUpdate(true) // If silent = false -> Forces result feedback, even if no update is available
})

/**
* @name youtubeDlSearchUpdatesSilent
* @summary Triggers the check for youtube-dl updates in silent mode
* @description Called via ipc from main.js on-ready to check the search for youtube-dl updates
* @memberof renderer
*/
require('electron').ipcRenderer.on('youtubeDlSearchUpdatesSilent', function () {
    searchYoutubeDLUpdate(true) // If silent = false -> Forces result feedback, even if no update is available
})

/**
* @name startCheckingDependencies
* @summary Triggers the check for the application dependencies
* @description Called via ipc from main.js on-ready to check the application dependencies
* @memberof renderer
*/
require('electron').ipcRenderer.on('startCheckingDependencies', function () {
    checkApplicationDependencies()
})

/**
* @name startDisclaimerCheck
* @summary Triggers the check for disclaimer need
* @description Called via ipc from main.js on-ready to check for the disclaimer need
* @memberof renderer
*/
require('electron').ipcRenderer.on('startDisclaimerCheck', function () {
    utils.disclaimerCheck()
})

/**
* @name todoListCheck
* @summary Triggers the check restoring previosly stored urls
* @description Called via ipc from main.js on-ready-to-show and starts the restore function
* @memberof renderer
*/
require('electron').ipcRenderer.on('todoListCheck', function () {
    utils.writeConsoleMsg('info', 'todoListCheck ::: main.js forces renderer to check for urls to restore')
    ui.windowMainToDoListRestore()
})

// ----------------------------------------------------------------------------
// IPC - by menu
// ----------------------------------------------------------------------------

/**
* @name startSearchUpdatesVerbose
* @summary Start searching for updates in non-silent mode
* @description Called via ipc from main.js / menu to search for applicatipn updates
* @memberof renderer
*/
require('electron').ipcRenderer.on('startSearchUpdatesVerbose', function () {
    searchUpdate(false) // silent = false. Forces result feedback, even if no update is available
})

/**
* @name openSettings
* @summary Triggers loading the settings UI
* @description Called via ipc from main.js / menu to open the Settings UI
* @memberof renderer
*/
require('electron').ipcRenderer.on('openSettings', function () {
    ui.windowMainSettingsUiLoad()
})

/**
* @name youtubeDlBinaryUpdate
* @summary Triggers updating the youtube-dl binary
* @description Called via ipc from main.js / menu to update the youtube-dl binary
* @memberof renderer
*/
require('electron').ipcRenderer.on('youtubeDlBinaryUpdate', function () {
    youtube.youtubeDlBinaryUpdate()
})

/**
* @name youtubeDlBinaryPathReset
* @summary Triggers resetting the path to the youtube-dl binary back to default
* @description Called via ipc from main.js / menu to reset the path to the youtube-dl binary
* @memberof renderer
*/
require('electron').ipcRenderer.on('youtubeDlBinaryPathReset', function () {
    var youtubeDlBinaryDetailsPath = youtube.youtubeDlBinaryDetailsPathGet() // get path to youtube-dl binary details file

    canWriteFileOrFolder(youtubeDlBinaryDetailsPath, function (error, isWritable) {
        if (error) {
            utils.writeConsoleMsg('error', 'youtubeDlBinaryPathReset ::: Error while trying to check if the youtube-dl details file is writeable or not. Error: ' + error)
            throw error
        }

        if (isWritable === true) {
            utils.writeConsoleMsg('info', 'youtubeDlBinaryPathReset ::: :  Found the youtube-dl details file and it is writeable. Gonna ask the user now if he wants to reset the path now')

            // ask the user if he wants to update using a confirm dialog
            const Noty = require('noty')
            var n = new Noty(
                {
                    theme: 'bootstrap-v4',
                    layout: 'bottom',
                    type: 'info',
                    closeWith: [''], // to prevent closing the confirm-dialog by clicking something other then a confirm-dialog-button
                    text: 'Do you really want to reset the youtube-dl binary path back to its default value?',
                    buttons: [
                        Noty.button('Yes', 'btn btn-success mediaDupes_btnDownloadActionWidth', function () {
                            n.close()
                            youtube.youtubeDlBinaryPathReset(youtubeDlBinaryDetailsPath)
                        },
                        {
                            id: 'button1', 'data-status': 'ok'
                        }),

                        Noty.button('No', 'btn btn-secondary mediaDupes_btnDownloadActionWidth float-right', function () {
                            n.close()
                        })
                    ]
                })

            n.show() // show the noty dialog
        } else {
            // details file cant be resetted due to permission issues
            utils.writeConsoleMsg('warn', 'youtubeDlBinaryPathReset ::: Found youtube-dl binary update, but unable to execute update due to permissions')
        }
    })

    utils.writeConsoleMsg('info', 'youtubeDlBinaryPathReset ::: Finished re-setting the binary path for youtube-dl')
})

// ----------------------------------------------------------------------------
// IPC - by power-state
// ----------------------------------------------------------------------------

/**
* @name powerMonitorNotification
* @summary Triggers power specific notifications to the UI
* @description Called via ipc from main.js to trigger a notification about the powerState
* @memberof renderer
*/
require('electron').ipcRenderer.on('powerMonitorNotification', function (event, messageType, messageText, messageDuration) {
    utils.writeConsoleMsg('warn', 'powerMonitorNotification ::: Main wants to show a notification of the type: _' + messageType + '_ and the message: _' + messageText + '_ with the duration: _' + messageDuration + '_.')
    utils.showNoty(messageType, messageText, messageDuration)
})

// ----------------------------------------------------------------------------
// IPC - by settings window closed
// ----------------------------------------------------------------------------

/**
* @name unblurMainUI
* @summary Triggers unbluring the UI
* @description Called via ipc from main.js when the settings UI got closed to trigger unblur'ing the main UI
* @memberof renderer

*/
require('electron').ipcRenderer.on('unblurMainUI', function () {
    ui.windowMainBlurSet(false)
})

// ----------------------------------------------------------------------------
// IPC - by mainwindow close event
// ----------------------------------------------------------------------------

/**
* @name todoListTryToSave
* @summary Triggers saving of the current todoList
* @description Called via ipc from main.js  when the application gets closed Should save existing todoList entries
* @memberof renderer
*/
require('electron').ipcRenderer.on('todoListTryToSave', function () {
    ui.windowMainToDoListSave()
})

function getInfo () {
    const youtubedl = require('youtube-dl')

    // const url = 'http://www.youtube.com/watch?v=WKsjaOqDXgg'
    const url = 'https://vimeo.com/274478457 '
    // Optional arguments passed to youtube-dl.
    const options = ['--youtube-skip-dash-manifest']

    youtubedl.getInfo(url, options, function (err, info) {
        if (err) throw err

        console.log('id:', info.id)
        console.log('title:', info.title)
        console.log('url:', info.url)
        console.log('thumbnail:', info.thumbnail)
        console.log('description:', info.description)
        console.log('filename:', info._filename)
        console.log('format id:', info.format_id)
    })
}
