document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('lanchoneteForm');
  const resultado = document.getElementById('resultado');
  const nomeInput = document.getElementById('nome');

 
  const precos = {
    "Suco": 4.00,
    "Refrigerante": 2.50,
    "Água": 1.50,
    "Agua": 1.50, 
    "Bolo": 3.50,
    "Pastel": 3.00,
    "Torta": 4.00
  };

  // função exposta globalmente para manter compatibilidade com onclick inline
  window.calcular = function calcular() {
    const nome = nomeInput.value.trim();
    const bebidaEl = form.querySelector('input[name="bebida"]:checked');
    const docesEls = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'));

    if (!nome) {
      alert('Por favor, digite o nome do cliente.');
      nomeInput.focus();
      return;
    }

    if (!bebidaEl) {
      alert('Selecione uma bebida.');
      return;
    }

    let total = 0;
    const bebidaVal = bebidaEl.value;
   
    total += (precos.hasOwnProperty(bebidaVal) ? precos[bebidaVal] : 0);

   
    const listaDoces = [];
    docesEls.forEach(item => {
      const val = item.value;
      listaDoces.push(val);
      total += (precos.hasOwnProperty(val) ? precos[val] : 0);
    });

  
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const totalFmt = formatter.format(total);

   
    let msg = `<strong>Cliente:</strong> ${escapeHtml(nome)}<br>`;
    msg += `<strong>Bebida:</strong> ${escapeHtml(bebidaVal)}<br>`;
    msg += `<strong>Doces e Salgados:</strong> ${listaDoces.length > 0 ? escapeHtml(listaDoces.join(', ')) : 'Nenhum'}<br>`;
    msg += `<strong>Total a pagar:</strong> ${totalFmt}`;

    resultado.innerHTML = msg;
    resultado.style.display = 'block';
    resultado.classList.remove('fade-out');
    resultado.classList.add('fade-in');
  };

  // ao resetar o form, ocultar/limpar resultado
  form.addEventListener('reset', function () {
    
    setTimeout(() => {
      resultado.style.display = 'none';
      resultado.innerHTML = '';
      resultado.classList.remove('fade-in', 'fade-out');
    }, 60);
  });

 
  nomeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      window.calcular();
    }
  });


  function escapeHtml(unsafe) {
    return unsafe.replace(/[&<>"']/g, function (m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }
});
