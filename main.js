var subs = require('./subscriptions.json').subscriptions,
    _ = require('underscore'),
    fetchRSS = require('./fetchRSS.js').fetch,
    Events = new require('events'),
    reduce = require('./reduce.js').reduce,
    download = require('download'),
    EventEmitter = new Events.EventEmitter();

function checkModeAndStartDownload(data, sub) {
    switch (sub.mode) {
        case 'all':
            _(data).each(function(post) {
                downloadPost(post, sub.path);
            });
        break;
        case 'latest' || 'last':
            downloadPost(_(data).first(), sub.path);
        break;
    }
}

function onFinish() {
    console.log('Download Finished ' + this.title + ', Ep:' + this.ep);
}

function downloadPost(post, path) {
    var dl;
    console.log('Downloading ' + post.title + ', Ep:' + post.url);
    try {
        dl = download(post.url, path);
        dl.title = post.title;
        dl.ep = post.url;
    }
    catch (e) {
        console.log('Download Failed: ' + post.title);
        console.log(e);
    }

    dl.once('close', onFinish);
}


//App Start
_(subs).each(function(sub) {
    fetchRSS(sub, EventEmitter);
});
EventEmitter.on('rssFetched', reduce);

EventEmitter.on('rssReduced', checkModeAndStartDownload);


