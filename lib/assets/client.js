/*global io,superagent*/

var body = document.body;
var request = superagent;

// elements
var select = body.querySelector('select');
var input = body.querySelector('input[type=email]');
var button = body.querySelector('button');
var cocAgreement = body.querySelector('#coc-agreement');

// remove loading state
button.className = '';

// capture submit
body.addEventListener('submit', function(ev){
  ev.preventDefault();
  if (cocAgreement && !cocAgreement.checked) {
    // require code of conduct agreement
    return;
  }
  button.disabled = true;
  button.className = '';
  button.innerHTML = 'Please Wait';
  var channel = select ? select.value : null;
  invite(channel, input.value, function(err){
    if (err) {
      button.removeAttribute('disabled');
      button.className = 'error';
      button.innerHTML = err.message;
    } else {
      button.className = 'success';
      button.innerHTML = 'WOOT. Check your email!';
    }
  });
});

if (cocAgreement) {
  cocAgreement.addEventListener('change', function(ev){
    button.disabled = cocAgreement.checked ? false : true;
  });
}

window.addEventListener('message', function onmsg(e){
  if (/^slackin:/.test(e.data)) {
    var id = e.data.replace(/^slackin:/, '');
    var h = body.scrollHeight;
    window.parent.postMessage('slackin-dialog-height:' + id + ':' + h, '*');
  }
});

function invite(channel, email, fn){
  request
  .post('/invite')
  .send({
    channel: channel,
    email: email
  })
  .end(function(res){
    if (res.error) {
      var err = new Error(res.body.msg || 'Server error');
      return fn(err);
    } else {
      fn(null);
    }
  });
}

// realtime updates
var socket = io();
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
