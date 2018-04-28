/* NAME: CAROL JOPLIN
   DATE: APRIL 23, 2018
   ASGN: JS-JQUERY
   FILE: INDEX.JS
*/

$.ajax({}).done().fail().always();

$.ajax({
	url: 'https://jsonplaceholder.typicode.com/users/',
   dataType : "json",
})
	
.done(function( response ) {
	displayUserData(response);
})
	
	
.fail(function( status, errorThrown ) {
	console.log("Error: ", errorThrown);
	console.log("Status: ", status);
})
	
.always(function() {
	console.log("Request is complete!");
})


//displayUserData
//name
//email
//company

let albumsFlag = false;
let todosFlag = false;
function displayUserData(data) {

    for(let user of data) {

        let userContainer = document.createElement('div');
        userContainer.id = user.id;
		userContainer.className = 'user-container';
        
        let userName = document.createElement('h4');
        userName.className = 'user-name';
        userName.innerHTML = user.name;

        let email = document.createElement('p');
        email.className = 'user-email';
		email.innerHTML = user.email;
		
		// company name
		let companyName = document.createElement('p');
        companyName.className = 'user-company-name';
		companyName.innerHTML = user.company.name;
		
		let albumsButton = document.createElement('button');
        albumsButton.id = `albums-button-${user.id}`;
		albumsButton.innerHTML = 'Albums';

		let todosButton = document.createElement('button');
        todosButton.id = `todos-button-${user.id}`;
		todosButton.innerHTML = 'Todos';

        $('.user').append(userContainer);
		$(`#${user.id}`).append(userName);
		$(`#${user.id}`).append(companyName);
		$(`#${user.id}`).append(email);

		$(`#${user.id}`).append(albumsButton);
		$(`#${user.id}`).append(todosButton);
		
		// toggle between albums and todos

        // albums button event listener
        $(`#albums-button-${user.id}`).click((event) => {
			albumsFlag = true;
			todosFlag = false;

			// console.log("albumsFlag: " + albumsFlag);
			// console.log("todosFlag: " + todosFlag);

			albumsButtonClick(event, user.id, albumsFlag, todosFlag);
			$(`#outer-todos-container-${user.id}`).toggle();

			// if(albumsFlag == true)
			// 	//console.log('todos toggle');
			// 	$(`#outer-todos-container-${user.id}`).toggle();
			// else if(todosFlag == true)
			// 	//console.log('albums toggle');
			// 	$(`#outer-albums-container-${user.id}`).toggle();
		});
		
		// todos button event listener
		$(`#todos-button-${user.id}`).click((event) => {
			todosFlag = true;
			albumsFlag = false;

			console.log("albumsFlag: " + albumsFlag);
			console.log("todosFlag: " + todosFlag);
			todosButtonClick(event, user.id, todosFlag, albumsFlag);
			$(`#outer-albums-container-${user.id}`).toggle();
			
			
			// if(albumsFlag == true)
			// 	//console.log('todos toggle');
			// 	$(`#outer-todos-container-${user.id}`).toggle();
			// else if(todosFlag == true)
			// 	//console.log('albums toggle');
			// 	$(`#outer-albums-container-${user.id}`).toggle();
		});
		
    }
}

// if you know todos is clicked, hide albums and visa versa
function albumsButtonClick(event, userId, albumsFlag, todosFlag) {
	// albumsFlag = true;
	// todosFlag = false;

	if(event.target.dataset.loaded) 
		// grab comments' container and toggle it off
		$(`#outer-albums-container-${userId}`).toggle();
	
	// else if(todosFlag === true) {
	// 	$(`#outer-albums-container-${userId}`).hide();
	// }
	else // all this:
		$.ajax({
			url: `https://jsonplaceholder.typicode.com/users/${userId}/albums/`,
			dataType : "json",
		})
	
		.done(function( response ) {
			// adding an attribute to the button when the data has loaded
			$(event.target).attr('data-loaded', 'true');
			displayAlbums(response);
		})
	
		.fail(function( status, errorThrown ) {
			console.log("Error: ", errorThrown);
			console.log("Status: ", status);
		})
	
		.always(function() {
			console.log("Request is complete!");
		})

}

function displayAlbums(albums) {
	let outerAlbumsContainer = document.createElement('div');
	outerAlbumsContainer.classList = 'outerAlbumsContainer';
	outerAlbumsContainer.id = `outer-albums-container-${albums[0].userId}`;
	$(`#${albums[0].userId}`).append(outerAlbumsContainer);
	
	for (let album of albums) {
		
		let albumContainer = document.createElement('div');
		albumContainer.id = 'album-container-' + album.id;
		albumContainer.className = 'album-container';
		
		let albumTitle = document.createElement('h5');
		albumTitle.className = 'album-container';
		albumTitle.innerHTML = album.title;

		$(outerAlbumsContainer).append(albumContainer);
		$(`#album-container-${album.id}`).append(albumTitle);
		$(`${album.userId}`).append(outerAlbumsContainer);
	
	}

}

function todosButtonClick(event, userId, albumsFlag, todosFlag) {
	// todosFlag = true;
	// albumsFlag = false;

	if(event.target.dataset.loaded)
		//grab todos container and toggle it off
		$(`#outer-todos-container-${userId}`).toggle();
	
	// else if(albumsFlag === true)
	// 	$(`#outer-todos-container-${userId}`).hide();
	
	else // all this:
	$.ajax({
		url: `https://jsonplaceholder.typicode.com/users/${userId}/todos/`,
		dataType : "json",
	})
	
	.done(function( response ) {
		$(event.target).attr('data-loaded', 'true');
		displayTodos(response);
	})
	
	.fail(function( status, errorThrown ) {
		console.log("Error: ", errorThrown);
		console.log("Status: ", status);
	})
	
	.always(function() {
		console.log("Request is complete!");
	})
}

function displayTodos(todos) {
	
	let outerTodosContainer = document.createElement('div');
	outerTodosContainer.classList = 'outerTodosContainer';
	outerTodosContainer.id = `outer-todos-container-${todos[0].userId}`;
	$(`#${todos[0].userId}`).append(outerTodosContainer);
	
	for (let todo of todos) {
		
		let todoContainer = document.createElement('div');
		todoContainer.id = 'todo-container-' + todo.id;
		todoContainer.className = 'todo-container';
		
		let todoTitle = document.createElement('h5');
		todoTitle.className = 'todo-container';
		todoTitle.innerHTML = todo.title;

		$(outerTodosContainer).append(todoContainer);
		$(`#todo-container-${todo.id}`).append(todoTitle);
		$(`${todo.userId}`).append(outerTodosContainer);
	
	}
	
}
