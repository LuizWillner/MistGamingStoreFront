// props : {autor: "Luiz Willner", conteudo: "Lorem ipsum, dolor sit amet consectetur..."}

export function Post(props) {
  console.log(props);
  return (
    <div>
      <strong>{props.autor}</strong>
      <p>{props.conteudo}</p>
    </div>
  );
}

// forma padrão de exportar um componente.
// Desvantagem: a mudança de nome do componente no arquivo Post.tsx não é refletida automaticamente no arquivo App.tsx
// export default Post;
