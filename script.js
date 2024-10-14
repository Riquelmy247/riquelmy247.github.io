function sendEmail(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;
    const assunto = document.getElementById('assunto').value;

    const telefonePattern = /^\d{2} \d{5}-\d{4}$/;

    if (nome && email && telefonePattern.test(telefone) && mensagem && assunto) {
        const subject = encodeURIComponent(`${assunto}`);
        const body = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nMensagem: ${mensagem}`);
        const mailtoLink = `mailto:riquecebolinha@hotmail.com?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    if (value.length <= 2) {
        input.value = value;
    } else if (value.length <= 7) {
        input.value = value.replace(/(\d{2})(\d+)/, '$1 $2');
    } else if (value.length <= 10) {
        input.value = value.replace(/(\d{2})(\d{5})(\d+)/, '$1 $2-$3');
    } else {
        input.value = value.replace(/(\d{2})(\d{5})(\d{4})/, '$1 $2-$3');
    }
}