(Pai) App - contém o estado (State)
para o componente _filho (Tasks)_ atualizar o **State** que está no _pai (App)_
cria uma _funcao()_ no componente pai (App) que **altere o State**
e passa essa funcao como **Props** para o _filho (tasks)_

**React Router**
npm install react-router-dom@6.26.1 - instalando o react router

# main.jsx >

import { createBrowserRouter, RouterProvider } from "react-router-dom";

criando src/pages/**TaskPage.jsx** -
será a **página** de detalhes da task
continua sendo um **componente** (funcao que retorna um jsx)
const router = createBrowserRouter([
{
--------path: "/",
--------element: <App />,
----},
{
--------path: "/task",
--------element: <TaskPage/> - componente da TaskPage
----},
]);

createRoot(document.getElementById("root")).render(
<StrictMode>
<RouterProvider router={router}> trocamos <App /> pelo RouterProvider
</StrictMode>
);

na pagina localhost/task agora exibe os detalhes tarefa
mas os dados da tarefa ainda precisam ser obtidos
para tal, usaremos os **QueryParams**
**ex: localhost:5173/task?title=estudarReact&description=123**
entao, usa um Hook no componente TaskPages **(useSearchParams)**

**Task.jsx**
quando o botao VER MAIS for clicado, envia os parametros da task clicada
para a PAGE **taskPage.jsx**
function onSeeDatailsClick(task) {
const query = new URLSearchParams(); //faz tratamento da URL (ex: tira espaços)
query.set("title", task.title);
query.set("description", task.description);
navigate(`/task?${query.toString()}`);
}
**TaskPage**
_import { useSearchParams } from "react-router-dom";_
_const [searchParams] = useSearchParams();_ - useSearchParams() retorna lista[], usaremos somente o [searchParams]
const title = searchParams.get("title");
const description = searchParams.get("description");
**aqui pegamos os valores da URL (parametros title e description)**

sempre que usar **useAlgumaCoisa**, é um **Hook**. cada Hook tem uma funcionalidade específica
ex: const navigate = useNavigate() -> Hook de navegação entre páginas
----const [searchParams] = useSearchParams(); -> Hook de buscar parâmetros na URL
sempre importa o Hook -> import { useNavigate, useSearchParams } from "react-router-dom";

sempre chame uma função assim:
<tag onClick={() => navigate(-1)}> Olá mundo! </tag>
nunca diretamente, como: onClick={funcao()}, não funciona.
ou cria uma função antes, ex:
function onBackClick() {
---navigate(-1)
}
<tag onClick={onBackClick}><tag/>
