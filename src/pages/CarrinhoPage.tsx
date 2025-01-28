import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft";
import { CartItem } from "../interfaces/cartItem";
import { useRecuperarCarrinho } from "../hooks/useRecuperarCarrinho";
import { useRemoverCarrinho } from "../hooks/useRemoverCarrinho";
import { useRemoverItemCarrinho } from "../hooks/useRemoverItemCarrinho";
import { useAlterarItemCarrinho } from "../hooks/useAlterarItemCarrinho";
import "../styles/SessaoDeCards.css";


export const CarrinhoPage = () => {
  const navigate = useNavigate();

  function handleChange(event: any, cartItem: CartItem) {
    cartItem.quantity = event.target.value;
  }

  // Recuperar Carrinho
  const {
    data: carrinho,
    isLoading: carregandoCarrinho,
  } = useRecuperarCarrinho({cartId: 1, userId: 1});

  // Remover Item do carrinho
  const {
    data: itemRemovido, 
    mutate: removerItemDoCarrinho, 
    isLoading: removendoItemDoCarrinho 
  } = useRemoverItemCarrinho();

  // Alterar Item do carrinho
  const {
    data: itemAlterado,
    mutate: alterarItem,
    isLoading: alterandoItem,
    error: errorAlterarItem
  } = useAlterarItemCarrinho();


  const tratarRemocaoItem = (item: CartItem) => {
    removerItemDoCarrinho(item.cartItemId!);
  };

  const tratarAlteracaoItemDoCarrinho = (item: CartItem) => {
    alterarItem(item);
  }

  const handleVoltar = () => {
    carrinho?.cartItems.forEach((item) => {
      tratarAlteracaoItemDoCarrinho(item);
    })
    navigate(-1);
  };

  if (carregandoCarrinho) return <div>Carregando...</div>;
  if (errorAlterarItem) throw errorAlterarItem;

  return (
    <>
      <div className="p-3">
        <button onClick={handleVoltar} className="btn btn-azul-nub mb-3">
          <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Voltar
        </button>
      </div>
      <div>
        <h5 className="mb-4 ms-3 w titulo-ingressos titulo-sessao-card">Carrinho</h5>
      </div>
      {(carrinho?.cartItems.length === 0) && (
        <p className="m-3 text-warning">O carrinho está vazio!</p>
      )}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th className="align-middle text-center" scope="col">Item</th>
              <th className="align-middle text-center" scope="col">Capa</th>
              <th className="align-middle text-center" scope="col">Jogo</th>
              <th className="align-middle text-center" scope="col">Quantidade</th>
              <th className="align-middle text-center" scope="col">Preço</th>
              <th className="align-middle text-center" scope="col">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {carrinho?.cartItems.map((item, index) => (
              <tr key={item.cartItemId} /*className={index % 2 === 0 ? 'table-light' : 'table-secondary'}*/>
                <td className="align-middle text-center">{index+1}</td>
                <td className="align-middle text-center">
                  <img src={item.game.image} width="45px"/>
                </td>
                <td className="align-middle">{item.game.name}</td>
                <td className="align-middle text-end pe-3" style={{ width: "10px" }}>
                  <div className="input-group input-group-sm">
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
                  </div>
                </td>
                <td className="align-middle text-end pe-3">
                  {(item.game.price * (1 - item.game.discount)).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                  })}
                </td>
                <td className="col-1 align-middle text-center">
                  <button onClick={() => tratarRemocaoItem(item!)} className="btn btn-danger btn-sm">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}></td>
              <td className="align-middle text-end fw-bold" style={{ width: "15%" }}>
                &sum; R${" "}
                {carrinho?.cartItems
                  .reduce((total, item) => total + ((item.game.price * (1 - item.game.discount)) * item.quantity), 0)
                  .toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                  })}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
  
    </>
  );
}