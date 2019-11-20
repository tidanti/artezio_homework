const getBut = document.getElementById('get');
const postBut = document.getElementById('post');
let xhr = new XMLHttpRequest();

const myRequest = (function() {
	let instance;

  	function init() {
  		let url = 'https://reqres.in/api/users/2';
  		let myData = {
  			'name': 'morpheus',
  			'job': 'leader'
  		}

  		return {

  			getReq: function() {
          let result;
  				let response = fetch(url)
  				.then(response => {
  					if (response.ok) return result = response.json();
  					throw new Error("Error fetching data!");
  				})
  				.then(result => { console.log(`Data inside: ${JSON.stringify(result)}`) })
  				.catch(error => { console.error(`Error! ${error}`) });
  			},

  			postReq: function() {
  				if (myData === null) {
  					console.log('Empty data!');
  				} else {
            let result;
  					let response = fetch(url, {
  						method: 'POST',
  						headers: {
  							'Content-Type': 'application/json;charset=utf-8'
  						},
  						body: JSON.stringify(myData)
  					})
  					.then(response => {
  						if (response.ok) return result = response.json();
  						throw new Error("Request error!");
  					})
  					.then(result => { console.log(`Data inside: ${JSON.stringify(result)}`) })
  					.catch(error => { console.error(`Error! ${error}`) });
  				}

  			}
  		}
  	}

  	return {
  		getInstance(){
	  		if (!instance)
	  			instance = init();
	  		return instance;
	  	}
  	}
})();

function myLog(wrapped) {
  return function() {
		console.log('Starting log...');
		const res = wrapped.apply(this, arguments);
		console.log(`${wrapped.name} call`);
		console.log('Finishing log...');
		return res;
  }
}

let req = myRequest.getInstance();
getBut.addEventListener('click', function() {
  const logged = myLog(req.getReq);
  logged();
})
postBut.addEventListener('click', function() {
  const logged = myLog(req.postReq);
  logged();
})