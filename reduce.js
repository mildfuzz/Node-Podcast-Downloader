var _ = require('underscore');

function reduce(rss, sub, EventEmitter) {
    /*
     * Returns array or objects, each with title of subcription and url of each podcast episode
     */
    var hasAudio,
        title = sub.title;
    //remove RSS without audio
    hasAudio = _(rss).filter(function(post) {
            return post.enclosures.length && _(post.enclosures).find(function(enc) {return enc.type === 'audio/mpeg';});
    });
    if (hasAudio.length) {
        //reduce RSS to array of MP3 URLS
        var collection = _(hasAudio).map(function(post) {
            var enc = {
                title: title,
                url: _(post.enclosures).find(function(enc) { return enc.type === 'audio/mpeg';}).url
            };
            return enc;
        });
        EventEmitter.emit('rssReduced', collection, sub);
        return collection;
    } else {
        console.log(sub.title + ' has no audio');
    }
}

exports.reduce = reduce;