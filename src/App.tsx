// TSX = TypeScript + XML (HTML)
import { Post } from "./components/Post";

function App() {
  return (
    <div>
      <Post
        autor="Luiz Willner"
        conteudo="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro odit illum, suscipit, rerum alias amet accusamus id ratione dolore delectus ad animi harum dolorum at tempore accusantium dolores consectetur asperiores?"
      />
      <Post
        autor="João Silva"
        conteudo="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro odit illum, suscipit, rerum alias amet accusamus id ratione dolore delectus ad animi harum dolorum at tempore accusantium dolores consectetur asperiores?"
      />
    </div>
  );
}

export default App;
