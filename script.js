// Seleção de Elementos da Interface
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const btnAnalisar = document.getElementById('btn-analisar');
const resultCard = document.getElementById('result-card');
const btnReset = document.getElementById('btn-reset');

// Elementos de texto do resultado
const detectedPest = document.getElementById('detected-pest');
const pestSolution = document.getElementById('pest-solution');

// Banco de dados simulado para respostas rápidas e educativas
const solucoesSimuladas = [
    {
        praga: "Pulgão Verde (Aphididae)",
        solucao: "Aplicação de calda de fumo ou introdução de Joaninhas na lavoura. As joaninhas agem como predadores naturais, controlando a população de pulgões sem necessidade de veneno."
    },
    {
        praga: "Lagarta-do-Cartucho (Spodoptera frugiperda)",
        solucao: "Utilização do bioinseticida à base da bactéria Bacillus thuringiensis (Bt). É uma solução biológica específica que elimina a lagarta sem prejudicar outros insetos polinizadores."
    },
    {
        praga: "Ácaro Rajado (Tetranychus urticae)",
        solucao: "Pulverização com óleo de Neem diluído em água ou introdução de ácaros predadores (família Phytoseiidae). Mantenha a umidade ideal, pois o ácaro-rajado prefere climas secos."
    }
];

// Evento para abrir o seletor de arquivos ao clicar na área
dropZone.addEventListener('click', () => fileInput.click());

// Evento de alteração do arquivo (quando o usuário escolhe uma foto)
fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            dropZone.classList.add('hidden');
            previewContainer.classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    }
});

// Simulação de clique de arrastar e soltar (Drag and Drop) para UX avançada
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = "#e8f5e9";
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.backgroundColor = "transparent";
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = "transparent";
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        fileInput.files = e.dataTransfer.files;
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            dropZone.classList.add('hidden');
            previewContainer.classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    }
});

// Evento de análise da imagem
btnAnalisar.addEventListener('click', () => {
    btnAnalisar.textContent = "Analisando imagem...";
    btnAnalisar.disabled = true;

    // Simula uma resposta de IA em 1.5 segundos
    setTimeout(() => {
        // Seleciona um resultado aleatório do nosso banco ecológico para demonstração
        const resultadoAleatorio = solucoesSimuladas[Math.floor(Math.random() * solucoesSimuladas.length)];
        
        detectedPest.textContent = resultadoAleatorio.praga;
        pestSolution.textContent = resultadoAleatorio.solucao;

        // Atualiza a interface
        previewContainer.classList.add('hidden');
        resultCard.classList.remove('hidden');
    }, 1500);
});

// Evento para resetar o formulário e fazer nova consulta
btnReset.addEventListener('click', () => {
    fileInput.value = "";
    imagePreview.src = "#";
    btnAnalisar.textContent = "Analisar Imagem";
    btnAnalisar.disabled = false;
    
    resultCard.classList.add('hidden');
    dropZone.classList.remove('hidden');
});