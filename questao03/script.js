
    function calcular() {
      const nome = document.getElementById('nome').value.trim();
      const bebida = document.querySelector('input[name="bebida"]:checked');
      const doces = document.querySelectorAll('input[type="checkbox"]:checked');
      const resultado = document.getElementById('resultado');

      if (!nome) {
        alert('Por favor, digite o nome do cliente.');
        return;
      }

      if (!bebida) {
        alert('Selecione uma bebida.');
        return;
      }

      let total = 0;
      const precos = {
        Suco: 4.00,
        Refrigerante: 2.50,
        Água: 1.50,
        Bolo: 3.50,
        Pastel: 3.00,
        Torta: 4.00
      };

      total += precos[bebida.value];

      const listaDoces = [];
      doces.forEach(item => {
        listaDoces.push(item.value);
        total += precos[item.value];
      });

      let msg = `<strong>Cliente:</strong> ${nome}<br>`;
      msg += `<strong>Bebida:</strong> ${bebida.value}<br>`;
      msg += `<strong>Doces e Salgados:</strong> ${listaDoces.length > 0 ? listaDoces.join(', ') : 'Nenhum'}<br>`;
      msg += `<strong>Total a pagar:</strong> R$ ${total.toFixed(2)}`;

      resultado.innerHTML = msg;
    }
