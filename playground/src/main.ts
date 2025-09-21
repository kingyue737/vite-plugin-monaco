import * as monaco from 'monaco-editor';
import '~monaco/deps'
import '~monaco/workers'

monaco.editor.create(document.getElementById('container')!, {
	value: 'console.log("Hello, world")',
	language: 'javascript'
});
