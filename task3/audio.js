/*global ID3, FileAPIReader, URL */

/**
 * Loading the tags using
 * https://github.com/aadsm/JavaScript-ID3-Reader
 * Next 2 functions are practically completely copypasted from the sample.
 */

var FILE;

function showTags(url, titleElementId,
                   artistElementId, albumElementId, coverElementId) {
    'use strict';
    var tags = ID3.getAllTags(url),
        image = tags.picture,
        base64String = "",
        i,
        base64;
    document.getElementById(titleElementId).textContent = tags.title || "";
    document.getElementById(artistElementId).textContent = tags.artist || "";
    document.getElementById(albumElementId).textContent = tags.album || "";
    if (image) {
        for (i = 0; i < image.data.length; i += 1) {
            base64String += String.fromCharCode(image.data[i]);
        }
        base64 = "data:" + image.format + ";base64," + window.btoa(base64String);
        document.getElementById(coverElementId).setAttribute('src', base64);
    } else {
        document.getElementById(coverElementId).style.display = "none";
    }
}

function loadFile(file, titleElementId,
                   artistElementId, albumElementId, coverElementId) {
    'use strict';
    var url = file.urn || file.name;
    FILE = file;
    ID3.loadTags(url, function () {
        showTags(url, titleElementId,
                   artistElementId, albumElementId, coverElementId);
    }, {
        tags: ["title", "artist", "album", "picture"],
        dataReader: new FileAPIReader(file)
    });
}

/**
 * Support of dran-n-drop.
 * From http://www.html5rocks.com/en/tutorials/file/dndfiles
 */

function handleFileSelect(evt) {
    'use strict';
    evt.stopPropagation();
    evt.preventDefault();
    loadFile(evt.dataTransfer.files[0], 'load-title', 'load-artist',
            'load-album', 'load-cover');
}

function handleDragOver(evt) {
    'use strict';
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
  
  
/**
* Loading file to audio tag.
* Looked at http://jsfiddle.net/Tv8Cm/
*/

function loadToAudio() {
    'use strict';
    var audio = document.getElementById("audio");
    loadFile(FILE, 'play-title', 'play-artist', 'play-album', 'play-cover');
    audio.src = URL.createObjectURL(FILE);
    audio.play();
    document.getElementById('play-file').textContent = FILE.name;
}