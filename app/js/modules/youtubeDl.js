/**
 * @file Contains all youtubeDl functions
 * @author yafp
 * @module youtubeDl
 */

'use strict'

const ui = require('./ui.js')
const utils = require('./utils.js')

/**
* @function youtubeDlBinaryPathGet
* @summary Gets the path to the youtube-dl binary file
* @description Gets the path to the youtube-dl binary file using getYtdlBinary()
* @return {string} youtubeDlBinaryPath - The actual path to the youtube-dl binary
*/
function youtubeDlBinaryPathGet () {
    const youtubedl = require('youtube-dl')
    var youtubeDlBinaryPath
    youtubeDlBinaryPath = youtubedl.getYtdlBinary() // get the path of the binary
    utils.writeConsoleMsg('info', 'youtubeDlBinaryPathGet ::: youtube-dl binary path is: _' + youtubeDlBinaryPath + '_.')
    return (youtubeDlBinaryPath)
}

/**
* @function youtubeDlBinaryPathReset
* @summary Resets the youtube-dl binary path in details
* @description Resets the youtube-dl binary path in details
* @param {string} path - The path to the youtube-dl details file
*/
function youtubeDlBinaryPathReset (path) {
    const fs = require('fs')

    fs.readFile(path, 'utf8', function (error, contents) {
        if (error) {
            utils.writeConsoleMsg('error', 'youtubeDlBinaryPathReset ::: Error while trying to read the youtube-dl path. Error: ' + error)
            utils.showNoty('error', 'Unable to read the youtube-dl binary details file. Error: ' + error)
            throw error
        } else {
            const data = JSON.parse(contents)
            var youtubeDlBinaryPath = data.path
            utils.writeConsoleMsg('info', 'youtubeDlBinaryPathReset ::: youtube-dl binary path was: _' + youtubeDlBinaryPath + '_ before reset.')

            // now update it
            if (youtubeDlBinaryPath !== null) {
                // update it back to default
                data.path = null
                fs.writeFileSync(path, JSON.stringify(data))
                utils.writeConsoleMsg('info', 'youtubeDlBinaryPathReset ::: Did reset the youtube-dl binary path back to default.')
                utils.showNoty('success', 'Did reset the youtube-dl binary path back to default')
            } else {
                // nothing to do
                utils.writeConsoleMsg('info', 'youtubeDlBinaryPathReset ::: youtube-dl binary path is: _' + youtubeDlBinaryPath + '_. This is the default')
                utils.showNoty('info', 'The youtube-dl binary path was already on its default value. Did no changes.')
            }
        }
    })
}

/**
* @function youtubeDlBinaryUpdate
* @summary Updates the youtube-dl binary
* @description Updates the youtube-dl binary
*/
function youtubeDlBinaryUpdate () {
    const youtubedl = require('youtube-dl')
    const downloader = require('youtube-dl/lib/downloader')

    const remote = require('electron').remote
    const app = remote.app
    const path = require('path')
    const targetPath = path.join(app.getPath('userData'), 'youtube-dl') // set targetPath

    utils.showNoty('info', 'Trying to update the youtube-dl binary. This might take some time - wait for feedback ...')

    var youtubeDlBinaryPath = youtubeDlBinaryPathGet()
    utils.writeConsoleMsg('info', 'youtubeDlBinaryUpdate ::: Searching youtube-dl binary')
    utils.writeConsoleMsg('info', 'youtubeDlBinaryUpdate ::: Found youtube-dl binary in: _' + youtubeDlBinaryPath + '_.')

    // start downloading latest youtube-dl binary to custom path
    downloader(targetPath, function error (error, done) {
        'use strict'
        if (error) {
            utils.writeConsoleMsg('error', 'youtubeDlBinaryUpdate ::: Error while trying to update the youtube-dl binary at: _' + targetPath + '_. Error: ' + error)
            utils.showNoty('error', 'Unable to update youtube-dl binary. Error: ' + error, 0)
            throw error
        }
        utils.writeConsoleMsg('info', 'youtubeDlBinaryUpdate ::: Updated youtube-dl binary at: _' + targetPath + '_.')
        console.log(done)
        utils.showNoty('success', done)
    })
}

