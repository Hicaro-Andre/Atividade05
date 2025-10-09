document.getElementById("btnConverter").addEventListener("click", converterData);
const dataInput = document.getElementById("dataInput");


dataInput.addEventListener("input", () => {
  let valor = dataInput.value.replace(/\D/g, "");
  if (valor.length > 2 && valor.length <= 4) {
    valor = valor.replace(/(\d{2})(\d+)/, "$1/$2");
  } else if (valor.length > 4) {
    valor = valor.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
  }
  dataInput.value = valor;
});

function converterData() {
  const input = dataInput.value.trim();
  const resultado = document.getElementById("resultado");
  resultado.textContent = "";

  const partes = input.split("/");
  if (partes.length !== 3) {
    resultado.textContent = "❌ Formato inválido! Use dd/mm/aaaa.";
    return;
  }

  let [dia, mes, ano] = partes.map(Number);
  const meses = [
    "", "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  function bissexto(ano) {
    return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
  }

  const diasPorMes = [0, 31, bissexto(ano) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
    resultado.textContent = "❌ Data inválida! Use apenas números.";
    return;
  }
  if (mes < 1 || mes > 12) {
    resultado.textContent = "❌ Mês inválido!";
    return;
  }
  if (dia < 1 || dia > diasPorMes[mes]) {
    resultado.textContent = `❌ Dia inválido! O mês ${meses[mes]} tem ${diasPorMes[mes]} dias.`;
    return;
  }

  const p = document.createElement("p");
  p.textContent = `${dia} de ${meses[mes]} de ${ano}`;
  resultado.appendChild(p);
}
