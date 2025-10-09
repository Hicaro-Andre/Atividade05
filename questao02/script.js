document.getElementById("btnCalcular").addEventListener("click", calcularEmprestimo);

function calcularEmprestimo() {
  const valor = parseFloat(document.getElementById("valor").value);
  const parcelas = parseInt(document.getElementById("parcelas").value);
  const juros = parseFloat(document.getElementById("juros").value) / 100;
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  // Validação dos campos
  if (isNaN(valor) || isNaN(parcelas) || isNaN(juros) || parcelas < 1 || parcelas > 36) {
    resultado.textContent = "❌ Preencha todos os campos corretamente.";
    return;
  }

  // Fórmula da parcela fixa (juros compostos)
  // Parcela = P * [ i * (1 + i)^n ] / [ (1 + i)^n - 1 ]
  const parcela = valor * (juros * Math.pow(1 + juros, parcelas)) / (Math.pow(1 + juros, parcelas) - 1);
  const total = parcela * parcelas;

  // Mostra resumo
  const resumo = document.createElement("div");
  resumo.innerHTML = `
    <p><strong>Valor total a pagar:</strong> R$ ${total.toFixed(2)}</p>
    <p><strong>Valor da parcela mensal:</strong> R$ ${parcela.toFixed(2)}</p>
  `;
  resultado.appendChild(resumo);

  // Cria tabela
  const tabela = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  thead.innerHTML = `
    <tr>
      <th>Parcela</th>
      <th>Valor da Parcela (R$)</th>
      <th>Saldo Restante (R$)</th>
    </tr>
  `;

  let saldoRestante = valor;
  for (let i = 1; i <= parcelas; i++) {
    const jurosMes = saldoRestante * juros;
    const amortizacao = parcela - jurosMes;
    saldoRestante -= amortizacao;

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${i}</td>
      <td>${parcela.toFixed(2)}</td>
      <td>${saldoRestante > 0 ? saldoRestante.toFixed(2) : "0.00"}</td>
    `;
    tbody.appendChild(linha);
  }

  tabela.appendChild(thead);
  tabela.appendChild(tbody);
  resultado.appendChild(tabela);
}
