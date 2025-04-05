// Elementos
const btnIniciar = document.getElementById('btn-iniciar');
const btnBatalhar = document.getElementById('btn-batalhar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const telaInicial = document.getElementById('tela-inicial');
const telaJogo = document.getElementById('tela-jogo');
const telaResultado = document.getElementById('tela-resultado');
const formPersonagens = document.getElementById('form-personagens');
const resultadoConteudo = document.getElementById('resultado-conteudo');

// Dados do jogo
const viloesPossiveis = ["Nazaré", "Odete Roitmann", "Flora", "Carminha", "Laura Prudente da Costa", "Bia Falcão"];
let personagens = [];
let viloes = [];
let forcaPersonagens = 0;
let forcaViloes = 0;

// Iniciar jogo
btnIniciar.addEventListener('click', () => {
    telaInicial.classList.add('escondido');
    telaJogo.classList.remove('escondido');
    
    // Criar inputs para personagens
    formPersonagens.innerHTML = '';
    for(let i = 0; i < 3; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'input-personagem';
        input.placeholder = `Nome do Herói ${i+1}`;
        formPersonagens.appendChild(input);
    }
});

// Iniciar batalha
btnBatalhar.addEventListener('click', () => {
    // Coletar personagens
    const inputs = document.querySelectorAll('.input-personagem');
    personagens = Array.from(inputs).map(input => input.value);
    
    // Gerar vilões aleatórios
    viloes = [];
    for(let i = 0; i < 3; i++) {
        const indice = Math.floor(Math.random() * viloesPossiveis.length);
        viloes.push(viloesPossiveis[indice]);
    }
    
    // Calcular forças
    forcaPersonagens = personagens.reduce((acc) => acc + Math.floor(Math.random() * 10) + 1, 0);
    forcaViloes = viloes.reduce((acc) => acc + Math.floor(Math.random() * 10) + 1, 0);
    
    // Mostrar resultado
    mostrarResultado();
});

// Mostrar resultado
function mostrarResultado() {
    telaJogo.classList.add('escondido');
    telaResultado.classList.remove('escondido');
    
    // Determinar resultado
    let resultado;
    if(forcaPersonagens > forcaViloes) {
        resultado = 'vitoria';
    } else if(forcaPersonagens < forcaViloes) {
        resultado = 'derrota';
    } else {
        resultado = 'empate';
    }
    
    // Aplicar estilo conforme resultado
    telaResultado.className = 'tela ' + resultado;
    
    // Criar conteúdo do resultado
    let html = `
        <h2>${resultado === 'vitoria' ? '🎉 VITÓRIA!' : resultado === 'derrota' ? '💀 DERROTA!' : '🤝 EMPATE!'}</h2>
        <p><strong>Seus Heróis:</strong> ${personagens.join(', ')}</p>
        <p><strong>Vilões Enfrentados:</strong> ${viloes.join(', ')}</p>
        <p><strong>Força dos Heróis:</strong> ${forcaPersonagens}</p>
        <p><strong>Força dos Vilões:</strong> ${forcaViloes}</p>
    `;
    
    resultadoConteudo.innerHTML = html;
}

// Reiniciar jogo
btnReiniciar.addEventListener('click', () => {
    telaResultado.classList.add('escondido');
    telaInicial.classList.remove('escondido');
    personagens = [];
    viloes = [];
    forcaPersonagens = 0;
    forcaViloes = 0;
});