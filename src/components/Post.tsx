// props : {autor: "Luiz Willner", conteudo: "Lorem ipsum, dolor sit amet consectetur..."}
interface PostProps {
  autor: string;
  conteudo: string;
}

export function Post(props: PostProps) {
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
