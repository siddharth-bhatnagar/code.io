// Buttons
let runBtn = $("#run");
let resetBtn = $("#reset");

// Editor config
let codeEditor = ace.edit("editor");

let defaultCode = 'console.log("Hello World!");';
let defaultTheme = 'textmate';
let defaultLang = 'javascript';
let defaultFontSize = '18px';

let editorLib = {
    init: function () {
        // Theme
        codeEditor.setTheme(`ace/theme/${defaultTheme}`);

        // Set Language
        codeEditor.session.setMode(`ace/mode/${defaultLang}`);
        codeEditor.setShowPrintMargin(false);
        codeEditor.session.setUseWrapMode(true);

        // Set Options
        codeEditor.setOptions({
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: true,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            fontSize: defaultFontSize
        });

        // code snippet
        codeEditor.setValue(defaultCode);
    },
}

editorLib.init();

runBtn.click(function (e) {
    const userCode = codeEditor.getValue();
    // Run the user code
    try {
        new Function(userCode)();
    }
    catch (err) {
        console.log(err);
    }
});

resetBtn.click(function () {
    // Clear editor
    codeEditor.setValue(defaultCode);
});

$(".dropdown-item.lang").click(function (e) {
    let id = $(this).attr("id");
    if (id !== "javascript") {
        let modal = $(`<div class="modal-background">
                            <div class="modal-content">
                                <div class="header">
                                    <h5 class="title">Oops!</h5>
                                    <button type="button" class="btn-close cls"></button>
                                </div>
                                <hr>
                                <div class="content">
                                    <p>You tried selecting a language which is not yet supported by us. Sorry for the inconvenience,
                                        the listed languages will be added soon.</p>
                                </div>
                                <hr>
                                <div class="footer">
                                    <button type="button" class="btn btn-secondary cls">Close</button>
                                </div>
                            </div>
                        </div>`);

        $("body").append(modal);

        $(".cls").click(function(e) {
            modal.remove();
        });
    }
});

$(".dropdown-item.theme").click(function (e) {
    let theme = $(this).attr("id");
    // console.log(theme);
    codeEditor.setTheme(`ace/theme/${ theme }`);
    let themeName = $(this).text();
    $("#theme-btn").text(themeName);
});