/**
* @function youtubeDlBinaryUpdateSearch
* @summary Searches for youtube-dl binary updates
* @description Searches for youtube-dl binary updates
* @param {boolean} silent - Defaults to true. If true, the progress is silent, if false there is info-feedback even if there is no update available
*/
function youtubeDlBinaryUpdateSearch (silent = true) {
    var remoteAppVersionLatest = '0.0.0'
    var localAppVersion = '0.0.0'
    var versions

    // set youtube-dl API url
    const urlYTDLGitHubRepoTags = 'https://api.github.com/repos/ytdl-org/youtube-dl/tags'

    utils.writeConsoleMsg('info', 'youtubeDlBinaryUpdateSearch ::: Start checking _' + urlYTDLGitHubRepoTags + '_ for available releases')

    var updateStatus = $.get(urlYTDLGitHubRepoTags, function (data) {
        3000 // in milliseconds

        // success
        versions = data.sort(function (v1, v2) {
            // return semver.compare(v2.name, v1.name);
        })

        // get remote version
        //
        remoteAppVersionLatest = versions[0].name
        utils.writeConsoleMsg('info', 'youtubeDlBinaryUpdateSearch ::: Latest Remote version is: ' + remoteAppVersionLatest)
        // remoteAppVersionLatest = '66.6.6'; // overwrite variable to simulate available updates

        // get local version
        youtubeDlBinaryDetailsValueGet(function () {
            utils.writeConsoleMsg('info', 'youtubeDlBinaryUpdateSearch ::: Fetched all values from details file')

            // console.warn(youtubeDlBinaryDetailsVersion)
            // console.warn(youtubeDlBinaryDetailsPath)
            // console.warn(youtubeDLBinaryDetailsExec)

            localAppVersion = youtubeDlBinaryDetailsVersion

            utils.writeConsoleMsg('info', 'youtubeDlBinaryUpdateSearch ::: Local youtube-dl binary version: ' + localAppVersion)
            utils.writeConsoleMsg('info', 'youtubeDlBinaryUpdateSearch ::: Latest youtube-dl binary version: ' + remoteAppVersionLatest)

            if (localAppVersion < remoteAppVersionLatest) {
                utils.writeConsoleMsg('info', 'youtubeDlBinaryUpdateSearch ::: Found update for youtube-dl binary. Gonna start the update routine now ...')
                youtubeDlBinaryUpdate()
                if (silent === false) {
                    utils.showNoty('info', '<b>youtube-dl binary update available</b><br>You are currently using ' + localAppVersion + ' and the latest available version of the youtube-dl binary is ' + remoteAppVersionLatest + '.')
                }
            } else {
                if (silent === false) {
                    utils.showNoty('info', '<b>No youtube-dl binary update available</b><br>You are already using the latest binary version of youtube-dl')
                }
            }
        })

        utils.writeConsoleMsg('info', 'youtubeDlBinaryUpdateSearch ::: Successfully checked ' + urlYTDLGitHubRepoTags + ' for available releases')
    })
        .done(function () {
        // utils.writeConsoleMsg('info', 'youtubeDlBinaryUpdateSearch ::: Successfully checked ' + urlGitHubRepoTags + ' for available releases');
        })

        .fail(function () {
            utils.writeConsoleMsg('info', 'youtubeDlBinaryUpdateSearch ::: Checking ' + urlYTDLGitHubRepoTags + ' for available releases failed.')
            utils.showNoty('error', 'Checking <b>' + urlYTDLGitHubRepoTags + '</b> for available releases failed. Please troubleshoot your network connection.', 0)
        })

        .always(function () {
            utils.writeConsoleMsg('info', 'youtubeDlBinaryUpdateSearch ::: Finished checking ' + urlYTDLGitHubRepoTags + ' for available releases')
            ui.windowMainLoadingAnimationHide()
            ui.windowMainButtonsOthersEnable()
            ui.windowMainApplicationStateSet()
        })
}

/**
* @function youtubeDlBinaryDetailsPathGet
* @summary Gets the path to the youtube-dl binary details file
* @description Gets the path to the youtube-dl binary details file
* @return {string} youtubeDlBinaryDetailsPath - The actual path to the youtube-dl details file
*/
function youtubeDlBinaryDetailsPathGet () {
    const path = require('path')
    const remote = require('electron').remote
    const app = remote.app

    var youtubeDlBinaryDetailsPath = path.join(app.getAppPath(), 'node_modules', 'youtube-dl', 'bin', 'details')
    return (youtubeDlBinaryDetailsPath)
}

/**
* @function youtubeDlBinaryDetailsValueGet
* @summary Gets all values from the youtube-dl binary details file
* @description Gets all values from the youtube-dl binary details file
*/
function youtubeDlBinaryDetailsValueGet (_callback) {
    const fs = require('fs')

    var youtubeDlBinaryDetailsPath = youtubeDlBinaryDetailsPathGet() // get the path to the details file

    fs.readFile(youtubeDlBinaryDetailsPath, 'utf8', function (error, contents) {
        if (error) {
            utils.writeConsoleMsg('error', 'youtubeDlBinaryDetailsValueGet ::: Unable to read youtube-dl binary details values. Error: ' + error + '.')
            throw error
        } else {
            const data = JSON.parse(contents)

            /*
            console.error(data)

            console.warn(data.version)
            console.warn(data.path)
            console.warn(data.exec)
            */

            youtubeDlBinaryDetailsVersion = data.version
            youtubeDlBinaryDetailsPath = data.path
            youtubeDLBinaryDetailsExec = data.exec

            utils.writeConsoleMsg('info', 'youtubeDlBinaryDetailsValueGet ::: Version: ' + youtubeDlBinaryDetailsVersion + '.')
            utils.writeConsoleMsg('info', 'youtubeDlBinaryDetailsValueGet ::: Path: ' + youtubeDlBinaryDetailsPath + '.')
            utils.writeConsoleMsg('info', 'youtubeDlBinaryDetailsValueGet ::: Exec: ' + youtubeDLBinaryDetailsExec + '.')

            // console.info(data[value])
            // var currentDetailsValue = data[value]

            // utils.writeConsoleMsg('warn', 'youtubeDlBinaryDetailsValueGet ::: youtube-dl binary details value is version: _' + currentDetailsValue + '_.')
            _callback()
        }
    })
}

// Exporting the module functions
//
module.exports.youtubeDlBinaryPathGet = youtubeDlBinaryPathGet
module.exports.youtubeDlBinaryPathReset = youtubeDlBinaryPathReset
module.exports.youtubeDlBinaryUpdate = youtubeDlBinaryUpdate
module.exports.youtubeDlBinaryUpdateSearch = youtubeDlBinaryUpdateSearch
module.exports.youtubeDlBinaryDetailsPathGet = youtubeDlBinaryDetailsPathGet
module.exports.youtubeDlBinaryDetailsValueGet = youtubeDlBinaryDetailsValueGet
