function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

// Função para fechar o pop-up
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function openEditPopup(tarefa) {
    document.getElementById('id_tarefa2').value = tarefa.id_tarefa;
    document.getElementById('titulo2').value = tarefa.titulo;
    document.getElementById('descricao2').value = tarefa.descricao;
    document.getElementById('prazo2').value = tarefa.prazo ? tarefa.prazo.split('T')[0] : '';

    document.getElementById('popup2').style.display = 'block';
  }

  // Fechar o pop-up
  function closePopup2() {
    document.getElementById('popup2').style.display = 'none';
  }