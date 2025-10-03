const TabelaUsuario = () => {
    return (
        <div class="table-responsive mt-4 m-3">

            <table class="table caption-top ">
                <caption>Lista de produtos</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome </th>
                        <th scope="col">Qtd.</th>
                        <th scope="col">Preço unit.</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={1}>
                        <th scope="row">{1}</th>
                        <td>{"val.nome"}</td>
                        <td>{"val.quantidade"}</td>
                        <td>{"val.preco"}</td>
                        <td>
                            <button data-bs-toggle="modal"  data-bs-target={"#editProduto-"} class="btn btn-sm btn-outline-secondary bi bi-pencil-square m-2"></button>
                                    <button  class="btn btn-sm btn-outline-secondary bi bi-x-lg"></button>
                        </td>

                    </tr>


                </tbody>
            </table>


        </div>
    )
}
export default TabelaUsuario;