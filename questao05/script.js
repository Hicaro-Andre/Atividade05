
      const inputTarefa = document.getElementById("inputTarefa");
      const btnAdicionar = document.getElementById("btnAdicionar");
      const listaTarefas = document.getElementById("listaTarefas");
      const mensagem = document.getElementById("mensagem");
      
      // Elementos do modal de edição
      const modalEditar = document.getElementById("modalEditar");
      const inputEditarTarefa = document.getElementById("inputEditarTarefa");
      const btnSalvarEdicao = document.getElementById("btnSalvarEdicao");
      const btnCancelarEdicao = document.getElementById("btnCancelarEdicao");
      const fecharModal = document.getElementById("fecharModal");
      
      let tarefaEditando = null;

      // Função para mostrar mensagem
      function mostrarMensagem(texto, tipo = 'erro') {
        mensagem.textContent = texto;
        mensagem.style.display = 'block';
        mensagem.style.color = tipo === 'erro' ? '#dc2626' : '#10b981';
        mensagem.style.borderLeftColor = tipo === 'erro' ? '#dc2626' : '#10b981';
        mensagem.style.background = tipo === 'erro' ? '#fef2f2' : '#f0fdf4';
        
        setTimeout(() => {
          mensagem.style.display = 'none';
        }, 3000);
      }

      // Função para adicionar uma tarefa
      function adicionarTarefa() {
        const texto = inputTarefa.value.trim();

        if (texto === "") {
          mostrarMensagem("⚠️ Digite uma tarefa antes de adicionar!");
          return;
        }

        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = texto;
        span.classList.add("tarefa-texto");

        const divAcoes = document.createElement("div");
        divAcoes.classList.add("acoes-tarefa");

        const btnEditar = document.createElement("button");
        btnEditar.innerHTML = '<i class="fas fa-edit"></i>';
        btnEditar.classList.add("btn-acao", "btn-editar");
        btnEditar.title = "Editar tarefa";

        const btnRemover = document.createElement("button");
        btnRemover.innerHTML = '<i class="fas fa-trash"></i>';
        btnRemover.classList.add("btn-acao", "btn-remover");
        btnRemover.title = "Remover tarefa";

        // Marcar como concluída
        span.addEventListener("click", () => {
          li.classList.toggle("concluida");
        });

        // Editar tarefa
        btnEditar.addEventListener("click", () => {
          editarTarefa(li, span);
        });

        // Remover tarefa
        btnRemover.addEventListener("click", () => {
          listaTarefas.removeChild(li);
          mostrarMensagem("Tarefa removida com sucesso!", "sucesso");
        });

        divAcoes.appendChild(btnEditar);
        divAcoes.appendChild(btnRemover);
        
        li.appendChild(span);
        li.appendChild(divAcoes);
        listaTarefas.appendChild(li);

        inputTarefa.value = "";
        inputTarefa.focus();
        mostrarMensagem("Tarefa adicionada com sucesso!", "sucesso");
      }

      // Função para editar uma tarefa
      function editarTarefa(li, span) {
        tarefaEditando = { li, span };
        inputEditarTarefa.value = span.textContent;
        modalEditar.style.display = "flex";
        inputEditarTarefa.focus();
      }

      // Função para salvar a edição
      function salvarEdicao() {
        if (tarefaEditando) {
          const novoTexto = inputEditarTarefa.value.trim();
          
          if (novoTexto === "") {
            mostrarMensagem("⚠️ A tarefa não pode estar vazia!");
            return;
          }
          
          tarefaEditando.span.textContent = novoTexto;
          modalEditar.style.display = "none";
          mostrarMensagem("Tarefa atualizada com sucesso!", "sucesso");
          tarefaEditando = null;
        }
      }

      // Event Listeners
      btnAdicionar.addEventListener("click", adicionarTarefa);

      // Permitir adicionar com Enter
      inputTarefa.addEventListener("keypress", (e) => {
        if (e.key === "Enter") adicionarTarefa();
      });

      // Fechar modal com o botão X
      fecharModal.addEventListener("click", () => {
        modalEditar.style.display = "none";
        tarefaEditando = null;
      });

     
      btnCancelarEdicao.addEventListener("click", () => {
        modalEditar.style.display = "none";
        tarefaEditando = null;
      });

      
      btnSalvarEdicao.addEventListener("click", salvarEdicao);

      // Salvar edição com Enter no input de edição
      inputEditarTarefa.addEventListener("keypress", (e) => {
        if (e.key === "Enter") salvarEdicao();
      });

      // Fechar modal clicando fora dele
      window.addEventListener("click", (e) => {
        if (e.target === modalEditar) {
          modalEditar.style.display = "none";
          tarefaEditando = null;
        }
      });
    
