import React from 'react';
import './Home.css';
import Axios from 'axios';

class SignIn extends React.Component {
	constructor() {
		super();
		this.state={
			file: null,
			word: '',
			meaning: '',
			imgloc: '',
		}
	}

	onFileChange=(event)=>{
		console.log('hi');
		this.setState({file: event.target.files[0]});
	}

	onWordChange=(event)=>{
		this.setState({word: event.target.value});
	}

	onMeaningChange=(event)=>{
		this.setState({meaning: event.target.value});
	}

	onSubmit=(event)=>{
		const data = new FormData();
		console.log('helooooo')
		if(this.state.file===null)
		{
			alert('No file chosen');
			return;
		}
		else{
			if(this.state.word==='')
			{
				alert('Please enter a word!');
				return;
			}
			else{
				if(this.state.meaning==='')
				{
					alert('Please enter some meaning!');
					return;
				}
			}	
		}	
		data.append('image',this.state.file);
		Axios.post('https://magtapp-server.herokuapp.com/uploadOriginalImage',data)
			.then(res =>{
				this.setState({imgloc: res.data.imageUrl});
				Axios.post('https://magtapp-server.herokuapp.com/image-meaning',{
					word: this.state.word,
					meaning: this.state.meaning,
					imgloc: this.state.imgloc,
				})
				Axios.post('https://magtapp-server.herokuapp.com/uploadCompressedImage',data)
					.then(resp =>{
						this.setState({imgloc: resp.data.imageUrl});
						Axios.post('https://magtapp-server.herokuapp.com/compressed-image-meaning',{
							word: this.state.word,
							meaning: this.state.meaning,
							imgloc: this.state.imgloc,
				})
					})
				alert('Image has been saved')	
			})
	}

	render(){
		return(
		<div>	
		<article className="br4 ba dark-gray b--black-10 mv4 w-200 w-50-m w-25-1 mw6 center shadow-5">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
			      <legend className="f1 fw6 ph0 mh0">Upload File</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" for="username">Word</label>
			        <input onChange={this.onWordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 " type="text" name="username"  id="username" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" >Meaning</label>
			        <input onChange={this.onMeaningChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 "  />
			      </div>
			    </fieldset>
			    <div className="lh-copy mt3">
					<form action="/profile" method="post" enctype="multipart/form-data">
						<h3>Select a file</h3>
						<input type="file" name="file" onChange={this.onFileChange}/>
					</form>
			    </div>
					<br></br>
					<div className="">
			      <input onClick={this.onSubmit} style={{color: "black"}} className="us b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Submit" />
			    </div>
			  </div>
			</main>
		</article>	
	</div>	
	);
	}
	
}

export default SignIn;