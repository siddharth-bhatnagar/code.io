let console = (function (oldConsole) {
    return {
        log() {
            oldConsole.log(tex)
        }
    }
})(window.console);