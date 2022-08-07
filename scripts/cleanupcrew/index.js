const fs = require('fs');
const folder = require('./folder.json');

function readFiles(dirname, onError) {
	fs.readdir(dirname, function (err, filenames) {
        console.log('Found directory, and all file names...')
		if (err) {
			onError(err);
			return;
		}
		filenames.forEach(function (filename) {
			fs.readFile(dirname + filename, 'utf-8', function (err, content) {
				console.log('Reading content of ' + filename)
                
                if (err) {
					onError(err);
					return;
				}
				onFileContent(filename, content);
			});
		});
	});
}

String.prototype.removeCharAt = function (i) {
    var tmp = this.split(''); // convert to an array
    tmp.splice(i - 1 , 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return tmp.join(''); // reconstruct the string
}

function onFileContent(filename, content) {
    console.log(`Turning ${filename} into an array...`)
    let data = content.toString();
	let array = []
	array = data.split('\n')

    array.forEach((content, index) => {
        content = content.replace('\r', '')
        if(content.startsWith(' ')) {
			content = content.slice(1)
		}
		content = content.charAt(0).toUpperCase() + content.slice(1);

		array[index] = content
    })

	data = array.join('\n')
	
	fs.writeFile(__dirname + '/Cleanup/' + filename, data, function (err) {
		if (err) throw err;
		console.log(__dirname + '/Cleanup/' + filename + ' was created successfully.');
	  })
}

// Start

readFiles(folder.ftr, function(err) {
    console.log(err)
})