$.fn.truncate = function(options) {
  options = Object.assign({}, {
    classNames: {
      toggled: 'collapsed',
    },
    labels: {
      textOverflow: '&hellip;',
      showLess: ' show less',
      showMore: 'show more',
    },
  }, options);

  const rMultiSpace = /\s+/g;
  let $more = this;
  let maxChars = parseInt($more.data('show-more-at'));
  let text = $more.text();
  var $less;

  function toggle() {
    $less.add($more).toggle();
  }

  function truncate($node, maxChars) {
    // Recursively truncate through nodes and update quota.
    let node = $node.get(0);
    let isTextNode = node.nodeType === 3;
    if (isTextNode) {
      let text = node.data.substring(0, maxChars);
      text = text.replace(rMultiSpace, ' ');
      return text;
    } else {
      let $clone = $node.clone(true).empty();
      $node.contents().each(function() {
        let remainingChars = maxChars - $clone.text().length;
        if (remainingChars === 0) { return; }
        let $child = truncate($(this), remainingChars);
        $clone.append($child);
      });
      return $clone;
    }
  }

  // Exit if no elements selected.
  if (!this.length) { return this; }
  // Exit on unmet requirements.
  if (!$.isNumeric(maxChars)) {
    console.warn('Need `data-show-more-at` attribute.');
    return this;
  }
  // Exit if we don't need to truncate.
  if (text.length <= maxChars) { return this; }
  // Exit if we need to run this in a loop.
  if (this.length > 1) {
    return this.each(function() { $(this).truncate(options); });
  }

  // Setup.
  $less = truncate($more, maxChars).insertBefore($more);
  let $showMore = $(`<span class="show-more">${options.labels.textOverflow} <a href="javascript:"></a></span>`)
    .find('a').text(options.labels.showMore).click(toggle).end()
    .appendTo($less);
  let $showLess = $(`<a href="javascript:">${options.labels.showLess}</a>`).click(toggle)
    .appendTo($more);
  // Initialize.
  $more.hide();

  return this;
};

// Truncate all the things.
$(() => $('[data-show-more-at]').truncate());
