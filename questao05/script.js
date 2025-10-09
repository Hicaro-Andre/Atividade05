const inputTarefa = document.getElementById("inputTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Função para adicionar uma tarefa
function adicionarTarefa() {
  const texto = inputTarefa.value.trim();

  // Validação: não permitir tarefa vazia
  if (texto === "") {
    mensagem.textContent = "⚠️ Digite uma tarefa antes de adicionar!";
    setTimeout(() => (mensagem.textContent = ""), 2000);
    return;
  }

  // Cria os elementos da tarefa
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = texto;

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.classList.add("btn-remover");

  // Evento: marcar como concluída
  span.addEventListener("click", () => {
    li.classList.toggle("concluida");
  });

  // Evento: remover tarefa
  btnRemover.addEventListener("click", () => {
    listaTarefas.removeChild(li);
  });

  // Monta a linha
  li.appendChild(span);
  li.appendChild(btnRemover);
  listaTarefas.appendChild(li);

  // Limpa campo de texto
  inputTarefa.value = "";
  inputTarefa.focus();
}

// Evento do botão
btnAdicionar.addEventListener("click", adicionarTarefa);

// Permitir adicionar com Enter
inputTarefa.addEventListener("keypress", (e) => {
  if (e.key === "Enter") adicionarTarefa();
});
