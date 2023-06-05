const form = document.querySelector('#form');
const nome = document.querySelector('#nome');
const cpf = document.querySelector('#cpf');
const email = document.querySelector('#email');
const atividades = document.getElementsByName("esportes");
const contato = document.getElementsByName('assunto');
const comentario = document.querySelector('#coment');
let imprimirResultados = false;

const modal = document.querySelector('#mensagem');
const closeBtn = modal.querySelector('.close');
const resultadoFormulario = document.querySelector('#resultado-formulario');

const showModal = () => {
    modal.style.display = 'block';
    modal.style.visibility = 'visible';
    modal.classList.add('show');
};

const closeModal = () => {
    modal.style.display = 'none';
    modal.classList.remove('show');
};

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

const verificarNome = () => {
    let valid = false;
    const nomeUsuario = nome.value.trim();

    if (nomeUsuario == "") {
        mensagemErro(nome, 'O Nome não pode estar em branco!');
    } else if (nomeUsuario.trim().indexOf(' ') == -1) {
        mensagemErro(nome, 'O Nome deve conter sobrenome!');
    } else {
        mensagemAcerto(nome);
        valid = true;
    }
    return valid;
};

const verificarCPF = () => {
    const cpfValue = cpf.value.trim().replace(/\D/g, '');
    if (cpfValue === "") {
        mensagemErro(cpf, 'O CPF não pode estar em branco!');
        return false;
    } else if (cpfValue.length !== 11) {
        mensagemErro(cpf, 'O CPF deve conter 11 caracteres!');
        return false;
    } else {
        mensagemAcerto(cpf);
        return true;
    }
};

const verificarEmail = () => {
    let valid = false;
    const emailValue = email.value.trim();

    const atIndex = emailValue.indexOf('@');
    const dotIndex = emailValue.indexOf('.', atIndex);
    if (emailValue === "") {
        mensagemErro(email, 'O Email não pode estar em branco!');
    } else if (atIndex < 1) {
        mensagemErro(email, 'O Email deve conter o "@" a partir da segunda posição!');
    } else if (dotIndex === -1 || dotIndex < (atIndex + 2) || dotIndex === emailValue.length - 1) {
        mensagemErro(email, 'O Email deve conter um "." pelo menos duas posições após o "@" e não pode ser o último dígito!');
    } else {
        mensagemAcerto(email);
        valid = true;
    }
    return valid;
};

const verificarAssunto = () => {
    let valid = false;
    console.log(contato);
    for (let i = 0; i < contato.length; i++) {
        contato[i].parentElement.classList.remove('error');
        if (contato[i].checked) {
            mensagemAcerto(contato[i]);
            valid = true;
        }
    }

    if (!valid) {
        for (let i = 0; i < contato.length; i++) {
            mensagemErro(contato[i], 'Pelo menos um Assunto deve ser selecionado!');
        }
    }

    return valid;
};

const verificarAtividade = () => {
    let valid = false;

    for (let i = 0; i < atividades.length; i++) {
        atividades[i].parentElement.classList.remove('error');
        if (atividades[i].checked) {
            mensagemAcerto(atividades[i]);
            valid = true;
        }
    }

    if (!valid) {
        for (let i = 0; i < atividades.length; i++) {
            mensagemErro(atividades[i], 'Pelo menos um Serviço deve ser selecionado!');
        }
    }

    return valid;
};


const verificarComentario = () => {
    const comentarioValue = comentario.value.trim();
    if (comentarioValue === "") {
        mensagemErro(comentario, 'O Comentário não pode estar em branco!');
        return false;
    } else {
        mensagemAcerto(comentario);
        return true;
    }
};

const mensagemErro = (input, message) => {
    const formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const mensagemAcerto = (input) => {
    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = '';
};

const sanitizeHTML = (string) => {
    const element = document.createElement('div');
    element.innerText = string;
    return element.innerHTML;
};

const btnVerificar = document.querySelector('#btnVerificar');
btnVerificar.addEventListener('click', function (e) {
    e.preventDefault();
    let isNameValid = verificarNome();
    let isCPFValid = verificarCPF();
    let isEmailValid = verificarEmail();
    let isAtividadeValid = verificarAtividade();
    let isAssuntoValid = verificarAssunto();
    let isComentarioValid = verificarComentario();

    imprimirResultados = isNameValid && isCPFValid && isEmailValid && isAtividadeValid && isAssuntoValid && isComentarioValid;

    if (imprimirResultados) {
        const atividadesHTML = [];
        for (let i = 0; i < atividades.length; i++) {
            if (atividades[i].checked) {
                atividadesHTML.push(atividades[i].nextElementSibling.innerHTML);
            }
        }

        const divResultado = document.createElement('div');
        divResultado.innerHTML = `
      <h1>DESEJA ENVIAR ESSES DADOS?</h1>
      <p>Nome: ${sanitizeHTML(nome.value.trim())}</p>
      <p>Email: ${sanitizeHTML(document.querySelector('#email').value.trim())}</p>
      <p>CPF: ${sanitizeHTML(cpf.value.trim())}</p>
      <p>Assunto: ${sanitizeHTML(document.querySelector('input[name="assunto"]:checked').value.trim())}</p>
      <p>Serviço: ${sanitizeHTML(atividadesHTML.join(', '))}</p>
      <p>Comentário: ${sanitizeHTML(comentario.value.trim())}</p>
    `;
        resultadoFormulario.innerHTML = '';
        resultadoFormulario.appendChild(divResultado);
        showModal();

        const enviarBtn = document.createElement('button');
        enviarBtn.type = 'submit';
        enviarBtn.textContent = 'Enviar';
        divResultado.appendChild(enviarBtn);

        enviarBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const form = document.getElementById('form');
            form.submit();
        });
    }
});
