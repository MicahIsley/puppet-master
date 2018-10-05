import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var axios = require("axios");
var helpers = require("../src/helpers");

let wishListItems = [];
let userList = ["Betsy", "Micah", "Freya"];

/*function getWishListItems() {
	helpers.getSaved().then(function(wishListData){
		for(var i=0; i<wishListData.data.length; i ++){
			wishListItems.push(wishListData.data[i]);
		}
	});
};

getWishListItems();*/

class MainScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			sectionVisible: false,
			formVisible: false,
			title: "",
			value: "Betsy"
		}
		this.onClick = this.onClick.bind(this);
		this.showNewItemForm = this.showNewItemForm.bind(this);
		this.hideNewItemForm = this.hideNewItemForm.bind(this);
		this.change = this.change.bind(this);
	}
	componentDidMount() {
		helpers.getSaved().then(function(wishListData){
			for(var i=0; i<wishListData.data.length; i ++){
				wishListItems.push(wishListData.data[i]);
			}
		});
	}
	change(event) {
		this.setState({
			value: event.target.value,
			sectionVisible: false
		});
	}
	listUsers () {
		const numberOfItems = userList;
		const listItems = numberOfItems.map((user, index) => { 
			return <UserObject key={index} id={index} user={userList[index]} />
		});
		return (
			<select data-placeholder=" " className="chosen-select" id="userSort" onChange={this.change} value={this.state.value}>{listItems}</select>
		)
	}
	deleteClick(listItem) {
		helpers.deleteSaved(listItem.user, listItem.name, listItem.category, listItem.note).then(function() {
		});
	}
	onClick(e) {
		this.setState ({
			sectionVisible: true,
			title: e.target.title
		});
	}
	showNewItemForm() {
		console.log(this.state);
		this.setState ({
			sectionVisible: false,
			formVisible: true
		});
	}
	hideNewItemForm() {
		this.setState ({
			sectionVisible: true,
			formVisible: false
		});
		wishListItems = [];
		helpers.getSaved().then(function(wishListData){
			for(var i=0; i<wishListData.data.length; i ++){
				wishListItems.push(wishListData.data[i]);
			}
		});
	}
	addNewItem() {
		var itemNameValue = document.getElementById("nameField").value;
		var itemNoteValue = document.getElementById("noteField").value;
		var itemCategoryValue = document.getElementById("categorySort").value;
		var itemUserValue = document.getElementById("userSort").value;
		let newWishListItem = {
			user: itemUserValue,
			name: itemNameValue,
			category: itemCategoryValue,
			note: itemNoteValue
		}
		let duplicate = false;
		for(var i = 0; i<wishListItems.length; i ++){
			if(itemNameValue === wishListItems[i].name && "test" === wishListItems[i].user){
				duplicate = true;
				console.log("Item Already In List");
			}else{}
		}
		if(duplicate === false){
			return axios.post("/wish/addNew", newWishListItem)
			.then(function(response) {
				console.log("axios results", response.data);
			return response.data;
			});
		}else{}
	}
	render() {
		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="row">
						<div id="mainTitle">Wish List Tracker</div>
					</div>
					<div className="row">
						<div className="col-xs-1 col-xs-offset-3">
							{this.listUsers()}
						</div>
						<div className="col-xs-4">
							<div>'s Wish List</div>
						</div>
						<div className="col-xs-2">
							<AddButton onClick={this.showNewItemForm} />
						</div>
					</div>
					<div className="row" id="topButtonRow">
						<div className="col-xs-3">
							<CategoryButton id="videoGames" title="Video Games" onClick={this.onClick}/>
						</div>
						<div className="col-xs-3">
							<CategoryButton id="boardGames" title="Board Games" onClick={this.onClick} />
						</div>
						<div className="col-xs-3">
							<CategoryButton id="movies" title="Movies" onClick={this.onClick} />
						</div>
						<div className="col-xs-3">
							<CategoryButton id="other" title="Other" onClick={this.onClick} />
						</div>
					</div>
					{
						this.state.formVisible
						? <NewItemForm addFunction={this.addNewItem} hideFunction={this.hideNewItemForm} />
						: null 

					}
					{
						this.state.sectionVisible
						? <CategoryDisplay title={this.state.title} deleteClick={this.deleteClick} />
						: null
					}
				</div>
			</div>
		)
	}
}

class CategoryButton extends React.Component {
	render() {
		return (
			<span className="topButton" title={this.props.title} onClick={this.props.onClick}>{this.props.title}</span>
		)
	}
}

class CategoryDisplay extends React.Component {
	listWishItems () {
		let currentUser = document.getElementById("userSort").value;
		const numberOfItems = wishListItems;
		const listItems = numberOfItems.map((wishItem, index) => {
			if (this.props.title === wishItem.category && currentUser === wishItem.user){
				return <WishListItem key={index} id={index} name={wishItem.name} category={wishItem.category} notes={wishItem.note} deleteClick={this.props.deleteClick} />
			}
		}
		);
		return (
			<div>{listItems}</div>
		)
	}

	render() {
		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="row">
						<div id="categoryTitle">{this.props.title}</div>
					</div>
					<div className="row">
						<div className="col-xs-3 col-xs-offset-1">Name</div>
						<div className="col-xs-6 col-xs-offset-1">Notes</div>
					</div>
					<div className="row">
						<div>{this.listWishItems()}</div>
					</div>
				</div>
			</div>
		)
	}
}

class WishListItem extends React.Component {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		var wishData = {
			user: "test",
			name: this.props.name,
			category: this.props.category,
			note: this.props.note
		}
    	this.props.deleteClick(wishData)
    	wishListItems = [];
    	helpers.getSaved().then(function(wishListData){
			for(var i=0; i<wishListData.data.length; i ++){
				wishListItems.push(wishListData.data[i]);
			}
		});

  	}
	render() {
		return (
			<div className="row">
				<div className="col-xs-9 col-xs-offset-1 wishItemObject">
					<div className="row">
						<div className="col-xs-5 itemName">{this.props.name}</div>
						<div className="col-xs-6 itemNote">{this.props.notes}</div>
						<div className="col-xs-1" onClick={this.handleClick}>X</div>
					</div>
				</div>	
			</div>
		)
	}
}

class AddButton extends React.Component {
	render() {
		return (
			<div onClick={this.props.onClick} id="addNewItemButton">Add New Item</div>
		)
	}
}

class NewItemForm extends React.Component {
	render() {
		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="row">
						<input type="text" name="name" className="form-control" id="nameField" placeholder="Name"></input>
					</div>
					<div className="row">
						<input type="text" name="notes" className="form-control" id="noteField" placeholder="Notes"></input>
					</div>
					<div className="row">
						<div className="col-xs-3">
							<select data-placeholder="" className="chosen-select" id="categorySort">
					            <option value="Video Games">Video Games</option>
					            <option value="Board Games">Board Games</option>
					            <option value="Movies">Movies</option>
					            <option value="Other">Other</option>
			      			</select>
			      		</div>
			      		<div className="col-xs-2">
			      			<div onClick={this.props.addFunction}>Add</div>
			      		</div>
			      		<div className="col-xs-2">
			      			<div onClick={this.props.hideFunction}>Done</div>
			      		</div>
		      		</div>
		      	</div>
		    </div>
		)	
	}
}

class UserObject extends React.Component {
	render() {
		return (
			<option value={this.props.user}>{this.props.user}</option>
		)
	}
}

ReactDOM.render(<MainScreen />, document.getElementById('root'));