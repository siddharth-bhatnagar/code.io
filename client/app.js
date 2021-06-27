// Buttons
const runBtn = $("#run");
const resetBtn = $("#reset");

// Editor config
let editor = ace.edit("editor");

// Default params
let defaultTheme = 'terminal';
let defaultLang = 'javascript';
let defaultFontSize = '18px';
let defaultCode = 'console.log("Hello, World");';

let langs = {
    'Node JS': 'javascript',
    'C++': 'c_cpp',
    'Python': 'python',
    'Java': 'java'
};

let themes = {
    'Terminal': 'terminal',
    'Textmate': 'textmate',
    'Monokai': 'monokai',
    'Twilight': 'twilight',
    'Dracula': 'dracula',
    'Github': 'github',
    'Night Blue': 'tomorrow_night_blue'
};

$(document).ready(function (e) {
    const program = localStorage.getItem("code");
    const languageKey = localStorage.getItem("language") ? JSON.parse(localStorage.getItem("language")) : "Node JS";
    const themeKey = localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : "Terminal";
    const size = localStorage.getItem("fontSize") ? JSON.parse(localStorage.getItem("fontSize")) : "18";

    let theme = themes[themeKey];
    editor.setTheme(`ace/theme/${theme}`);
    $("#theme").text(`${themeKey}`);

    let language = langs[languageKey];
    console.log(language);
    editor.session.setMode(`ace/mode/${language}`);
    $("#language").text(`${languageKey}`);

    editor.session.setValue(JSON.parse(program), -1);

    editor.setOptions({
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        fontSize: size + "px"
    });

    $("#font-size").text(`${size}`);
});

function editorInit() {
    // set theme
    editor.setTheme(`ace/theme/${defaultTheme}`);
    // set language
    editor.session.setMode(`ace/mode/${defaultLang}`);
    editor.setShowPrintMargin(false);
    editor.session.setUseWrapMode(true);

    // set options 
    editor.setOptions({
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        fontSize: defaultFontSize
    });

    // default text
    editor.setValue(defaultCode);
}

editorInit();

$(".dropdown-item.nameTheme").click(function (e) {
    let theme = $(this).attr("id");
    editor.setTheme(`ace/theme/${theme}`);
    let name = $(this).text();
    $("#theme").text(`${name}`);
    localStorage.setItem("theme", JSON.stringify(name));
});

$(".dropdown-item.lang").click(function (e) {
    let language = $(this).attr("id");
    let name = $(this).text();
    $("#language").text(`${name}`);
    localStorage.setItem("language", JSON.stringify(name));
    handleLangChange(language);
});

function handleLangChange(language) {
    let snippet;
    switch (language) {
        case 'javascript':
            snippet = 'console.log("Hello, World!");';
            break;

        case 'c_cpp':
            snippet = `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!";\n\treturn 0;\n}`;
            break;

        case 'python':
            snippet = 'print("Hello, World!");'
            break;

        case 'java':
            snippet = `import java.io.*;\nimport java.util.*;\n\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}`;
            break;

        default:
            break;
    }

    editor.setValue(snippet);
    editor.session.setMode(`ace/mode/${language}`);
    const code = editor.session.getValue();
    localStorage.setItem("code", JSON.stringify(code));
}


async function compileIt(code, lang) {

    let response = await fetch("https://code-editor-io.herokuapp.com/", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: JSON.stringify({
            code: code,
            language: lang,
            standardIn: $("#stdin").val().split(/[|]+/).join("\n")
        })
    })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data);
            handleOutput(data);
        })
        .catch(error => alert(error.message));
}

runBtn.click(function (e) {
    let language = aceToJDoodle();
    let code = editor.getSession().getValue();
    compileIt(code, language);
});

resetBtn.click(function (e) {
    editor.session.setValue('');
});

function aceToJDoodle() {
    let lang = {
        'Node JS': 'nodejs',
        'C++': 'cpp',
        'Python': 'python3',
        'Java': 'java'
    };
    let language = $("#language").text();
    return lang[language];
}

function handleOutput(data) {
    $(".console p").remove();
    let output = ``;
    let arr = data.output.split("\n");
    arr.forEach((val) => {
        output += `${val}</br>`;
    });
    let stdout = `<p>${output}</p>`;
    display(stdout)
}

function display(output) {
    $(".console").append(output);
}

$(".dropdown-item.fs").click(function (e) {
    let fs = $(this).text();
    editor.setOptions({
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        fontSize: fs + "px"
    });
    $("#font-size").text(`${fs}`);
    localStorage.setItem("fontSize", JSON.stringify(fs));
});

editor.on("change", function () {
    const code = editor.session.getValue();
    localStorage.setItem("code", JSON.stringify(code));
});



