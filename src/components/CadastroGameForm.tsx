import dayjs from "dayjs";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { URL_CATEGORY } from "../util/constants";
import { validaData } from "../util/validaData";
import { Category } from "../interfaces/category";
import { Game } from "../interfaces/game";
import { useAPI } from "../hooks/useAPI";
import { useCadastrarGame } from "../hooks/useCadastrarGame";
import { useAlterarGame } from "../hooks/useAlterarGame";
import { useCategorias } from "../hooks/useCategorias";
import { useGameStore } from "../store/useGameStore";
// import useAlterarProduto from "../hooks/useAlterarProduto";


const { recuperar } = useAPI<Category>(URL_CATEGORY);
let categoriasValidas: Category[];

const validaCategoria = async (categoryId: string) => {
  if (!categoriasValidas) {
    categoriasValidas = await recuperar();
  }
  const cat = categoriasValidas.find((category) => category.categoryId === parseInt(categoryId));
  return cat;
};

const regexLink = /^https:\/\//;
const regexLinkYoutube = /^https:\/\/www\.youtube\.com\/embed\//;
const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
//const regexImagem = /^[a-z]+\.(gif|jpg|png|bmp)$/;
const schema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  image: z
    .string()
    .min(1, { message: "A imagem deve ser informada." })
    .regex(regexLink, { message: "A imagem deve ser um link." }),
  trailer: z
    .string()
    .regex(regexLinkYoutube, { message: "O trailer deve ser um link do youtube no formato 'https://www.youtube.com/embed/'." }),
  description: z
    .string()
    .min(1, { message: "A descrição deve ser informada." }),
  developer: z
    .string()
    .min(1, { message: "O desenvolvedor deve ser informado." }),
  publisher: z
    .string()
    .min(1, { message: "A publicadora deve ser informada." }),
  price: z
    .number({invalid_type_error: "O preço deve ser informado."})
    .min(0.0, { message: "O preço deve ser uno mínimo 0." })
    .nonnegative({ message: "O desconto não pode ser negativo." }),
  discount: z
    .number({invalid_type_error: "O desconto deve ser informado."})
    .min(0.0, { message: "O desconto deve ser no mínimo 0%" })
    .max(1.0, { message: "O desconto deve ser no máximo 100%." })
    .nonnegative({ message: "O desconto não pode ser negativo." }),
  releaseDate: z
    .string()
    .min(1, { message: "A data de cadastro deve ser informada." })
    .regex(regexData, { message: "Data inválida." })
    .refine(validaData, { message: "Data inválida." }),
  stockQuantity: z
    .number({invalid_type_error: "O estoque deve ser informado."})
    .min(0, { message: "A quantidade em estoque deve ser maior do que zero." }),
  category: z
    .string()
    .refine(validaCategoria, { message: "Categoria inválida." }),
});

type GameForm = z.infer<typeof schema>;  // zod infere uma interface a partir do schema

