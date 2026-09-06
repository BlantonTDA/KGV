/* ==========================================================================
   KGV — Chatbot widget
   NOTE: This is a fully static, client-side, scripted contact-router.
   It does NOT call any AI/API and has zero ongoing cost. It just walks the
   visitor to the right contact info / form based on what they click.

   >>> EDIT THE CONTACT CONSTANTS BELOW WITH REAL KGV DETAILS <<<
   ========================================================================== */

(function () {
  'use strict';

  const CONTACT = {
    phone: '+233 000 000 000',       // TODO: replace with real KGV phone
    email: 'info@kgvltd.com',        // TODO: replace with real KGV email
    contactPageUrl: 'contact.html',
  };

  const LINKS = {
    apex10: 'https://apex10africa.com/',
    sanihancer: 'https://sanihancer.net/',
  };

  const launcher = document.getElementById('chatbotLauncher');
  const win = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatbotClose');
  const body = document.getElementById('chatbotBody');

  if (!launcher || !win || !body) return;

  function toggleWindow(open) {
    win.classList.toggle('is-open', open);
    launcher.setAttribute('aria-expanded', String(open));
  }

  launcher.addEventListener('click', () => {
    const isOpen = win.classList.contains('is-open');
    toggleWindow(!isOpen);
    if (!isOpen && !body.dataset.started) startChat();
  });
  closeBtn?.addEventListener('click', () => toggleWindow(false));

  function addBotMessage(text) {
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function addUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'chat-msg user';
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function clearOptions() {
    body.querySelectorAll('.chatbot-window__options').forEach((el) => el.remove());
  }

  function showOptions(options) {
    clearOptions();
    const wrap = document.createElement('div');
    wrap.className = 'chatbot-window__options';
    options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chat-option';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => {
        addUserMessage(opt.label);
        clearOptions();
        opt.onSelect();
      });
      wrap.appendChild(btn);
    });
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function contactCard(intro) {
    addBotMessage(intro);
    addBotMessage(`📞 ${CONTACT.phone}\n✉️ ${CONTACT.email}`);
    showOptions([
      { label: 'Open the full Contact page', onSelect: () => { window.location.href = CONTACT.contactPageUrl; } },
      { label: '← Back to main menu', onSelect: mainMenu },
    ]);
  }

  function mainMenu() {
    addBotMessage('How can I help you today?');
    showOptions([
      { label: 'APEX-10 (Organic Fertilizer)', onSelect: () =>
        productAnswer('APEX-10 is our organic fertilizer brand under KGV.', LINKS.apex10) },
      { label: 'Apex10 Fresh', onSelect: () =>
        contactCard('Apex10 Fresh is one of our KGV ventures — details are on the way. For now, reach our team directly:') },
      { label: 'Sanihancer (Poultry & Septic Cleaner)', onSelect: () =>
        productAnswer('Sanihancer is our cleaning product line for poultry farms and septic systems.', LINKS.sanihancer) },
      { label: 'Organic Super Mulch', onSelect: () =>
        contactCard('Organic Super Mulch is one of our KGV product lines. For details, reach our team directly:') },
      { label: 'Denkyem Foundation', onSelect: () =>
        contactCard("Denkyem Foundation is KGV's philanthropic and community arm. For details, reach our team directly:") },
      { label: 'Partnership / General Inquiry', onSelect: () =>
        contactCard('Great — for partnerships and general inquiries, please reach the KGV team directly:') },
      { label: 'Speak to a real person', onSelect: () =>
        contactCard('Of course — here is how to reach the KGV team directly:') },
    ]);
  }

  function productAnswer(blurb, url) {
    addBotMessage(blurb);
    showOptions([
      { label: 'Visit product website ↗', onSelect: () => window.open(url, '_blank', 'noopener') },
      { label: 'Contact KGV about this', onSelect: () => contactCard('Here is how to reach the KGV team:') },
      { label: '← Back to main menu', onSelect: mainMenu },
    ]);
  }

  function startChat() {
    body.dataset.started = 'true';
    addBotMessage("Hi! I'm the KGV assistant. I can point you to the right product or contact — I'm not an AI, just a quick guide.");
    mainMenu();
  }
})();
