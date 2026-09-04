(function(){
  var wrapLongCodeLines = false;
  var enableCodePressToWrap = false;
  var hideCodeScrollbarWhenIdle = true;
  var toArray = function(list){
    return Array.prototype.slice.call(list);
  };
  var existingInteractions = window.__htmlServerContentInteractions;
  if (existingInteractions && typeof existingInteractions.initAll === 'function') {
    existingInteractions.initAll();
    return;
  }

  // ── 兜底 CSS：callout 主题色 + 折叠 + 复制按钮反馈 ──────────────
  function ensureStyles(){
    if (document.getElementById('obsidian-html-server-fixes')) return;
    var s = document.createElement('style');
    s.id = 'obsidian-html-server-fixes';
    s.textContent = [
      '.callout {',
      '  background-color: rgba(124, 124, 124, 0.08) !important;',
      '}',
      '',
      '.callout[data-callout="note"],',
      '.callout[data-callout="info"] {',
      '  background-color: rgba(8, 109, 221, 0.08) !important;',
      '  border-left-color: rgba(8, 109, 221, 0.6) !important;',
      '}',
      '',
      '.callout[data-callout="tip"],',
      '.callout[data-callout="success"] {',
      '  background-color: rgba(0, 191, 89, 0.08) !important;',
      '  border-left-color: rgba(0, 191, 89, 0.6) !important;',
      '}',
      '',
      '.callout[data-callout="warning"] {',
      '  background-color: rgba(255, 165, 0, 0.1) !important;',
      '  border-left-color: rgba(255, 140, 0, 0.7) !important;',
      '}',
      '',
      '.callout[data-callout="danger"],',
      '.callout[data-callout="error"],',
      '.callout[data-callout="failure"] {',
      '  background-color: rgba(255, 62, 62, 0.08) !important;',
      '  border-left-color: rgba(220, 38, 38, 0.7) !important;',
      '}',
      '',
      '.callout[data-callout="example"] {',
      '  background-color: rgba(173, 86, 221, 0.08) !important;',
      '  border-left-color: rgba(173, 86, 221, 0.6) !important;',
      '}',
      '',
      '.callout[data-callout="question"] {',
      '  background-color: rgba(236, 177, 18, 0.1) !important;',
      '  border-left-color: rgba(202, 138, 4, 0.7) !important;',
      '}',
      '',
      '.callout[data-callout="quote"] {',
      '  background-color: rgba(124, 124, 124, 0.08) !important;',
      '  border-left-color: rgba(124, 124, 124, 0.4) !important;',
      '}',
      '',
      '.theme-dark .callout {',
      '  background-color: rgba(255, 255, 255, 0.04) !important;',
      '}',
      '',
      '.callout-folded > .callout-content {',
      '  display: none !important;',
      '}',
      '',
      'body:not(.adjustable-embed-content-height)',
      ':is(.markdown-preview-view, .markdown-rendered)',
      '.markdown-embed-content {',
      '  max-height: none !important;',
      '}',
      '',
      '.callout-title > .callout-fold {',
      '  display: inline-flex !important;',
      '  width: 24px !important;',
      '  height: 24px !important;',
      '  flex: 0 0 24px;',
      '  align-items: center !important;',
      '  justify-content: center !important;',
      '  transform: none !important;',
      '}',
      '.callout-title > .callout-fold > svg {',
      '  transform: rotate(0deg) !important;',
      '  transform-box: fill-box;',
      '  transform-origin: 50% 50% !important;',
      '  transition: transform 180ms ease-in-out !important;',
      '}',
      '.callout:is(.is-collapsed, .callout-folded) .callout-title > .callout-fold > svg {',
      '  transform: rotate(-90deg) !important;',
      '}',
      '',
      '.copy-code-button,',
      '.copy-code-button:hover,',
      '.copy-code-button:focus,',
      '.copy-code-button:focus-visible,',
      '.copy-code-button:active {',
      '  border: 0 !important;',
      '  outline: 0 !important;',
      '  background: transparent !important;',
      '  box-shadow: none !important;',
      '}',
      '.copy-code-button.copied {',
      '  color: #2da44e !important;',
      '  animation: html-server-copy-success 360ms ease-out;',
      '}',
      '.copy-code-button.copied svg {',
      '  width: 14px !important;',
      '  height: 14px !important;',
      '  color: #2da44e !important;',
      '  stroke: currentColor !important;',
      '}',
      '@keyframes html-server-copy-success {',
      '  0% { transform: scale(1); }',
      '  45% { transform: scale(1.12); }',
      '  100% { transform: scale(1); }',
      '}',
      '',
      '.markdown-rendered pre:has(> code) {',
      '  overflow-x: hidden !important;',
      '}',
      'body.html-server-blog-body.theme-dark[class*="notebook-liked-markdown-page"] .markdown-rendered pre:has(> code) {',
      '  border-color: color-mix(in srgb, var(--interactive-accent) 18%, #30343a) !important;',
      '  background-color: color-mix(in srgb, var(--interactive-accent) 3%, #1a1e23) !important;',
      '  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.025), 0 1px 2px rgba(0, 0, 0, 0.26) !important;',
      '}',
      '.markdown-rendered pre:not(.code-styler-pre):has(> code) {',
      '  padding-right: 12px !important;',
      '  padding-bottom: 2px !important;',
      '  padding-left: 12px !important;',
      '}',
      'body[class*="notebook-liked-markdown-page"] .markdown-rendered pre:not(.code-styler-pre):has(> code) {',
      '  padding-top: 6px !important;',
      '  padding-bottom: 8px !important;',
      '}',
      'body[class*="notebook-liked-markdown-page"] .markdown-rendered pre:not(.code-styler-pre)::before {',
      '  position: absolute !important;',
      '  top: 4px !important;',
      '  right: 48px !important;',
      '  bottom: auto !important;',
      '}',
      '.markdown-rendered pre > code {',
      '  display: block !important;',
      '  width: 100% !important;',
      '  min-width: 0 !important;',
      '  max-width: 100% !important;',
      wrapLongCodeLines ? '  overflow-x: hidden !important;' : '  overflow-x: auto !important;',
      '  box-sizing: border-box !important;',
      '}',
      '.markdown-rendered pre > code {',
      wrapLongCodeLines ? '  white-space: pre-wrap !important;' : '  white-space: pre !important;',
      wrapLongCodeLines ? '  overflow-wrap: break-word !important;' : '  overflow-wrap: normal !important;',
      '  word-break: normal !important;',
      '}',
      '.markdown-rendered pre.html-server-code-press-wrap > code {',
      '  overflow-x: hidden !important;',
      '  white-space: pre-wrap !important;',
      '  overflow-wrap: break-word !important;',
      '  word-break: normal !important;',
      '}',
      '.markdown-rendered pre:not(.code-styler-pre) > code {',
      '  padding: 4px 0 2px !important;',
      '}',
      '.markdown-rendered pre > code {',
      '  scrollbar-width: thin;',
      '  scrollbar-color: transparent transparent;',
      '}',
      '.markdown-rendered pre > code::-webkit-scrollbar {',
      '  height: 6px;',
      '}',
      '.markdown-rendered pre > code.html-server-scrollbar-visible {',
      '  scrollbar-width: thin;',
      '  scrollbar-color: var(--scrollbar-thumb-bg, rgba(128, 128, 128, 0.45)) transparent;',
      '}',
      '.markdown-rendered pre > code::-webkit-scrollbar-track {',
      '  background: transparent;',
      '}',
      '.markdown-rendered pre > code::-webkit-scrollbar-thumb {',
      '  min-width: 32px;',
      '  border: 1px solid transparent;',
      '  border-radius: 999px;',
      '  background: transparent;',
      '  background-clip: padding-box;',
      '}',
      '.markdown-rendered pre > code.html-server-scrollbar-visible::-webkit-scrollbar-thumb {',
      '  background: var(--scrollbar-thumb-bg, rgba(128, 128, 128, 0.45));',
      '  background-clip: padding-box;',
      '}',
      'body pre.code-styler-pre button.run-code-button,',
      '.code-styler-run-button,',
      '.run-code-button,',
      '.code-block-run-button,',
      'button[class*="code"][class*="run"],',
      'button[aria-label="Run"],',
      'button[aria-label^="Run code"] {',
      '  display: none !important;',
      '}',
      '.has-run-code-button::before,',
      '.has-run-code-button::after {',
      '  display: none !important;',
      '  content: none !important;',
      '}',
      '',
      ':is(.ct-container, .tab-container) :is(.ct-tab-item, .tab-item) {',
      '  cursor: pointer;',
      '}',
      '',
      '.callout-title { align-items: center !important; }',
      '.callout-title::after { content: none !important; }'
    ].join(String.fromCharCode(10));
    document.head.appendChild(s);
  }

  // ── tab 切换（code-tab2） ───────────────────────────────
  function setActive(container, index, behavior){
    var tabs = toArray(container.querySelectorAll('.ct-tab-item,.ct-tab,.tab-item'));
    var contents = toArray(container.querySelectorAll('.ct-tab-content,.tab-content'));
    tabs.forEach(function(tab, i){
      var on = (i === index);
      tab.classList.toggle('ct-tab-item--active', on);
      tab.classList.toggle('tab-item--active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    contents.forEach(function(content, j){
      var on = (j === index);
      content.classList.toggle('ct-tab-content--active', on);
      content.classList.toggle('tab-content--active', on);
    });
    var active=tabs[index],bar=active&&active.parentElement;if(active&&bar&&typeof bar.scrollTo==='function'){var tabRect=active.getBoundingClientRect(),barRect=bar.getBoundingClientRect();if(tabRect.left<barRect.left||tabRect.right>barRect.right)bar.scrollTo({left:bar.scrollLeft+(tabRect.left+tabRect.width/2-barRect.left-barRect.width/2),behavior:behavior||'smooth'});}
  }

  // Code Tab2 main uses one special collapsed state: with multiple tabs all
  // labels are active while every panel is hidden; with one tab both are off.
  function setCollapsed(container){
    var tabs = toArray(container.querySelectorAll('.ct-tab-item,.ct-tab,.tab-item'));
    var contents = toArray(container.querySelectorAll('.ct-tab-content,.tab-content'));
    tabs.forEach(function(tab){
      var on = tabs.length > 1;
      tab.classList.toggle('ct-tab-item--active', on);
      tab.classList.toggle('tab-item--active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    contents.forEach(function(content){
      content.classList.remove('ct-tab-content--active', 'tab-content--active');
    });
  }

  function isActiveTab(tab){
    return tab.classList.contains('ct-tab-item--active') ||
      tab.classList.contains('tab-item--active') ||
      tab.getAttribute('aria-selected') === 'true';
  }

  function findContainer(node){
    while (node && node.nodeType === 1 && node !== document.body) {
      if (node.classList && (node.classList.contains('ct-container') || node.classList.contains('tab-container'))) return node;
      node = node.parentElement;
    }
    return null;
  }

  function getContainers(){
    return toArray(document.querySelectorAll('.ct-container,.tab-container'));
  }

  function storageKey(container){
    var all = getContainers();
    return 'obsidian-html-server:tab:' + location.pathname + ':' + all.indexOf(container);
  }

  function saveTabState(container, value){
    try { sessionStorage.setItem(storageKey(container), String(value)); }
    catch (e) {}
  }

  function restoreIndex(container){
    var tabs = toArray(container.querySelectorAll('.ct-tab-item,.ct-tab,.tab-item'));
    if (tabs.length === 0) return;
    var raw = null;
    try {
      raw = sessionStorage.getItem(storageKey(container));
    } catch (e) {}
    if (raw === 'closed') {
      setCollapsed(container);
      return;
    }
    if (raw != null) {
      var n = parseInt(raw, 10);
      if (!isNaN(n) && n >= 0 && n < tabs.length) {
        setActive(container, n, 'instant');
        return;
      }
    }
    // No saved state: preserve the renderer's upstream-equivalent initial
    // state, including fold. Only repair genuinely uninitialised markup.
    var contents = toArray(container.querySelectorAll('.ct-tab-content,.tab-content'));
    var hasTabState = tabs.some(isActiveTab);
    var hasPanelState = contents.some(function(content){
      return content.classList.contains('ct-tab-content--active') ||
        content.classList.contains('tab-content--active');
    });
    if (!hasTabState && !hasPanelState) setActive(container, 0, 'instant');
  }

  // ── 复制按钮 ────────────────────────────────────────────
  function markCopied(btn){
    if (btn.dataset.copyFeedbackActive === 'true') return;
    btn.dataset.copyFeedbackActive = 'true';
    var originalHtml = btn.innerHTML;
    var originalLabel = btn.getAttribute('aria-label');
    btn.classList.add('copied');
    btn.setAttribute('aria-label', 'Copied');
    btn.innerHTML = '<svg class="svg-icon lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';
    setTimeout(function(){
      btn.classList.remove('copied');
      btn.innerHTML = originalHtml;
      if (originalLabel == null) btn.removeAttribute('aria-label');
      else btn.setAttribute('aria-label', originalLabel);
      delete btn.dataset.copyFeedbackActive;
    }, 1200);
  }

  function copyCode(btn){
    var pre = btn.closest('pre') ||
              (btn.parentElement && btn.parentElement.querySelector && btn.parentElement.querySelector('pre'));
    if (!pre) return;
    var code = pre.querySelector('code');
    var text = code ? code.innerText : pre.innerText;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function(){
        markCopied(btn);
      }).catch(function(){
        fallbackCopy(pre, btn);
      });
    } else {
      fallbackCopy(pre, btn);
    }
  }

  // ── 按住代码块临时换行，松开恢复横向滚动 ────────────────
  function setCodePressWrapped(pre, wrapped){
    var code = pre && pre.querySelector(':scope > code');
    if (!code) return;
    pre.classList.toggle('html-server-code-press-wrap', wrapped);
    code.style.setProperty('overflow-x', wrapped ? 'hidden' : 'auto', 'important');
    code.style.setProperty('white-space', wrapped ? 'pre-wrap' : 'pre', 'important');
    code.style.setProperty('overflow-wrap', wrapped ? 'break-word' : 'normal', 'important');
    code.style.setProperty('word-break', 'normal', 'important');
  }

  var pressedCodeBlock = null;
  function releasePressedCode(){
    if (!pressedCodeBlock) return;
    setCodePressWrapped(pressedCodeBlock, false);
    pressedCodeBlock = null;
  }

  function fallbackCopy(pre, btn){
    // 旧浏览器/非 secure context：选中文本让用户自己 Ctrl+C
    try {
      var range = document.createRange();
      range.selectNodeContents(pre);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      if (document.execCommand && document.execCommand('copy')) markCopied(btn);
    } catch (e) {}
  }

  // ── callout 折叠 ────────────────────────────────────────
  // 之前用 sessionStorage 记折叠状态 + 写 document.title 调试，怀疑
  // 跟"点击 callout 页面打不开"有关。先砍掉这两块，看看是哪个动作的锅。
  function isFoldable(callout){
    return callout && callout.hasAttribute('data-callout-fold');
  }

  function toggleCallout(callout){
    if (!isFoldable(callout)) return;
    var content = callout.querySelector('.callout-content');
    if (!content) return;
    // Obsidian serializes initially folded callouts as is-collapsed plus an
    // inline display:none. Older html-server code only knew callout-folded,
    // so the first click merely added a second folded state.
    var currentlyFolded =
      callout.classList.contains('is-collapsed') ||
      callout.classList.contains('callout-folded') ||
      window.getComputedStyle(content).display === 'none';
    var folded = !currentlyFolded;
    callout.classList.toggle('is-collapsed', folded);
    callout.classList.toggle('callout-folded', folded);
    var foldIcon = callout.querySelector('.callout-fold');
    if (foldIcon) foldIcon.classList.toggle('is-collapsed', folded);
    callout.setAttribute('aria-expanded', folded ? 'false' : 'true');
    if (folded) {
      content.style.setProperty('display', 'none', 'important');
    } else {
      content.style.removeProperty('display');
    }
  }

  // ── Obsidian-question hydration ──────────────────────────
  function questionOptions(question, selector){
    return toArray(question.querySelectorAll(selector || '.question-option'));
  }

  function clearQuestionOptions(options){
    options.forEach(function(option){
      option.classList.remove('question-correct', 'question-wrong');
    });
  }

  function toggleQuestionExplanation(header){
    var body = header.parentElement && header.parentElement.querySelector('.question-explanation-body');
    if (!body) return;
    var hidden = getComputedStyle(body).display === 'none';
    body.style.display = hidden ? 'block' : 'none';
    header.classList.toggle('is-expanded', hidden);
    header.setAttribute('aria-expanded', hidden ? 'true' : 'false');
  }

  function checkTextInputs(question, selector){
    var inputs = toArray(question.querySelectorAll(selector));
    var allCorrect = inputs.length > 0;
    inputs.forEach(function(input){
      var expected = (input.getAttribute('data-correct') || '').trim().toLowerCase();
      var actual = (input.value || input.textContent || '').trim().toLowerCase();
      var correct = expected !== '' && actual === expected;
      input.classList.toggle('correct', correct);
      input.classList.toggle('wrong', !correct);
      if (!correct) allCorrect = false;
    });
    return { count: inputs.length, correct: allCorrect };
  }

  function matchPoint(item, svg){
    var connector = item.querySelector('.match-connector');
    var itemRect = (connector || item).getBoundingClientRect();
    var svgRect = svg.getBoundingClientRect();
    return { x: itemRect.left + itemRect.width / 2 - svgRect.left, y: itemRect.top + itemRect.height / 2 - svgRect.top };
  }

  function matchPathData(start, end){
    var bend = Math.max(36, Math.abs(end.x - start.x) * 0.42);
    return 'M ' + start.x + ' ' + start.y + ' C ' + (start.x + bend) + ' ' + start.y + ', ' + (end.x - bend) + ' ' + end.y + ', ' + end.x + ' ' + end.y;
  }

  function completeQuestionMatch(question, first, second){
    if (!first || !second || first === second) return false;
    var left = first.closest('.match-left') ? first : second.closest('.match-left') ? second : null;
    var right = first.closest('.match-right') ? first : second.closest('.match-right') ? second : null;
    if (!left || !right) return false;
    var letter = left.dataset.letter || '';
    var correct = !!letter && right.dataset.correctLetter === letter;
    question.querySelectorAll('.match-item.selected').forEach(function(item){ item.classList.remove('selected'); });
    left.classList.remove('correct', 'wrong'); right.classList.remove('correct', 'wrong');
    left.classList.add(correct ? 'correct' : 'wrong'); right.classList.add(correct ? 'correct' : 'wrong');
    var svg = question.querySelector('.match-svg');
    if (svg) {
      svg.querySelectorAll('path[data-match-letter="' + letter + '"]').forEach(function(path){ path.remove(); });
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('data-match-letter', letter);
      path.setAttribute('d', matchPathData(matchPoint(left, svg), matchPoint(right, svg)));
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', correct ? 'var(--color-green, #2da44e)' : 'var(--color-red, #d33)');
      path.setAttribute('stroke-width', '3');
      path.setAttribute('stroke-linecap', 'round');
      svg.appendChild(path);
    }
    delete question.dataset.matchLetter;
    return true;
  }

  function hydrateQuestionClick(e){
    var target = e.target;
    var question = target.closest('.question-container');
    if (!question) return false;

    var explanation = target.closest('.question-explanation-header');
    if (explanation) { toggleQuestionExplanation(explanation); return true; }

    var wrapper = question.closest('[class*="block-language-"]');
    var type = wrapper ? toArray(wrapper.classList).filter(function(name){ return name.indexOf('block-language-') === 0; })[0] || '' : '';
    type = type.replace('block-language-', '');
    var option = target.closest('.question-option');

    var matchItem = target.closest('.match-item');
    if (matchItem && type === 'match') {
      if (matchItem.closest('.match-left')) {
        questionOptions(question, '.match-left .match-item').forEach(function(item){ item.classList.remove('selected'); });
        matchItem.classList.add('selected');
        question.dataset.matchLetter = matchItem.dataset.letter || '';
      } else if (matchItem.closest('.match-right') && question.dataset.matchLetter) {
        var letter = question.dataset.matchLetter;
        var left = question.querySelector('.match-left .match-item[data-letter="' + letter + '"]');
        completeQuestionMatch(question, left, matchItem);
      }
      return true;
    }

    var movable = target.closest('.drag-option, .tag-option');
    if (movable) {
      question.querySelectorAll('.drag-option.selected, .tag-option.selected').forEach(function(item){ item.classList.remove('selected'); });
      movable.classList.add('selected');
      question.__htmlServerSelectedOption = movable;
      return true;
    }
    var destination = target.closest('.drag-zone, .tag-zone');
    if (destination && question.__htmlServerSelectedOption) {
      var selectedOption = question.__htmlServerSelectedOption;
      var destinationItems = destination.querySelector('.drag-zone-items, .tag-zone-items');
      if (destinationItems) { destinationItems.appendChild(selectedOption); selectedOption.classList.add('placed'); selectedOption.classList.remove('selected'); }
      question.__htmlServerSelectedOption = null;
      return true;
    }

    if (option && type === 'single') {
      var singleOptions = questionOptions(question);
      var selected = singleOptions.indexOf(option);
      clearQuestionOptions(singleOptions);
      singleOptions.forEach(function(item){ var radio = item.querySelector('.question-radio-box'); if (radio) radio.classList.remove('selected'); });
      var selectedRadio = option.querySelector('.question-radio-box'); if (selectedRadio) selectedRadio.classList.add('selected');
      option.classList.add(String(selected) === question.dataset.correctIndex ? 'question-correct' : 'question-wrong');
      return true;
    }

    if (option && type === 'multi') {
      var checkbox = option.querySelector('.question-checkbox-box');
      if (!checkbox) return false;
      checkbox.classList.toggle('selected');
      var selectedNow = checkbox.classList.contains('selected');
      option.classList.remove('question-correct', 'question-wrong');
      if (selectedNow) option.classList.add(option.dataset.correct === 'true' ? 'question-correct' : 'question-wrong');
      return true;
    }

    if (option && type === 'truefalse') {
      var tfOptions = questionOptions(question, '.truefalse-options .question-option');
      var tfSelected = tfOptions.indexOf(option);
      clearQuestionOptions(tfOptions);
      if (String(tfSelected) === question.dataset.correctIndex) option.classList.add('question-correct');
      else {
        option.classList.add('question-wrong');
        if (tfOptions[Number(question.dataset.correctIndex)]) tfOptions[Number(question.dataset.correctIndex)].classList.add('question-correct');
      }
      return true;
    }

    var submit = target.closest('.essay-submit-btn');
    if (submit) {
      var textarea = question.querySelector('.essay-textarea');
      if (textarea && textarea.value.trim()) {
        textarea.disabled = true; submit.textContent = '已提交'; submit.classList.add('essay-submit-btn-submitted');
        var view = question.querySelector('.essay-view-answer-btn'); if (view) view.style.display = 'inline-block';
      }
      return true;
    }
    var viewAnswer = target.closest('.essay-view-answer-btn');
    if (viewAnswer) {
      var answerHeader = question.querySelector('.question-explanation-header'); if (answerHeader) toggleQuestionExplanation(answerHeader);
      return true;
    }

    var check = target.closest('.blank-check-btn');
    if (check) {
      var result;
      if (type === 'order') {
        var ordered = questionOptions(question, '.order-item');
        var correctOrder = ordered.every(function(item, index){ return Number(item.dataset.num) === index + 1; });
        ordered.forEach(function(item, index){ item.classList.toggle('correct', Number(item.dataset.num) === index + 1); item.classList.toggle('wrong', Number(item.dataset.num) !== index + 1); });
        result = { count: ordered.length, correct: correctOrder };
      } else if (type === 'tag') {
        var tags = questionOptions(question, '.tag-option.placed');
        var tagsCorrect = tags.length > 0 && tags.every(function(item){ var zone = item.closest('.tag-zone'); var ok = zone && zone.dataset.zone === item.dataset.correctTag; item.classList.toggle('correct', !!ok); item.classList.toggle('wrong', !ok); return ok; });
        result = { count: tags.length, correct: tagsCorrect };
      } else if (type === 'drag') {
        var dragged = questionOptions(question, '.drag-option.placed');
        var draggedCorrect = dragged.length > 0 && dragged.every(function(item){ var zone = item.closest('.drag-zone'); var ok = zone && zone.dataset.zone === item.dataset.correctZone; item.classList.toggle('correct', !!ok); item.classList.toggle('wrong', !ok); return ok; });
        result = { count: dragged.length, correct: draggedCorrect };
      } else {
        result = checkTextInputs(question, type === 'cloze' ? '.cloze-blank' : '.blank-input, input[data-correct]');
      }
      if (result.count) check.textContent = result.correct ? '全部正确！' : '有错误，请重试';
      return true;
    }

    var title = target.closest('.question-title');
    if (title && !target.closest('input, textarea, button, [contenteditable="true"]')) {
      var content = question.querySelector('.question-content-wrapper');
      if (content) {
        var hidden = getComputedStyle(content).display === 'none';
        content.style.display = hidden ? 'block' : 'none';
        title.classList.toggle('question-title-collapsed', !hidden);
      }
      return true;
    }
    return false;
  }

  var questionDrag = null;
  var questionMatchDrag = null;
  function startQuestionMatch(e){
    var connector = e.target && e.target.closest && e.target.closest('.block-language-match .match-connector');
    if (!connector || e.button > 0 || questionMatchDrag) return;
    var item = connector.closest('.match-item'), question = connector.closest('.question-container'), svg = question && question.querySelector('.match-svg');
    if (!item || !question || !svg) return;
    e.preventDefault(); e.stopPropagation();
    var preview = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    preview.setAttribute('fill', 'none'); preview.setAttribute('stroke', 'var(--interactive-accent)'); preview.setAttribute('stroke-width', '3'); preview.setAttribute('stroke-linecap', 'round'); preview.setAttribute('stroke-dasharray', '6 5');
    svg.appendChild(preview);
    questionMatchDrag = { item: item, question: question, svg: svg, preview: preview, start: matchPoint(item, svg), hoverItem: null };
    item.classList.add('selected');
  }
  function moveQuestionMatch(e){
    if (!questionMatchDrag) return;
    var rect = questionMatchDrag.svg.getBoundingClientRect();
    questionMatchDrag.preview.setAttribute('d', matchPathData(questionMatchDrag.start, { x: e.clientX - rect.left, y: e.clientY - rect.top }));
    var hovered = document.elementFromPoint(e.clientX, e.clientY);
    questionMatchDrag.hoverItem = hovered && hovered.closest ? hovered.closest('.match-item') : null;
    e.preventDefault();
  }
  function endQuestionMatch(e){
    if (!questionMatchDrag) return;
    var state = questionMatchDrag; questionMatchDrag = null; state.preview.remove();
    var target = document.elementFromPoint(e.clientX, e.clientY);
    var item = state.hoverItem || (target && target.closest ? target.closest('.match-item') : null);
    if (!completeQuestionMatch(state.question, state.item, item)) state.item.classList.remove('selected');
    e.preventDefault(); e.stopPropagation();
  }
  document.addEventListener('mousedown', startQuestionMatch, true);
  document.addEventListener('mousemove', moveQuestionMatch, true);
  document.addEventListener('mouseup', endQuestionMatch, true);
  document.addEventListener('touchstart', function(e){ if (e.touches.length === 1) { var touch = e.touches[0]; startQuestionMatch({ target: e.target, button: 0, clientX: touch.clientX, clientY: touch.clientY, preventDefault: function(){ e.preventDefault(); }, stopPropagation: function(){ e.stopPropagation(); } }); } }, { capture: true, passive: false });
  document.addEventListener('touchmove', function(e){ if (questionMatchDrag && e.touches.length === 1) { var touch = e.touches[0]; moveQuestionMatch({ clientX: touch.clientX, clientY: touch.clientY, preventDefault: function(){ e.preventDefault(); } }); } }, { capture: true, passive: false });
  document.addEventListener('touchend', function(e){ if (questionMatchDrag) { var touch = e.changedTouches[0]; endQuestionMatch({ clientX: touch.clientX, clientY: touch.clientY, preventDefault: function(){ e.preventDefault(); }, stopPropagation: function(){ e.stopPropagation(); } }); } }, { capture: true, passive: false });
  document.addEventListener('pointercancel', function(){
    if (!questionMatchDrag) return;
    questionMatchDrag.preview.remove(); questionMatchDrag.item.classList.remove('selected'); questionMatchDrag = null;
  }, true);
  document.addEventListener('dragstart', function(e){
    var item = e.target && e.target.closest && e.target.closest('.drag-option, .tag-option, .order-item');
    if (!item) return;
    questionDrag = item;
    item.classList.add('dragging');
    if (e.dataTransfer) { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', item.dataset.optionId || item.dataset.option || item.dataset.num || ''); }
  });
  document.addEventListener('dragend', function(){ if (questionDrag) questionDrag.classList.remove('dragging'); questionDrag = null; });
  document.addEventListener('dragover', function(e){
    if (!questionDrag) return;
    var target = e.target.closest('.drag-zone-items, .tag-zone-items, .drag-zone, .tag-zone, .order-item');
    if (!target) return;
    e.preventDefault(); if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
  });
  document.addEventListener('drop', function(e){
    if (!questionDrag) return;
    var zoneItems = e.target.closest('.drag-zone-items, .tag-zone-items');
    if (!zoneItems) { var zone = e.target.closest('.drag-zone, .tag-zone'); if (zone) zoneItems = zone.querySelector('.drag-zone-items, .tag-zone-items'); }
    var orderItem = e.target.closest('.order-item');
    if (zoneItems) {
      e.preventDefault(); zoneItems.appendChild(questionDrag); questionDrag.classList.add('placed');
    } else if (orderItem && orderItem !== questionDrag && orderItem.parentElement === questionDrag.parentElement) {
      e.preventDefault(); orderItem.parentElement.insertBefore(questionDrag, orderItem);
    }
  });

  // ── 事件委托：一个 click handler 处理所有事 ───────────────
  document.addEventListener('click', function(e){
    if (!e.target || !e.target.closest) return;

    if (hydrateQuestionClick(e)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // 1) tab 切换
    var tabItem = e.target.closest('.ct-tab-item,.ct-tab,.tab-item');
    if (tabItem) {
      var container = findContainer(tabItem);
      if (container) {
        var tabs = toArray(container.querySelectorAll('.ct-tab-item,.ct-tab,.tab-item'));
        var idx = tabs.indexOf(tabItem);
        if (idx >= 0) {
          e.preventDefault();
          e.stopPropagation();
          if (tabs.length === 1) {
            if (isActiveTab(tabItem)) {
              setCollapsed(container);
              saveTabState(container, 'closed');
            } else {
              setActive(container, idx);
              saveTabState(container, idx);
            }
          } else {
            var allActive = tabs.every(isActiveTab);
            if (allActive) {
              setActive(container, idx);
              saveTabState(container, idx);
            } else if (isActiveTab(tabItem)) {
              setCollapsed(container);
              saveTabState(container, 'closed');
            } else {
              setActive(container, idx);
              saveTabState(container, idx);
            }
          }
        }
      }
      return;
    }

    // 2) callout 折叠：点标题或折叠图标都触发
    var calloutTitle = e.target.closest('.callout-title');
    if (calloutTitle) {
      var callout = calloutTitle.closest('.callout');
      if (isFoldable(callout)) {
        e.preventDefault();
        e.stopPropagation();
        toggleCallout(callout);
      }
      return;
    }

    // 3) 复制按钮
    var copyBtn = e.target.closest('.copy-code-button');
    if (copyBtn) {
      e.preventDefault();
      e.stopPropagation();
      copyCode(copyBtn);
      return;
    }
  }, false);

  document.addEventListener('pointerdown', function(e){
    if (wrapLongCodeLines || !enableCodePressToWrap || e.button > 0) return;
    if (!e.target || !e.target.closest) return;
    var code = e.target.closest('.markdown-rendered pre > code');
    if (!code || e.target.closest('button, a')) return;
    releasePressedCode();
    pressedCodeBlock = code.parentElement;
    setCodePressWrapped(pressedCodeBlock, true);
  }, false);
  document.addEventListener('pointerup', releasePressedCode, false);
  document.addEventListener('pointercancel', releasePressedCode, false);
  window.addEventListener('blur', releasePressedCode, false);

  function initAll(){
    getContainers().forEach(function(container){
      toArray(container.querySelectorAll('.ct-tab-item,.ct-tab,.tab-item')).forEach(function(tab){tab.removeAttribute('draggable');});
      restoreIndex(container);
    });
    toArray(document.querySelectorAll('.markdown-rendered pre > code')).forEach(function(code){
      if (!hideCodeScrollbarWhenIdle) {
        code.classList.add('html-server-scrollbar-visible');
        return;
      }
      var hideTimer = 0;
      var showTemporarily = function(){
        code.classList.add('html-server-scrollbar-visible');
        if (hideTimer) clearTimeout(hideTimer);
        hideTimer = setTimeout(function(){
          code.classList.remove('html-server-scrollbar-visible');
          hideTimer = 0;
        }, 1200);
      };
      code.addEventListener('scroll', showTemporarily, { passive: true });
      code.addEventListener('pointerenter', showTemporarily, { passive: true });
      code.addEventListener('pointermove', showTemporarily, { passive: true });
      code.addEventListener('focus', showTemporarily, { passive: true });
    });
  }

  window.__htmlServerContentInteractions = { initAll: initAll };
  ensureStyles();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();