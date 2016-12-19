import {Server} from './server';
import {TextEditor, OutputChannel, TextEditorEdit} from 'vscode';
import * as vscode from 'vscode';

let outputChannel : OutputChannel;

export function displayGoalAtPosition(
    server : Server,
    editor : TextEditor,
    edit : TextEditorEdit,
    args : any[])
{
    outputChannel = vscode.window.createOutputChannel("Lean: Proof Context");

    let cursor = editor.selection.active;
    let fileName = editor.document.fileName;

    server.info(fileName, cursor.line + 1, cursor.character).then((response) => {
        if (response.record.state) {
            outputChannel.appendLine(response.record.state);
            outputChannel.show();
        } else {
            return null;
        }
    });
}