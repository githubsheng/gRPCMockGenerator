/**
 * Created by wangsheng on 12/1/17.
 */

//<input type="file" id="dropArea" webkitdirectory>

function traverseFileTree(item, path) {
    path = path || "";
    if (item.isFile) {
        // Get file
        item.file(function(file) {
            console.log("File:", path + file.name);
        });
    } else if (item.isDirectory) {
        // Get folder contents
        var dirReader = item.createReader();
        dirReader.readEntries(function(entries) {
            for (var i=0; i<entries.length; i++) {
                traverseFileTree(entries[i], path + item.name + "/");
            }
        });
    }
}

let dropArea = document.querySelector('#dropArea');

dropArea.addEventListener("dropover", function(){
    return false;
});

dropArea.addEventListener("drop", function(event) {
    event.preventDefault();

    var items = event.dataTransfer.items;
    for (var i=0; i<items.length; i++) {
        // webkitGetAsEntry is where the magic happens
        var item = items[i].webkitGetAsEntry();
        if (item) {
            traverseFileTree(item);
        }
    }
}, false);