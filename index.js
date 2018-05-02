function jsonp(url, callback) {
    const script = document.createElement('script');
    script.src = `${url}?callback=${callback.name}`;

    window[callback.name] = callback;

    document.body.appendChild(script);
}

function xhr(url, callback) {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', url);
    
    xhr.onreadystatechange = function () {
        console.log('ready state change', xhr.readyState);
    
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    }
    
    xhr.send();
}

jsonp('/data', function onLoad(data) {
    console.log('jsonp', data);
});

xhr('/data', function (responseText) {
    console.log('xhr', JSON.parse(responseText));
})

fetch('/data')
    .then(res => res.json())
    .then((data) => console.log('fetch', data));

(async () => {
    const res = await fetch('/data');
    const data = await res.json();
    console.log('async await fetch', data);
})();