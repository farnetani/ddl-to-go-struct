// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

String.toTitle = function(str) {
  if (str && str.length > 0) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return "";
};

function makeTitle(title) {
  let retval = "";
  if (title.indexOf("_") > -1) {
    const parts = title.split("_");
    parts.forEach((val) => {
      retval += makeTitle(val.toString());
    });
  } else {
    if (title.length <= 3) {
      retval = title.toUpperCase();
    } else {
      retval = String.toTitle(title);
    }
  }

  return retval;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.ddl-to-go-struct",
    function() {
      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        return; // No open text editor
      }

      var selection = editor.selection;
      var text = editor.document.getText(selection);
      if (text.length === 0) {
        return;
      }
      const sqlLines = text.split("\n");

      let structCodes = [];
      sqlLines.forEach((line) => {
        line = line.trim();
        if (line.length == 0) {
          return;
        }

        try {
          const rs = /create\stable\s"?([a-zA-Z\.\_]+)"?\s?\(?/gim.exec(line);
          if (rs != null) {
            let tableTitle = rs[1];
            tableTitle = tableTitle.replace(/([a-zA-Z]+\.)/, "");
            tableTitle = tableTitle.replace(/^(t\_)/, "");
            structCodes = [
              ...structCodes,
              "\n// " + makeTitle(tableTitle) + " --",
            ];
            structCodes = [
              ...structCodes,
              "type " + makeTitle(tableTitle) + " struct {",
            ];
          }

          if (/[a-zA-Z\_]+\s(uuid)/gi.exec(line) != null) {
            const colunmName = line.split(" ")[0];
            if (/not\snull/gi.exec(line) == null) {
              structCodes = [
                ...structCodes,
                "\t" +
                  makeTitle(colunmName) +
                  '\tstring\t`db:"' +
                  colunmName +
                  '"`',
              ];
            } else {
              structCodes = [
                ...structCodes,
                "\t" +
                  makeTitle(colunmName) +
                  '\tuuid.UUID\t`db:"' +
                  colunmName +
                  '"`',
              ];
            }
          }

          if (
            /[a-zA-Z\_]+\s(text|character|inet|varchar)/gi.exec(line) != null
          ) {
            const colunmName = line.split(" ")[0];
            if (/not\snull/gi.exec(line) == null) {
              structCodes = [
                ...structCodes,
                "\t" +
                  makeTitle(colunmName) +
                  '\tstring\t`db:"' +
                  colunmName +
                  '"`',
              ];
            } else {
              structCodes = [
                ...structCodes,
                "\t" +
                  makeTitle(colunmName) +
                  '\tstring\t`db:"' +
                  colunmName +
                  '"`',
              ];
            }
          }

          if (
            /[a-zA-Z\_]+\s(serial|integer|bigserial|bigint|smallint)/gi.exec(
              line
            ) != null
          ) {
            const colunmName = line.split(" ")[0];
            if (/not\snull/gi.exec(line) == null) {
              structCodes = [
                ...structCodes,
                "\t" +
                  makeTitle(colunmName) +
                  '\tsql.NullInt64\t`db:"' +
                  colunmName +
                  '"`',
              ];
            } else {
              structCodes = [
                ...structCodes,
                "\t" +
                  makeTitle(colunmName) +
                  '\tint64\t`db:"' +
                  colunmName +
                  '"`',
              ];
            }
          }

          if (/[a-zA-Z\_]+\s(float|numeric)/gi.exec(line) != null) {
            const colunmName = line.split(" ")[0];
            if (/not\snull/gi.exec(line) == null) {
              structCodes = [
                ...structCodes,
                "\t" +
                  makeTitle(colunmName) +
                  '\tsql.NullFloat64\t`db:"' +
                  colunmName +
                  '"`',
              ];
            } else {
              structCodes = [
                ...structCodes,
                "\t" +
                  makeTitle(colunmName) +
                  '\tfloat64\t`db:"' +
                  colunmName +
                  '"`',
              ];
            }
          }

          if (/[a-zA-Z\_]+\s(boolean)/gi.exec(line) != null) {
            const colunmName = line.split(" ")[0];
            if (/not\snull/gi.exec(line) == null) {
              structCodes = [
                ...structCodes,
                "\t" +
                  makeTitle(colunmName) +
                  '\tsql.NullBool\t`db:"' +
                  colunmName +
                  '"`',
              ];
            } else {
              structCodes = [
                ...structCodes,
                "\t" +
                  makeTitle(colunmName) +
                  '\tbool\t`db:"' +
                  colunmName +
                  '"`',
              ];
            }
          }

          if (/[a-zA-Z\_]+\s(json)/gi.exec(line) != null) {
            const colunmName = line.split(" ")[0];
            structCodes = [
              ...structCodes,
              "\t" +
                makeTitle(colunmName) +
                '\tmap[string]interface{}\t`db:"' +
                colunmName +
                '"`',
            ];
          }

          if (/[a-zA-Z\_]+\s(timestamp)/gi.exec(line) != null) {
            const colunmName = line.split(" ")[0];
            structCodes = [
              ...structCodes,
              "\t" +
                makeTitle(colunmName) +
                '\t*time.Time\t`db:"' +
                colunmName +
                '"`',
            ];
          }

          if (/\)\;/gi.exec(line) != null) {
            structCodes = [...structCodes, "}"];
          }
        } catch (error) {
          console.error(error);
        }
      });

      editor.edit((builder) => {
        builder.replace(selection, structCodes.join("\n"));
      });
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
