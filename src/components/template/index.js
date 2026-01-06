
import { useCallback, useEffect } from "react";
import Editor from "./Editor";
const Template = () => {
    //PERIMITE NÃO EXIBIR MODAL DE NOTAS
    sessionStorage.setItem('modal_notas', 'hide');
 
    return (

        
        <div className="container produtos">
            <h2>EM DESENVOLVIMENTO !</h2>
           
        <Editor />
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