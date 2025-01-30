import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faTrashAlt, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft";
import { Spinner } from "react-bootstrap";
import { CartItem } from "../interfaces/cartItem";
import { Cart } from "../interfaces/cart";
import { useRecuperarCarrinho } from "../hooks/useRecuperarCarrinho";
import { useComprarCarrinho } from "../hooks/useComprarCarrinho";
import { useRemoverItemCarrinho } from "../hooks/useRemoverItemCarrinho";
import { useAlterarItemCarrinho } from "../hooks/useAlterarItemCarrinho";
import "../styles/SessaoDeCards.css";


export const CarrinhoPage = () => {
  const navigate = useNavigate();
  const [removendoItemDoCarrinhoId, setremovendoItemDoCarrinhoId] = useState<number | null>(null);

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

  const {
    data: carrinhoComprado,
    mutate: comprarCarrinho,
    isLoading: comprandoCarrinho,
    error: errorComprarCarrinho
  } = useComprarCarrinho({cartId: 1, userId: 1});


  const tratarRemocaoItem = (item: CartItem) => {
    setremovendoItemDoCarrinhoId(item.cartItemId!);
    removerItemDoCarrinho(item.cartItemId!);
  };

  const tratarAlteracaoItemDoCarrinho = (item: CartItem) => {
    alterarItem(item, {
      onSettled: () => {
        setremovendoItemDoCarrinhoId(null);
      },
    });
  }

  const tratarCompraCarrinho = (carrinho: Cart) => {
    comprarCarrinho({cartId: carrinho.cartId!, userId: carrinho.user.userId!});
    window.location.reload();
    //navigate("/");
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
                  <button 
                    onClick={() => tratarRemocaoItem(item!)}
                    className="btn btn-danger btn-sm"
                    disabled={removendoItemDoCarrinho}
                  >
                    {
                      removendoItemDoCarrinhoId === item.cartItemId ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        <FontAwesomeIcon icon={faTrashAlt} />
                      ) 
                    }

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
      <div className="p-3">
        {
          (carrinho?.cartItems.length !== 0) && (
            <button onClick={() => tratarCompraCarrinho(carrinho!)} className="btn btn-success mb-3">
              <FontAwesomeIcon icon={faCreditCard} /> Pagar
            </button>
          )
        }
      </div>
  
    </>
  );
}