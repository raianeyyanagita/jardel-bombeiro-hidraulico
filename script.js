document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualiza o ano no rodapé
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Interatividade do Bonequinho Animado ("Super Jardel")
  const mascotStage = document.getElementById('mascotStage');
  const mascotSpeechText = document.getElementById('mascotSpeechText');

  const phrases = [
    '💧 Salvando você de entrar pelo cano! Toque em mim!',
    '🔧 Vazamento ou entupimento? Chego rápido em Itaúna!',
    '🚿 Instalação de chuveiros, torneiras e descargas caprichada!',
    '⏰ Plantão 24 horas! Precisou, é só chamar no WhatsApp!',
    '🙏🏼 Deus abençoe seu lar! Conte sempre com o Jardel!'
  ];

  let phraseIndex = 0;

  function triggerMascotReaction() {
    if (!mascotStage || !mascotSpeechText) return;

    phraseIndex = (phraseIndex + 1) % phrases.length;
    mascotSpeechText.textContent = phrases[phraseIndex];

    mascotStage.classList.remove('mascot-excited');
    // Force reflow to restart animation
    void mascotStage.offsetWidth;
    mascotStage.classList.add('mascot-excited');

    setTimeout(() => {
      mascotStage.classList.remove('mascot-excited');
    }, 750);
  }

  if (mascotStage) {
    mascotStage.addEventListener('click', triggerMascotReaction);
    mascotStage.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerMascotReaction();
      }
    });

    // Troca a fala suavemente a cada 6 segundos mesmo sem clique
    setInterval(() => {
      if (!mascotStage.matches(':hover')) {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        if (mascotSpeechText) {
          mascotSpeechText.textContent = phrases[phraseIndex];
        }
      }
    }, 6000);
  }

  // 3. Gerador de Orçamento Direto para o WhatsApp
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const service = document.getElementById('serviceType').value;
      const urgencyInput = document.querySelector('input[name="urgency"]:checked');
      const urgency = urgencyInput ? urgencyInput.value : 'Normal';
      const location = document.getElementById('clientLocation').value.trim();
      const details = document.getElementById('clientDetails').value.trim();

      const lines = [
        'Olá, *Jardel Bombeiro Hidráulico*! 👋',
        'Vim pelo site e gostaria de *solicitar um orçamento*:',
        '',
        `👤 *Nome:* ${name}`,
        `🛠️ *Serviço:* ${service}`,
        `⚡ *Urgência:* ${urgency}`
      ];

      if (location) {
        lines.push(`📍 *Bairro/Local:* ${location}`);
      }
      if (details) {
        lines.push(`📝 *Detalhes:* ${details}`);
      }

      const message = encodeURIComponent(lines.join('\n'));
      const whatsappUrl = `https://wa.me/5537998095527?text=${message}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }
});
