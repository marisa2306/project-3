// import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import React, { Component } from 'react'
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import './EditorContainer.css'

// class EditorContainer extends Component {
//     constructor(props) {
//         super(props);
//         // this.state = {
//         //     editorState: EditorState.createEmpty(),
//         // };
//         this.state = {};

//         const content = window.localStorage.getItem('content');

//         if (content) {
//             this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
//         } else {
//             this.state.editorState = EditorState.createEmpty();
//         }
//     }

//     componentDidMount() {
//         fetch('/content').then(val => val.json())
//             .then(rawContent => {
//                 if (rawContent) {
//                     this.setState({ editorState: EditorState.createWithContent(convertFromRaw(rawContent)) })
//                 } else {
//                     this.setState({ editorState: EditorState.createEmpty() });
//                 }
//             });
//     }

//     onEditorStateChange = editorState => {
//         //console.log(editorState)
//         // this.setState({
//         //     editorState,
//         // });

//         // const contentState = editorState.getCurrentContent();
//         // console.log('content state', convertToRaw(contentState));
//         // this.setState({
//         //     editorState,
//         // })

//         const contentState = editorState.getCurrentContent();
//         this.saveContent(contentState);
//         this.setState({
//             editorState,
//         });

//     }


//     saveContent = (content) => {
//         window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
//     }

//     render() {

//         //const { editorState } = this.state;

//         return (

//             <div className='editor'>
//                 <Editor
//                     editorState={this.state.editorState}
//                     onEditorStateChange={this.onEditorStateChange}
//                     toolbar={{
//                         inline: { inDropdown: true },
//                         list: { inDropdown: true },
//                         textAlign: { inDropdown: true },
//                         link: { inDropdown: true },
//                         history: { inDropdown: true },

//                         // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
//                     }}
//                 />
//             </div>
//         )
//     }
// }

// export default EditorContainer

import React, { Component } from 'react';
import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';
import debounce from 'lodash/debounce';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    saveContent = debounce((content) => {
        fetch('/content', {
            method: 'POST',
            body: JSON.stringify({
                content: convertToRaw(content),
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    }, 1000);

    onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        this.saveContent(contentState);
        this.setState({
            editorState,
        });
    }

    componentDidMount() {
        fetch('/content').then(val => val.json())
            .then(rawContent => {
                if (rawContent) {
                    this.setState({ editorState: EditorState.createWithContent(convertFromRaw(rawContent)) })
                } else {
                    this.setState({ editorState: EditorState.createEmpty() });
                }
            });
    }

    render() {
        if (!this.state.editorState) {
            return (
                <h3 className="loading">Loading...</h3>
            );
        }
        return (
            <div>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default App;