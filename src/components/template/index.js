import QuillBetterTable from 'quill-better-table'

import { useCallback, useEffect } from "react";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
const Template = () => {
    //PERIMITE NÃO EXIBIR MODAL DE NOTAS
    sessionStorage.setItem('modal_notas', 'hide');

    const { quill, quillRef } = useQuill();
  
 

    // Open Dialog to select Image File
    // Insert Image(selected by user) to quill
    /*
  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', url);
  };
     const saveToServer = async (file) => {
    const body = new FormData();
    body.append('file', file);

    const res = await fetch('Your Image Server URL', { method: 'POST', body });
    insertToEditor(res.uploadedImageUrl);
  };
  const selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    	
    };
  };
*/



    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                console.log('Text change!');
                console.log(quill.getText()); // Get text only
                console.log(quill.getContents()); // Get delta contents
                console.log(quill.root.innerHTML); // Get innerHTML using quill
                console.log(quillRef.current.firstChild.innerHTML, 't'); // Get innerHTML using quillRef
                //quill.getModule('toolbar').addHandler('image', selectLocalImage);
            });

            var str = ``;

            quill.clipboard.dangerouslyPasteHTML(str);
        }
    }, [quill]);


    return (


        <div className="container produtos">
            <h2>EM DESENVOLVIMENTO !</h2>

            
            <div style={{ Width: '100%', height: 300 }}>
                <div ref={quillRef} />
            </div>
            {/*
            <div class="row">
                    <div class="col-4">
                        1
                    </div>
                    <div class="col-4">
                        1
                    </div>

                </div>

            <div class="row">
                <div class="col-sm-4 col-md border-end">
                    col-4
                </div>
                <div class="col-sm-8 col-md ">
                    col-8
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 col-md">
                    col-sm-4
                </div>
                <div class="col-sm-4 col-md">
                    col-sm-4
                </div>
                <div class="col-sm-4 col-md">
                    col-sm-4
                </div>
            </div>
            */}
        </div>

    )

}
export default Template;