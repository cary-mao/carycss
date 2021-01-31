function escapeHtml(text){
  return text.replace(/[<>"&]/g, function(match, pos, originalText){
    switch(match){
    case "<": return "&lt;";
    case ">":return "&gt;";
    case "&":return "&amp;";
    case "\"":return "&quot;";
  }
  });
}
exports.parse = (code) => {
  const PART_RE = /---(\w+)([\w\W]*?)---/g
  const parts = []
  let part = PART_RE.exec(code)
  while (part) {
    parts.push([part[1], part[2]])
    part = PART_RE.exec(code)
  }
  let content = ''
  let header = ''
  let displayHTML = ''
  parts.forEach((p, i) => {
    if (i === 0) {
      content += `<div class="tab_content tab_content-active"><pre><code class="${p[0]}">${escapeHtml(p[1])}</code></pre></div>`
      header += `<a class="tab_btn tab_btn-active" data-toggle>${p[0]}</a>`
    } else {
      content += `<div class="tab_content">${p[1]}</div>`
      header += `<a class="tab_btn" data-toggle>${p[0]}</a>`
    }
    if (p[0] === 'html') {
      displayHTML += p[1]
    }
  })

  return `<div class="html-display">${displayHTML}</div><div class="codetab tab"><div class="tab_header">${header}</div>${content}</div>`
}
