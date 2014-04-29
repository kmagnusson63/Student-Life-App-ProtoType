/**

		Add's upload capabilities to app



**/

function upload_load()
{
	// window.requestFileSystem(type,size,successCallback, errorCallback);
	window.requestFileSystem(window.TEMPORARY, 10*1024*1024, initFS, fileSystemErrorHandler);
}

/*
		Initial function to run once Filesystem created
*/
function initFS(fs)
{
	testing_display('File system created');

	// create a subdirectory in root filesytem
	fs.root.getDirectory('Temporary', {create: true}, function(dirEntry){
		testing_display('Created "' + dirEntry.name + '" directory');
	}, fileSystemErrorHandler);
}

/*
		Save received image file string to temporary file
*/
function saveTempImageFile(file_image_string, file)
{
	testing_display(JSON.stringify(file));
	var_dump(file);
//	var_dump(file_image_string);
}




/*
		Handles filesystem errors and outputs to testing display div
*/
function fileSystemErrorHandler(err)
{
	var msg = 'FS_ERROR: ';
 
	switch (err.code) {
		case FileError.NOT_FOUND_ERR:
			msg += 'File or directory not found';
			break;

		case FileError.NOT_READABLE_ERR:
			msg += 'File or directory not readable';
			break;

		case FileError.PATH_EXISTS_ERR:
			msg += 'File or directory already exists';
			break;

		case FileError.TYPE_MISMATCH_ERR:
			msg += 'Invalid filetype';
			break;

		default:
			msg += 'Unknown Error Code: ';
			msg += err.code;
			break;
	};
	testing_display(msg);
}