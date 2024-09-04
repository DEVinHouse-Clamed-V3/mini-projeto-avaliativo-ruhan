// Lógica para pegar os dados do formulário e salvar no localStorage
document.querySelector('.btn-submit').addEventListener('click', function () {
    event.preventDefault()
    const nome = document.getElementById('med-name').value;
    const laboratorio = document.getElementById('med-lab').value;
    const preco = document.getElementById('med-price').value;
    const imagem = document.getElementById('med-img').value;

    if (nome && laboratorio && preco && imagem) {
        const medicamento = { nome, laboratorio, preco, imagem };
        let medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
        medicamentos.push(medicamento);
        localStorage.setItem('medicamentos', JSON.stringify(medicamentos));

        // Atualiza a tela
        renderCards();
        //Função para atualizar a contagem
        updateCount();

        // Limpa o formulário
        document.getElementById('med-name').value = '';
        document.getElementById('med-lab').value = '';
        document.getElementById('med-price').value = '';
        document.getElementById('med-img').value = '';

        // Fecha o modal quando enviar os dados
        document.getElementById('modal').style.visibility = 'hidden';
        document.getElementById('modal').style.opacity = '0';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});


// Função para atualizar a contagem de medicamentos no array
function updateCount() {
    const medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
    document.querySelector('.count-box').innerText = medicamentos.length;
}

// Função para renderizar os cards na tela
function renderCards() {
    const medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
    const container = document.querySelector('.medicamentos');
    container.innerHTML = ''; // Necessario para evitar duplicação

    medicamentos.forEach((medicamento, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${medicamento.imagem}" alt="Medicamento">
            <h3>${medicamento.nome}</h3>
            <div class="details">
                <span>${medicamento.laboratorio}</span>
                <span>R$ ${medicamento.preco}</span>
            </div>
            <button class="btn-delete" data-index="${index}">Deletar</button>
        `;
        container.appendChild(card);
    });

    // Evento para deletar o card
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            deleteMedicamento(index);
        });
    });
}

// Função para deletar um medicamento
function deleteMedicamento(index) {
    let medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
    medicamentos.splice(index, 1); // Remove o item pelo index
    localStorage.setItem('medicamentos', JSON.stringify(medicamentos));

    // Função de carregar os cards
    renderCards();
    //Função para atualizar a contagem
    updateCount();
}



// Renderiza os cards e atualiza a contagem ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    renderCards();
    updateCount();
});