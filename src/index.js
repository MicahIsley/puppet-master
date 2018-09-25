import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const wishListItems = [
	{name:"Octopath Traveler", category:"Video Games", notes: "Nintendo Switch"},
	{name: "Lord of the Rings LCG", category: "Board Games", notes: "Expansions"},
	{name: "Doctor Strange", category: "Movies", notes: "I like it"},
	{name: "T-Shirts", category: "Other", notes: "Solid colors, no logos"}
]

class MainScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			sectionVisible: true,
			title: ""
		}
		this.onClick = this.onClick.bind(this);
	}
	onClick(e) {
		this.setState ({
			title: e.target.title
		});
	}
	render() {
		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="row">
						<div id="mainTitle">Wish List Tracker</div>
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
						this.state.sectionVisible
						? <CategoryDisplay title={this.state.title}/>
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
		const numberOfItems = wishListItems;
		const listItems = numberOfItems.map((wishItem, index) => {
			if (this.props.title === wishItem.category){
				return <WishListItem key={index} id={index} name={wishItem.name} category={wishItem.category} notes={wishItem.notes} />
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
				<div class="col-xs-12">
					<div className="row">
						<div id="categoryTitle">{this.props.title}</div>
					</div>
					<div className="row">
						<div className="col-xs-3 col-xs-offset-1">Name</div>
						<div className="col-xs-6">Notes</div>
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
	render() {
		return (
			<div className="row">
				<div className="col-xs-3 col-xs-offset-1 itemName">{this.props.name}</div>
				<div className="col-xs-6 itemNote">{this.props.notes}</div>
			</div>
		)
	}
}

ReactDOM.render(<MainScreen />, document.getElementById('root'));