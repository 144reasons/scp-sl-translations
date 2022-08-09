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

function onFileContent(filename, content) {
    console.log(`Turning ${filename} into an array...`)
    let data = content.toString();
	
    data = data.split('')

    console.log(data)

    data.forEach((item, index) => {
        if(/[a-z]/i.test(item)) {data[index] = 'ㅤ'}
    })

    data = data.join('');
	
	fs.writeFile(__dirname + '/Done/' + filename, data, function (err) {
		if (err) throw err;
		console.log(__dirname + '/Done/' + filename + ' was created successfully.');
	})
}

// Start

readFiles(folder.ftr, function(err) {
    console.log(err)
})