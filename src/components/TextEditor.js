import React, { useState } from 'react';

// rich text editor
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

function TextEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  function handleEditorChange(newEditorState) {
    setEditorState(newEditorState);
  }

  function handleBoldClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  function handleItalicClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  }

  function handleUnderlineClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  }

  return (
    <div>
      <button onClick={handleBoldClick}>Bold</button>
      <button onClick={handleItalicClick}>Italic</button>
      <button onClick={handleUnderlineClick}>Underline</button>
      <Editor editorState={editorState} onChange={handleEditorChange} />
    </div>
  );

}
export default TextEditor;