return (
  <>
    {/* <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={handleVoltar} className="btn btn-vermelho mb-3">
        <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Voltar
      </button>

    </div>
    <div>
      <h5 className="mb-0 ms-3 w titulo-ingressos">Carrinho</h5>
    </div>
    {(carrinhoRemovido || carrinho?.cartItems.length === 0) && (
      <p className="m-3 text-warning">O carrinho se encontra vazio!</p>
    )} */}
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="align-middle text-center" scope="col">Id</th>
            <th className="align-middle text-center" scope="col">Imagem</th>
            <th className="align-middle text-center" scope="col">Jogo</th>
            <th className="align-middle text-center" scope="col">Quantidade</th>
            <th className="align-middle text-center" scope="col">Preço</th>
            <th className="align-middle text-center" scope="col">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {carrinho?.cartItems.map((item, index) => (
            <tr key={item.cartItemId} className={index % 2 === 0 ? 'table-light' : 'table-secondary'}>
              <td className="align-middle text-center">{item.cartItemId}</td>
              <td className="align-middle">{item.game.image}</td>
              <td className="align-middle">{item.game.name}</td>
              <td className="align-middle text-end pe-3" style={{ width: "10px" }}>
                {/* <div className="input-group input-group-sm">
                  <input
                    className="form-control"
                    name="quantidade"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    onChange={(e) => handleChange(e, item)}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-sm" onClick={() => tratarAlteracaoItemDoCarrinho(item)}>
                      <FontAwesomeIcon icon={faSyncAlt} />
                    </button>
                  </div>
                </div> */}
                teste
              </td>
              <td className="align-middle text-end pe-3">
                {/* {(item.game.price * (1 - item.game.discount)).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })} */}
                teste
              </td>
              <td className="col-1 align-middle text-center">
                {/* <button onClick={() => tratarRemocaoItem(item!)} className="btn btn-danger btn-sm">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button> */}
                teste remover
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}></td>
            <td className="align-middle text-end fw-bold" style={{ width: "15%" }}>
              {/* R${" "}
              {carrinho?.totalPrice
                .toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })} */}
                preço total
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>

  </>
);