(function(){

  // give up and resort to `target=_blank`
  // if we're not modern enough
  if (!document.body.getBoundingClientRect
   || !document.body.querySelectorAll
   || !window.postMessage) {
    return;
  }

  // search for a script tag pointing to slackin.js
  function search(){
    var replaced = 0;
    var scripts = document.querySelectorAll('script');
    var script;
    for (var i = 0; i < scripts.length; i++) {
      script = scripts[i];
      if (!script.src) continue;
      if (/\/slackin\.js(\?.*)?$/.test(script.src)) {
        // replace script with iframe
        replace(script);

        // we abort the search for subsequent
        // slackin.js executions to exhaust
        // the queue
        return true;
      }
    }
  }

  // replace the script tag with an iframe
  function replace(script){
    var parent = script.parentNode;
    if (!parent) return;

    var large = /\?large/.test(script.src);
    var iframe = document.createElement('iframe');
    var iframePath = '/iframe' + (large ? '?large' : '');
    iframe.src = script.src.replace(/\/slackin\.js.*/, iframePath);
    iframe.style.borderWidth = 0;
    iframe.className = '__slackin';

    // a decent aproximation that we adjust later
    // once we have the knowledge of the actual
    // numbers of users, based on a user count
    // of 3 digits by 3 digits
    iframe.style.width = (large ? 171 : 114) + 'px';

    // height depends on target size
    iframe.style.height = (large ? 30 : 20) + 'px';

    // hidden by default to avoid flicker
    iframe.style.visibility = 'hidden';

    parent.insertBefore(iframe, script);
    parent.removeChild(script);

    // setup iframe RPC
    iframe.onload = function(){
      setup(iframe);
    };
  }

  // setup an "RPC" channel between iframe and us
  function setup(iframe){
    var id = Math.random() * (1 << 24) | 0;
    iframe.contentWindow.postMessage('slackin:' + id, '*');
    window.addEventListener('message', function(e){
      // show dialog upon click
      if ('slackin-click:' + id  == e.data) {
        showDialog(iframe);
      }

      // update width
      var wp = 'slackin-width:' + id + ':';
      if (wp == e.data.substr(0, wp.length)) {
        var width = e.data.substr(wp.length);
        iframe.style.width = width + 'px';

        // ensure it's shown (since first time hidden)
        iframe.style.visibility = 'visible';
      }
    });
  }

  // show the dialog around the iframe
  // by, yes, creating a new iframe
  var showing = false;
  function showDialog(iframe){
    if (showing) return;
    showing = true;

    // container div
    var div = document.createElement('div');
    div.className = '__slackin';
    div.style.border = '1px solid #D6D6D6';
    div.style.padding = '0';
    div.style.margin = '0';
    div.style.lineHeight = '0';
    div.style.backgroundColor = '#FAFAFA';
    div.style.width = '250px';
    div.style.height = '124px';
    div.style.position = 'absolute';
    div.style.left = '-10000px';
    div.style.top = '-10000px';
    div.style.borderRadius = '4px';
    div.style.padding = '4px';
    div.style.boxSizing = 'content-box';
    div.style.transition = div.style.WebkitTransition = 'height 0.15s ease-out';

    // new iframe
    var ni = document.createElement('iframe');
    ni.className = '__slackin';
    ni.style.width = '250px';
    ni.style.height = '124px';
    ni.style.borderWidth = 0;
    ni.style.visibility = 'hidden';
    ni.style.transition = ni.style.WebkitTransition = 'height 0.15s ease-out';
    ni.src = iframe.src.replace(/\?.*/, '') + '/dialog';
    ni.onload = function(){
      var id = Math.random() * (1 << 24) | 0;
      ni.contentWindow.postMessage('slackin:' + id, '*');
      window.addEventListener('message', function onmsg(e){
        var hp = 'slackin-dialog-height:' + id + ':';
        if (hp == e.data.substr(0, hp.length)) {
          var height = e.data.substr(hp.length);
          ni.style.height = height + 'px';
          div.style.height = height + 'px';
          ni.style.visibility = 'visible';
        }
      });

      window.addEventListener('scroll', dposition);
      window.addEventListener('resize', dposition);
      position();
    };

    // arrows
    var a1 = document.createElement('div');
    var a2 = document.createElement('div');
    [a1, a2].forEach(function(a){
      a.style.border = 'solid transparent';
      a.style.pointerEvents = 'none';
      a.style.width = '0';
      a.style.height = '0';
      a.style.margin = '0';
      a.style.padding = '0';
      a.style.position = 'absolute';
      a.style.display = 'inline';
    });

    a1.style.borderColor = 'rgba(214, 214, 214, 0)';
    a2.style.borderColor = 'rgba(250, 250, 250, 0)';

    a1.style.borderWidth = '7px';
    a1.style.marginLeft = '-7px';
    a2.style.borderWidth = '6px';
    a2.style.marginLeft = '-6px';

    // append
    div.appendChild(a1);
    div.appendChild(a2);
    div.appendChild(ni);
    document.body.appendChild(div);

    function position(){
      [div, a1, a2].forEach(function(el){
        el.style.left = '';
        el.style.right = '';
        el.style.bottom = '';
        el.style.top = '';
      });

      var divPos = div.getBoundingClientRect();
      var iframePos = iframe.getBoundingClientRect();
      var divHeight = divPos.height + 9; // arrow height

      var st = document.body.scrollTop;
      var sl = document.body.scrollLeft;
      var iw = window.innerWidth;
      var ih = window.innerHeight;
      var iframeTop = iframePos.top + st;
      var iframeLeft = iframePos.left + sl;

      // position vertically / arrows
      if (st + iframePos.bottom + divHeight > st + ih) {
        div.style.top = (iframeTop - divHeight) + 'px';
        a1.style.top = a2.style.top = '100%';

        a1.style.borderBottomColor = 'rgba(214, 214, 214, 0)';
        a2.style.borderBottomColor = 'rgba(250, 250, 250, 0)';
        a1.style.borderTopColor = '#d6d6d6';
        a2.style.borderTopColor = '#fafafa';
      } else {
        div.style.top = (iframeTop + iframePos.height + 9) + 'px';
        a1.style.bottom = a2.style.bottom = '100%';

        a1.style.borderTopColor = 'rgba(214, 214, 214, 0)';
        a2.style.borderTopColor = 'rgba(250, 250, 250, 0)';
        a1.style.borderBottomColor = '#d6d6d6';
        a2.style.borderBottomColor = '#fafafa';
      }

      // position horizontally
      var left = iframePos.left
        + Math.round(iframePos.width / 2)
        - Math.round(divPos.width / 2);
      if (left < sl) left = sl;
      if (left + divPos.width > sl + iw) {
        left = sl + iw - divPos.width;
      }
      div.style.left = left + 'px';

      a1.style.left =
      a2.style.left = (iframeLeft - left + Math.round(iframePos.width / 2)) + 'px';
    }

    // debounced positionining
    var timer;
    function dposition(){
      clearTimeout(timer);
      timer = setTimeout(position, 100);
    }

    function hide(){
      showing = false;
      window.removeEventListener('scroll', dposition);
      window.removeEventListener('resize', dposition);
      document.body.removeChild(div);
      document.documentElement.removeEventListener('click', click, true);
    }

    function click(ev){
      if ('__slackin' != ev.target.className) {
        hide();
      }
    }

    document.documentElement.addEventListener('click', click, true);
  }

  var found = search();
  if (!found) setTimeout(search, 5000);

})();
