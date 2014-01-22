var parser = require('parse-rss'),
    testURL = 'http://leo.am/podcasts/tnt',
    _ = require('underscore');

function fetch(sub, EventEmitter) {
    console.log("Fetching " + sub.title);
    var last, sortByDate, hasAudio,
        url = sub.url;
    //
    parser(url, function(err, rss) {
    if (err) {
        console.log(sub.title + ': error fetching post');
        console.log(err);
        return false;
    } else if (!rss || !rss.length) {
        console.log(sub.title + ': RSS has no length');
    } else {
        EventEmitter.emit("rssFetched", rss, sub, EventEmitter);
        
    }
    });
}

exports.fetch = fetch;



