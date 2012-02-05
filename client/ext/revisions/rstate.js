/**
 * 
 * 
 * @author Matt Pardee
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */

define(function(require, exports, module) {

var rsession = require("ext/revisions/rsession");
var rutil = require("ext/revisions/util");
var timeline = require("ext/revisions/timeline");

module.exports = (function() {
    function RState() {
        this.sessions = {};
        this.currentFile = "";
        this.lastFileLoaded = "";
    }

    RState.prototype = {
        addSession : function(file) {
            this.sessions[file] = new rsession();
            return this.sessions[file];
        },

        getSession : function(file) {
            if (file)
                return this.sessions[file];

            return this.sessions[this.currentFile];
        },

        setCurrentFile : function(file) {
            this.currentFile = file;
        },

        getCurrentFile : function() {
            return this.currentFile;
        },

        setLastFileLoaded : function(file) {
            this.lastFileLoaded = file;
        },

        getLastFileLoaded : function() {
            return this.lastFileLoaded;
        },

        restoreState : function(session) {
            var mdlOut = session.getLogDataXml();
            mdlCommits.load(mdlOut);

            var gitLog = session.getGitLog();
            var output = rutil.formulateRevisionMetaData(gitLog[session.lastLoadedGitLog], true);
            versions_label.setValue(output);

            if (session.isFirstGitShow() === false)
                current_versions_label.setValue(session.metaDataOutput);

            timeline.setupTimeline(gitLog);
            tbRevisionsSearch.enable();

            gitLog[session.getLastLoadedGitLog()].dotEl.setAttribute("class", "current");
        }
    };

    return RState;
})();

});