


// Buttons
const runBtn = $("#run");
const resetBtn = $("#reset");

// Editor config
let editor = ace.edit("editor");

// Default params
let defaultTheme = 'textmate';
let defaultLang = 'javascript';
let defaultFontSize = '18px';
let defaultCode = 'console.log("Hello, World");';

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
});

$(".dropdown-item.lang").click(function (e) {
    let language = $(this).attr("id");
    let name = $(this).text();
    $("#language").text(`${name}`);
    handleLangChange(language);
});

function handleLangChange(language) {
    let snippet;
    switch (language) {
        case 'javascript':
            snippet = defaultCode;
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

        // case 'golang':
        //     snippet = `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("!... Hello World ...!")\n}`;
        //     break;

        // case 'typescript':
        //     snippet = `var greet: string = "Greetings";\nvar user: string = "Programmer!";\nconsole.log(greet + " " + user);`
        //     break;
    }

    editor.setValue(snippet);
    editor.session.setMode(`ace/mode/${language}`);
}


async function compileIt(code, lang) {

    let response = await fetch("http://127.0.0.1:3000", {
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
    let language = parseLang();
    let code = editor.getSession().getValue();
    compileIt(code, language);
});

resetBtn.click(function (e) {
    editor.session.setValue('');
});

function parseLang() {
    let langName = $("#language").text();
    console.log(langName)
    let language;
    if (langName == 'Node JS') {
        language = 'nodejs';
    }
    if (langName == 'C++') {
        language = 'cpp';
    }
    if (langName == 'Python') {
        language = 'python3';
    }

    if (langName == 'Java') {
        language = 'java';
    }
    console.log(language);
    return language;

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

