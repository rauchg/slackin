/*global io,superagent*/

var body = document.body;
var request = superagent;

// elements
var input = body.querySelector('input');
var button = body.querySelector('button');
input.value = queryString().mail || null;

// remove loading state
button.className = '';

// capture submit
body.addEventListener('submit', function(ev){
  ev.preventDefault();
  button.disabled = true;
  button.className = '';
  button.innerHTML = 'Please Wait';
  invite(input.value, function(err){
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


function invite(email, fn){
  request
  .post('/invite')
  .send({ email: email })
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

// parses the query string
function queryString(){
  var qs = window.location.search.split("+").join(" ");
  var query = {};
  var tokens;
  var re = /[?&]?([^=]+)=([^&]*)/g;
  while (tokens = re.exec(qs)) {
    query[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return query;
}