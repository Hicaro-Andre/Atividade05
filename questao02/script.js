
document.getElementById("btnCalcular").addEventListener("click", calcularEmprestimo);

function calcularEmprestimo() {
  const valor = parseFloat(document.getElementById("valor").value);
  const parcelas = parseInt(document.getElementById("parcelas").value);
  const juros = parseFloat(document.getElementById("juros").value) / 100;
  const resultado = document.getElementById("resultado");
  
  
  resultado.innerHTML = "";
  
 
  const btn = document.getElementById("btnCalcular");
  btn.classList.add('loading');
  
  // Simula processamento
  setTimeout(() => {
    btn.classList.remove('loading');
    
    
    if (isNaN(valor) || isNaN(parcelas) || isNaN(juros) || parcelas < 1 || parcelas > 36) {
      resultado.innerHTML = '<div class="error">❌ Preencha todos os campos corretamente.</div>';
      return;
    }

    
    const parcela = valor * (juros * Math.pow(1 + juros, parcelas)) / (Math.pow(1 + juros, parcelas) - 1);
    const total = parcela * parcelas;
    const jurosTotal = total - valor;

  
    const resumo = document.createElement("div");
    resumo.className = "resumo";
    resumo.innerHTML = `
      <p><strong>Valor solicitado:</strong> R$ ${valor.toFixed(2)}</p>
      <p><strong>Total de juros:</strong> R$ ${jurosTotal.toFixed(2)}</p>
      <p><strong>Valor total a pagar:</strong> R$ ${total.toFixed(2)}</p>
      <p><strong>Valor da parcela mensal:</strong> R$ ${parcela.toFixed(2)}</p>
    `;
    resultado.appendChild(resumo);

    
    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    thead.innerHTML = `
      <tr>
        <th>Parcela</th>
        <th>Valor da Parcela</th>
        <th>Saldo Restante</th>
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
        <td>R$ ${parcela.toFixed(2)}</td>
        <td>R$ ${saldoRestante > 0 ? saldoRestante.toFixed(2) : "0.00"}</td>
      `;
      tbody.appendChild(linha);
    }

    tabela.appendChild(thead);
    tabela.appendChild(tbody);
    resultado.appendChild(tabela);
    
  }, 800);
}