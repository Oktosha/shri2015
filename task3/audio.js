/*global ID3, FileAPIReader */

/**
 * Loading the tags using
 * https://github.com/aadsm/JavaScript-ID3-Reader
 * Next 2 functions are practically completely copypasted from the sample.
 */

function showTags(url) {
    'use strict';
    var tags = ID3.getAllTags(url),
        image = tags.picture,
        base64String = "",
        i,
        base64;
    document.getElementById('load-title').textContent = tags.title || "";
    document.getElementById('load-artist').textContent = tags.artist || "";
    document.getElementById('load-album').textContent = tags.album || "";
    if (image) {
        for (i = 0; i < image.data.length; i += 1) {
            base64String += String.fromCharCode(image.data[i]);
        }
        base64 = "data:" + image.format + ";base64," + window.btoa(base64String);
        document.getElementById('load-cover').setAttribute('src', base64);
    } else {
        document.getElementById('load-cover').style.display = "none";
    }
}

function loadFile(file) {
    'use strict';
    var url = file.urn || file.name;

    ID3.loadTags(url, function () {
        showTags(url);
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
    loadFile(evt.dataTransfer.files[0]);
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
  
  