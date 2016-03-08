/*global io,superagent*/

var body = document.body;
var request = superagent;

// elements
var form = body.querySelector('form#invite');
var channel = form.elements['channel'];
var email = form.elements['email'];
var coc = form.elements['coc'];
var button = body.querySelector('button');

// remove loading state
button.className = '';

// capture submit
body.addEventListener('submit', function(ev){
  ev.preventDefault();
  button.disabled = true;
  button.className = '';
  button.innerHTML = 'Please Wait';
  invite(channel.value, coc && coc.checked ? 1 : 0, email.value, function(err, msg){
    if (err) {
      button.removeAttribute('disabled');
      button.className = 'error';
      button.innerHTML = err.message;
    } else {
      button.className = 'success';
      button.innerHTML = msg;
    }
  });
});


function invite(channel, coc, email, fn){
  request
  .post(data.path + 'invite')
  .send({
    coc: coc,
    channel: channel,
    email: email
  })
  .end(function(res){
    if (res.body.redirectUrl) {
      var err = new Error(res.body.msg || 'Server error');
      window.setTimeout(function() {
        topLevelRedirect(res.body.redirectUrl);
      }, 1500);
    }
    if (res.error) {
      var err = new Error(res.body.msg || 'Server error');
      return fn(err);
    } else {
      fn(null, res.body.msg);
    }
  });
}

// use dom element for better cross browser compatibility
var url = document.createElement('a');
url.href = window.location;
// realtime updates
var socket = io({ path: data.path + 'socket.io' });
socket.on('data', function(users){
  for (var i in users) update(i, users[i]);
});
socket.on('total', function(n){ update('total', n) });
socket.on('active', function(n){ update('active', n) });

function update(val, n, noanim){
  var el = document.querySelector('.' + val);
  if (n != el.innerHTML) {
    el.innerHTML = n;
    anim(el, val);
  }
}

function anim(el, c){
  if (el.anim) return;
  el.className = c + ' grow';
  el.anim = setTimeout(function(){
    el.className = c;
    el.anim = null;
  }, 150);
}


// redirect, using "RPC" to parent if necessary
function topLevelRedirect(url) {
  if (window === top) location.href = url;
  else parent.postMessage('slackin-redirect:' + id + ':' + url, '*');
  // Q: Why can't we just `top.location.href = url;`?
  // A: Ah, the halcyon days, when scripts in iframes could just arbitrarily
  //    fuck with parent windows' globals. I'm afraid that in this day and
  //    age of [sandboxes][] and [Content Security Policies][CSP], it's all
  //    too common for meddling idiots to try to stop us from doing whatever
  //    we please with their globals---how dare they trample on our rights.
  //    I mean we're still allowed to do almost anything to their globals,
  //    the only global we're not allowed to change now is the location URL
  //    (seriously). I momentarily hoped that explicit permission from the
  //    parent of the iframe could ensure this privilege that we deserve of
  //    redirecting the parent, but [nope][].
  //
  // [sandboxing]: http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
  // [CSP]: http://www.html5rocks.com/en/tutorials/security/content-security-policy/
  // [nope]: http://output.jsbin.com/popawuk/16
};

// "RPC" channel to parent
var id;
window.addEventListener('message', function onmsg(e){
  if (/^slackin:/.test(e.data)) {
    id = e.data.replace(/^slackin:/, '');
    window.removeEventListener('message', onmsg);
  }
});