export const CadastroGameForm = () => {

  const gameSelecionado = useGameStore(s => s.gameSelecionado);
  const setGameSelecionado = useGameStore(s => s.setGameSelecionado);
  const tratarGameSelecionado = (game: Game) => setGameSelecionado(game);

  const { mutate: cadastrarGame, error: errorCadastrar } = useCadastrarGame();
  const { mutate: alterarGame, error: errorAlterar } = useAlterarGame();
  const { data: categorias, error: errorCategorias } = useCategorias();

  const { 
    setValue,
    setFocus, 
    register,
    formState: { errors, isSubmitSuccessful },
    control,
    handleSubmit,
    reset
  } = useForm<GameForm>({
      resolver: zodResolver(schema),
      mode: "onSubmit"
  });
 
  const onSubmit = (
    {
      name,
      image,
      trailer,
      description,
      developer,
      publisher,
      price,
      discount,
      releaseDate,
      stockQuantity,
      category,
    }: FieldValues  // GameForm
  ) => {
    const game: Game = {
      name: name,
      image: image,
      trailer: trailer,
      description: description,
      developer: developer,
      publisher: publisher,
      price: price,
      discount: discount,
      releaseDate: dayjs(releaseDate, "DD/MM/YYYY").toDate(),  // TODO: Validar se funfa
      stockQuantity: stockQuantity,
      category: { categoryId: parseInt(category) } as Category,  // TODO: Valdiar se funfa
    };
    reset();
    if (gameSelecionado?.gameId) {
      game.gameId = gameSelecionado.gameId;
      console.log("Alterando game id: ", game.gameId);
      alterarGame(game);
    } else {
      console.log("Cadastrando game id: ", game.gameId);
      cadastrarGame(game);
    }
  };

  // Esse useEffect é executado sempre que o gameSelecionado muda.
  useEffect(() => {
    console.log("gameSelecionado executado")
    setFocus("name");
    if (gameSelecionado?.gameId) {
      reset();
      setValue("name", gameSelecionado.name);
      setValue("image", gameSelecionado.image);
      setValue("trailer", gameSelecionado.trailer);
      setValue("description", gameSelecionado.description);
      setValue("developer", gameSelecionado.developer);
      setValue("publisher", gameSelecionado.publisher);
      setValue("price", gameSelecionado.price);
      setValue("discount", gameSelecionado.discount);
      setValue("releaseDate", dayjs(gameSelecionado.releaseDate).format("DD/MM/YYYY"));
      setValue("stockQuantity", gameSelecionado.stockQuantity);
      setValue("category", String(gameSelecionado.category.categoryId));
    }
  }, [gameSelecionado]);

  // Esse useEffect é executado sempre que o form é montado e
  // sempre que o formulário é submetido. Para evitar o reset()
  // quando o form é montado podemos acrescentar o comando
  // if (isSubmitSuccessful) abaixo.
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      tratarGameSelecionado({} as Game);
    }
  }, [isSubmitSuccessful]);

  // Esse useEffect é executado sempre que a página é montada.
  // Ele retorna uma cleanup function que é executada sempre
  // que a página é desmontada.
  // useEffect(() => {
  //   console.log("[] executado");
  //   return () => {
  //     // setFocus("nome");
  //     setProdutoSelecionado({} as Produto);
  //   }
  // }, []);

  if (errorCategorias) throw errorCategorias;
  if (errorCadastrar) throw errorCadastrar;
  if (errorAlterar) throw errorAlterar;

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="row mb-2">
        <div className="col-xl-2 fw-bold text-start align-self-center">Nome</div>
        <div className="col-xl-10">
          <input
            {...register("name")}
            type="text"
            id="name"
            className={
              errors.name
                ? "form-control form-control-sm is-invalid"
                : "form-control form-control-sm"
            }
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-xl-2 fw-bold text-start align-self-center">Categoria</div>
        <div className="col-xl-10">
          <select
            {...register("category")}
            id="category"
            className={
              errors.category
                ? "form-control form-control-sm is-invalid"
                : "form-control form-control-sm"
            }
          >
            <option value="0">Selecione uma Categoria</option>
            {categorias?.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.category?.message}</div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-xl-2 fw-bold text-start align-self-center">Desenvolvedora</div>
        <div className="col-xl-10">
          <input
            {...register("developer")}
            type="text"
            id="developer"
            className={
              errors.developer
                ? "form-control form-control-sm is-invalid"
                : "form-control form-control-sm"
            }
          />
          <div className="invalid-feedback">{errors.developer?.message}</div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-xl-2 fw-bold text-start align-self-center">Publicadora</div>
        <div className="col-xl-10">
          <input
            {...register("publisher")}
            type="text"
            id="publisher"
            className={
              errors.publisher
                ? "form-control form-control-sm is-invalid"
                : "form-control form-control-sm"
            }
          />
          <div className="invalid-feedback">{errors.publisher?.message}</div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-xl-2 fw-bold text-start align-self-center">Descrição</div>
        <div className="col-xl-10">
          <input
            {...register("description")}
            type="text"
            id="description"
            className={
              errors.description
                ? "form-control form-control-sm is-invalid"
                : "form-control form-control-sm"
            }
          />
          <div className="invalid-feedback">{errors.description?.message}</div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-xl-2 fw-bold text-start align-self-center">Data de lançamento</div>
        <div className="col-xl-10">
          <input
            {...register("releaseDate")}
            type="text"
            id="releaseDate"
            className={
              errors.releaseDate
                ? "form-control form-control-sm is-invalid"
                : "form-control form-control-sm"
            }
          />
          <div className="invalid-feedback">{errors.releaseDate?.message}</div>
        </div>
      </div>

      <div className="row mb-2 d-flex justify-content-end">
        <div className="col-xl-2 fw-bold text-start align-self-center">Preço</div>
        <div className="col-xl-10">
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            step="0.01"
            min="0"
            id="price"
            className={
              errors.price
                ? "form-control form-control-sm is-invalid"
                : "form-control form-control-sm"
            }
          />
          <div className="invalid-feedback">{errors.price?.message}</div>
        </div>
      </div>

      <div className="row mb-2 d-flex justify-content-end">
        <div className="col-xl-2 fw-bold text-start align-self-center">Desconto</div>
        <div className="col-xl-10">
          <input
            {...register("discount", { valueAsNumber: true })}
            type="number"
            step="0.01"
            min="0"
            max="1"
            id="discount"
            className={
              errors.discount
                ? "form-control form-control-sm is-invalid"
                : "form-control form-control-sm"
            }
          />
          <div className="invalid-feedback">{errors.discount?.message}</div>
        </div>
      </div>

      <div className="row mb-2 d-flex justify-content-end">
        <div className="col-xl-2 fw-bold text-start align-self-center">Estoque</div>
        <div className="col-xl-10">
          <input
            {...register("stockQuantity", { valueAsNumber: true })}
            type="number"
            step="1"
            min="0"
            id="stockQuantity"
            className={
              errors.stockQuantity
                ? "form-control form-control-sm is-invalid"
                : "form-control form-control-sm"
            }
          />
          <div className="invalid-feedback">{errors.stockQuantity?.message}</div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-xl-2 fw-bold text-start align-self-center">Link da Imagem</div>
        <div className="col-xl-10">
          <input
            {...register("image")}
            type="text"
            id="image"
            className={
              errors.image
                ? "form-control form-control-sm is-invalid"
                : "form-control form-control-sm"
            }
          />
          <div className="invalid-feedback">{errors.image?.message}</div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-xl-2 fw-bold text-start align-self-center">Link do Trailer</div>
        <div className="col-xl-10">
          <input
            {...register("trailer")}
            type="text"
            id="trailer"
            className={
              errors.trailer
                ? "form-control form-control-sm is-invalid"
                : "form-control form-control-sm"
            }
          />
          <div className="invalid-feedback">{errors.trailer?.message}</div>
        </div>
      </div>

      {/* Resto do form aqui */}

      <div className="row mb-5">
        <div className="col-xl-12 text-end">
          <button
            onClick={() => {
              reset();
              console.log("click");
              tratarGameSelecionado({} as Game);
            }}
            id="botao"
            type="button"
            className="btn btn-light btn-sm me-2"
          >
            Cancelar
          </button>
          <button
            id="botao"
            type="submit"
            className="btn btn-primary btn-sm "
          >
            {gameSelecionado.gameId ? " Alterar" : " Cadastrar"}
          </button>
        </div>
      </div>
    </form>
    <DevTool control={control} />
    </>
  );
};