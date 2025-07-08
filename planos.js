let planoSelecionado = '';

const cards = document.getElementById('cards-container');
const form = document.getElementById('form-container');

// Mostrar formulário com animação
document.querySelectorAll('.btn-aderir').forEach(button => {
  button.addEventListener('click', () => {
    planoSelecionado = button.getAttribute('data-plano');

    // Oculta os cards com animação
    cards.classList.add('fade-out');

    setTimeout(() => {
      cards.style.display = 'none';
      form.style.display = 'flex';

      setTimeout(() => {
        form.classList.remove('fade-out');
        form.classList.add('fade-in');
      }, 10);
    }, 400);
  });
});

// Botão de voltar
document.getElementById('btnVoltar').addEventListener('click', () => {
  form.classList.remove('fade-in');
  form.classList.add('fade-out');

  setTimeout(() => {
    form.style.display = 'none';
    cards.style.display = 'flex';

    setTimeout(() => {
      cards.classList.remove('fade-out');
    }, 10);
  }, 400);
});

// Validação de CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
}

// Envio para WhatsApp
document.getElementById('formPlano').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = this.nome.value.trim();
  const email = this.email.value.trim();
  const cpf = this.cpf.value.trim();

  if (!validarCPF(cpf)) {
    alert('CPF inválido. Por favor, verifique e tente novamente.');
    return;
  }

  const mensagem = `Olá! Gostaria de solicitar o *${planoSelecionado}*:\n\n*Nome:* ${nome}\n*E-mail:* ${email}\n*CPF:* ${cpf}`;
  const numero = '5592992534266'; // Substitua com o número do WhatsApp real

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
});
