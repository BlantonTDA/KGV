/* ==========================================================================
   KGV: contact form
   Sends the message to king@kingglobalventures.com through FormSubmit.co
   (free, no account). The form also works without JavaScript because its
   action points at the same address.
   ========================================================================== */
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var TO = 'king@kingglobalventures.com';
  var button = document.getElementById('contactSubmit');
  var status = document.getElementById('contactStatus');

  function show(kind, html) {
    status.className = 'form-status ' + (kind === 'ok' ? 'is-ok' : 'is-error');
    status.innerHTML = html;
    status.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    // Hidden spam trap: bots fill it, people never see it
    if (form.elements._honey && form.elements._honey.value) return;

    var data = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      topic: form.elements.topic.value,
      message: form.elements.message.value,
      _subject: 'KGV website: ' + form.elements.topic.value + ' (' + form.elements.name.value + ')',
      _template: 'table',
      _captcha: 'false'
    };

    button.disabled = true;
    var label = button.textContent;
    button.textContent = 'Sending...';
    status.hidden = true;

    fetch('https://formsubmit.co/ajax/' + TO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (res) {
        if (res.ok && String(res.body.success) === 'true') {
          form.reset();
          show('ok', 'Thank you. Your message has been sent and we will reply to the email address you gave.');
        } else {
          throw new Error((res.body && res.body.message) || 'Send failed');
        }
      })
      .catch(function () {
        show('error', 'Sorry, your message could not be sent. Please email us directly at <a href="mailto:' + TO + '">' + TO + '</a>.');
      })
      .then(function () {
        button.disabled = false;
        button.textContent = label;
      });
  });
})();
