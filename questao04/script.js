
const perguntas = [
  {
    enunciado: "1️⃣ Qual linguagem é usada para estruturar páginas web?",
    opcoes: ["CSS", "HTML", "JavaScript", "Python"],
    correta: 1 
  },
  {
    enunciado: "2️⃣ Qual símbolo é usado para comentários em JavaScript?",
    opcoes: ["//", "/* */", "#", "<!-- -->"],
    correta: 0 // //
  },
  {
    enunciado: "3️⃣ Qual comando exibe uma mensagem no console?",
    opcoes: ["alert()", "prompt()", "console.log()", "print()"],
    correta: 2 
  }
];


const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");
const btnCorrigir = document.getElementById("btnCorrigir");

// Cria o quiz dinamicamente
function carregarQuiz() {
  perguntas.forEach((p, index) => {
    const div = document.createElement("div");
    div.classList.add("question");

    let opcoesHTML = "";
    p.opcoes.forEach((opcao, i) => {
      opcoesHTML += `
        <label>
          <input type="radio" name="pergunta${index}" value="${i}">
          ${opcao}
        </label><br>
      `;
    });

    div.innerHTML = `
      <p>${p.enunciado}</p>
      ${opcoesHTML}
    `;

    quiz.appendChild(div);
  });
}

// Corrigir respostas
function corrigirQuiz() {
  let pontuacao = 0;
  resultado.innerHTML = "";

  const respostasCorretas = [];

  perguntas.forEach((p, index) => {
    const selecionada = document.querySelector(`input[name="pergunta${index}"]:checked`);
    const divPergunta = quiz.children[index];

    if (selecionada) {
      const resposta = parseInt(selecionada.value);
      if (resposta === p.correta) {
        pontuacao++;
        divPergunta.style.border = "2px solid green";
        respostasCorretas.push(`✅ ${p.enunciado} - Correta!`);
      } else {
        divPergunta.style.border = "2px solid red";
        respostasCorretas.push(`❌ ${p.enunciado} - Resposta correta: ${p.opcoes[p.correta]}`);
      }
    } else {
      divPergunta.style.border = "2px solid orange";
      respostasCorretas.push(`⚠️ ${p.enunciado} - Nenhuma resposta selecionada`);
    }
  });

 
  let mensagem = "";
  if (pontuacao === perguntas.length) {
    mensagem = "🎉 Excelente! Você acertou todas!";
  } else if (pontuacao >= 2) {
    mensagem = "😎 Muito bem! Quase perfeito.";
  } else {
    mensagem = "😕 Estude um pouco mais e tente novamente.";
  }

  resultado.innerHTML = `
    <p><strong>Pontuação final:</strong> ${pontuacao} / ${perguntas.length}</p>
    <p>${mensagem}</p>
    <hr>
    ${respostasCorretas.map(r => `<p>${r}</p>`).join("")}
  `;
}


btnCorrigir.addEventListener("click", corrigirQuiz);


carregarQuiz();
