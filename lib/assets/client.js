/*global io,superagent*/

var body = document.body;
var request = superagent;

// elements
var select = body.querySelector('select');
var button = body.querySelector('button');
var email = body.querySelector('[name=email]');
var first_name = body.querySelector('[name=first_name]');
var last_name = body.querySelector('[name=last_name]');

console.log('input.email', email)

// remove loading state
button.className = '';

// capture submit
body.addEventListener('submit', function(ev){
  ev.preventDefault();
  button.disabled = true;
  button.className = '';
  button.innerHTML = 'Please Wait';
  var channel = select ? select.value : null;
  invite(channel, 
    email.value,
    first_name.value,
    last_name.value,
    function(err){
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


function invite(channel, email, first_name, last_name, fn){
  request
  .post('/invite')
  .send({
    channel: channel,
    email: email,
    first_name: first_name,
    last_name: last_name,    
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
  if (el && n != el.innerHTML) {
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
