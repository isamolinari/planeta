// ===== ELEMENTOS PRINCIPAIS =====
const enunciadoPrincipal = document.querySelector('.enunciado-principal');
const botaoPrincipal = document.querySelector('.botao-principal');

// ===== ELEMENTOS DINÂMICOS =====
const inputNome = document.createElement('input');
inputNome.type = 'text';
inputNome.className = 'input-text';
inputNome.placeholder = 'Digite o seu nome';

const inputNumber = document.createElement('input');
inputNumber.type = 'number';
inputNumber.className = 'input-number';
inputNumber.min = 1;
inputNumber.value = 1;

// slider reutilizável
const inputRange = document.createElement('input');
inputRange.type = 'range';
inputRange.className = 'input-range';
inputRange.min = 0; inputRange.max = 100; inputRange.value = 50;

const labelRange = document.createElement('span');
labelRange.className = 'label-range';
labelRange.textContent = inputRange.value + '%';

// radio energia
const radioSim = document.createElement('input');
radioSim.type = 'radio'; radioSim.name = 'energia'; radioSim.id = 'energia-sim';
const labelRadioSim = document.createElement('label');
labelRadioSim.htmlFor = 'energia-sim'; labelRadioSim.className = 'radio-label';
labelRadioSim.textContent = 'Sim';

const radioNao = document.createElement('input');
radioNao.type = 'radio'; radioNao.name = 'energia'; radioNao.id = 'energia-nao';
const labelRadioNao = document.createElement('label');
labelRadioNao.htmlFor = 'energia-nao'; labelRadioNao.className = 'radio-label';
labelRadioNao.textContent = 'Não';

const imgResultado = document.createElement('img');
imgResultado.className = 'img-planeta';
imgResultado.alt = 'Ilustração do planeta';
imgResultado.src = 'img/logo_planetas.png';

const textoResultado = document.createElement('div');
textoResultado.className = 'qtd-planetas';

// ===== VARIÁVEIS DE ESTADO =====
let paginaAtual = 0;
let nome = '';
let respostas = [50,50,1,1,50]; // valores padrão
let segundos = 0; let timerInterval = null;

// atualizar label do range
inputRange.addEventListener('input', ()=>{ labelRange.textContent = inputRange.value + '%' });

