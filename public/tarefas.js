async function carregarTarefas() {
    try {
      const response = await fetch('/tarefas'); // Faz uma requisição à API
      const tarefas = await response.json();

      const container = document.getElementById('tarefas-container');
      container.innerHTML = ''; // Limpa o container antes de renderizar

  
      tarefas.forEach(tarefa => {
       
        const div = document.createElement('div');
        div.classList.add('tarefa');
        div.innerHTML = `
        <div class=alinhar1>
             <p>${tarefa.status}</p>
              <p id="colore">${tarefa.importancia}</p>
          </div>
      
          <h3>${tarefa.titulo}</h3>
          <p>${tarefa.descricao || 'Sem descrição'}</p>
        
        <p>${tarefa.prazo ? new Date(tarefa.prazo).toLocaleDateString('pt-BR') : 'Sem prazo'}</p>

          <div class="btn">
          <button class="btnEditar" onclick='openEditPopup(${JSON.stringify(tarefa)})'>Editar</button>
          <button class="btnExcluir" onclick="excluirTarefa(${tarefa.id_tarefa})">Excluir</button>
         ${
                tarefa.status === 'concluida' 
                ? `<button id="desfazer" class="btnEditar" onclick="desfazerTarefa(${tarefa.id_tarefa})">Desfazer</button>`
                : `<button id="concluir" class="btnConcluir" onclick="concluirTarefa(${tarefa.id_tarefa})">Concluir</button>`
            }
            </div>
        `;
        container.appendChild(div);
      });
   
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }

 
  }

  async function excluirTarefa(id) {
    // Implementar exclusão via API
    console.log(`Excluir tarefa com ID ${id}`);
  }

  async function concluirTarefa(id) {
    try {
      const response = await fetch(`/tarefas/${id}/concluir`, {
        method: 'PUT',
      });

      if (response.ok) {

        carregarTarefas();
        // Recarrega a lista de tarefas
      } else {
        alert('Erro ao concluir a tarefa.');
      }
    } catch (error) {
      console.error('Erro ao concluir tarefa:', error);
      alert('Erro ao concluir a tarefa.');
    }
  
  }

  function editar(){

  }

  // Carrega as tarefas ao carregar a página
  document.addEventListener('DOMContentLoaded', carregarTarefas);


  async function excluirTarefa(id) {

    try {
      const response = await fetch(`/tarefas/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
      
        carregarTarefas(); 
      } else {
        alert('Erro ao excluir a tarefa.');
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      alert('Erro ao excluir a tarefa.');
    }
  }


async function desfazerTarefa(id) {
  try {
      const response = await fetch(`/tarefa/desfazer/${id}`, { method: 'PATCH' });
      if (response.ok) {
          
         
          location.reload(); // Recarrega a página para refletir as alterações
      } else {
          alert('Erro ao desfazer a tarefa.');
      }
  } catch (error) {
      console.error('Erro:', error);
  }
}


