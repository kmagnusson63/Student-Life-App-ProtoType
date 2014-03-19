function startLog()
{
    var log = document.getElementById('testing');

    ['log','warn','error'].forEach(function (verb) {
        console[verb] = (function (method, verb, log) {
            return function (text) {
                method(text);
                // handle distinguishing between methods any way you'd like
                var msg = document.createElement('code');
                msg.classList.add(verb);
                msg.textContent = verb + ': ' + text;
                document.getElementById('testing').appendChild(msg);
            };
        })(console[verb].bind(console), verb, log);
    });
}