// ===== FUNÇÕES AUXILIARES =====
function startTimer(){
  segundos = 0;
  if(timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(()=>{ segundos++ }, 1000);
}
function stopTimer(){
  if(timerInterval){ clearInterval(timerInterval); timerInterval = null }
}

function calculaResultado(){
  const pontos = [0,0,0,0,0];
  pontos[0] = Math.floor(respostas[0]/20) * 5;
  let i = Math.floor(respostas[1]/20); if(i<0) i=0; if(i>5) i=5;
  pontos[1] = (5 - i) * 5;
  if(respostas[2] <= 2) pontos[2] = 5;
  else if(respostas[2] <= 5) pontos[2] = 10;
  else pontos[2] = 20;
  pontos[3] = (respostas[3] ? 1 : 0) * 20;
  pontos[4] = Math.floor(respostas[4]/20) * 5;

  let resultadoFinal = pontos.reduce((a,b)=>a+b,0);
  const qtdPlanetas = Math.max(0, Math.floor(resultadoFinal / 20));
  return {resultadoFinal, qtdPlanetas};
}

// ===== RENDERIZAÇÃO =====
function render(){
  enunciadoPrincipal.innerHTML = '';

  if(paginaAtual === 0){
    enunciadoPrincipal.textContent = 'Olá! Vamos calcular sua pegada ecológica?';
    botaoPrincipal.textContent = 'Iniciar';
    stopTimer();
  }
  else if(paginaAtual === 1){
    enunciadoPrincipal.textContent = 'Digite o seu nome:';
    enunciadoPrincipal.appendChild(document.createElement('br'));
    enunciadoPrincipal.appendChild(document.createElement('br'));
    enunciadoPrincipal.appendChild(inputNome);
    inputNome.focus();
    botaoPrincipal.textContent = 'Continuar';
  }
  else if(paginaAtual === 2){
    enunciadoPrincipal.textContent = `${nome}, com que frequência você consome produtos de origem animal?`;
    enunciadoPrincipal.appendChild(document.createElement('br'));
    enunciadoPrincipal.appendChild(inputRange);
    enunciadoPrincipal.appendChild(labelRange);
    inputRange.value = respostas[0]; labelRange.textContent = inputRange.value + '%';
    botaoPrincipal.textContent = 'Continuar';
  }
  else if(paginaAtual === 3){
    enunciadoPrincipal.textContent = `${nome}, dos alimentos que consome, qual a percentagem de comida não processada, não embalada ou cultivada localmente?`;
    enunciadoPrincipal.appendChild(document.createElement('br'));
    enunciadoPrincipal.appendChild(inputRange);
    enunciadoPrincipal.appendChild(labelRange);
    inputRange.value = respostas[1]; labelRange.textContent = inputRange.value + '%';
    botaoPrincipal.textContent = 'Continuar';
  }
  else if(paginaAtual === 4){
    enunciadoPrincipal.textContent = `${nome}, quantas pessoas residem no teu agregado familiar?`;
    enunciadoPrincipal.appendChild(document.createElement('br'));
    enunciadoPrincipal.appendChild(document.createElement('br'));
    enunciadoPrincipal.appendChild(inputNumber);
    botaoPrincipal.textContent = 'Continuar';
  }
  else if(paginaAtual === 5){
    enunciadoPrincipal.textContent = `${nome}, você tem energia elétrica em casa?`;
    const box = document.createElement('div'); box.className = 'input-box';
    const wrapSim = document.createElement('label'); wrapSim.style.display='flex'; wrapSim.style.alignItems='center';
    wrapSim.appendChild(radioSim); wrapSim.appendChild(labelRadioSim);

    const wrapNao = document.createElement('label'); wrapNao.style.display='flex'; wrapNao.style.alignItems='center';
    wrapNao.appendChild(radioNao); wrapNao.appendChild(labelRadioNao);

    box.appendChild(wrapSim); box.appendChild(wrapNao);
    enunciadoPrincipal.appendChild(document.createElement('br'));
    enunciadoPrincipal.appendChild(box);
    botaoPrincipal.textContent = 'Continuar';
  }
  else if(paginaAtual === 6){
    enunciadoPrincipal.textContent = `${nome}, com que frequência viaja de avião anualmente?`;
    enunciadoPrincipal.appendChild(document.createElement('br'));
    enunciadoPrincipal.appendChild(inputRange);
    enunciadoPrincipal.appendChild(labelRange);
    inputRange.value = respostas[4]; labelRange.textContent = inputRange.value + '%';
    botaoPrincipal.textContent = 'Continuar';
  }
  else if(paginaAtual === 7){
    stopTimer();
    const {resultadoFinal, qtdPlanetas} = calculaResultado();

    const p1 = document.createElement('p');
    p1.textContent = `Aqui está sua pegada ecológica, ${nome}!`;

    const divResultado = document.createElement('div');
    divResultado.className = 'resultado-div';
    textoResultado.textContent = `${qtdPlanetas} planeta(s).`;
    divResultado.appendChild(imgResultado);
    divResultado.appendChild(textoResultado);

    enunciadoPrincipal.appendChild(p1);
    enunciadoPrincipal.appendChild(divResultado);

    botaoPrincipal.textContent = 'Reiniciar';
  }
}

// ===== EVENTOS =====
botaoPrincipal.addEventListener('click', ()=>{
  if(paginaAtual === 0){
    paginaAtual++;
    startTimer();
  }
  else if(paginaAtual === 1){
    nome = inputNome.value.trim() || 'Visitante';
    paginaAtual++;
  }
  else if(paginaAtual === 2){
    respostas[0] = parseInt(inputRange.value);
    paginaAtual++;
  }
  else if(paginaAtual === 3){
    respostas[1] = parseInt(inputRange.value);
    paginaAtual++;
  }
  else if(paginaAtual === 4){
    respostas[2] = parseInt(inputNumber.value);
    paginaAtual++;
  }
  else if(paginaAtual === 5){
    respostas[3] = radioSim.checked ? 1 : 0;
    paginaAtual++;
  }
  else if(paginaAtual === 6){
    respostas[4] = parseInt(inputRange.value);
    paginaAtual++;
  }
  else if(paginaAtual === 7){
    paginaAtual = 0;
    nome = '';
    respostas = [50,50,1,1,50];
  }
  render();
});

// inicializa
render();
