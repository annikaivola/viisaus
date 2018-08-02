import React, { Component } from 'react';
import Vote from './Vote';
import { putVote } from '../ServiceDesk'
import './Post.css'

class Post extends Component {

  constructor(props) {
    super(props)

    const {
      Message,
      Vote,
      Id
    } = this.props.data;


    this.state = {
      Message,
      Vote,
      Id
    }

    this.handleVoteDown = this.handleVoteDown.bind(this);
    this.handleVoteUp = this.handleVoteUp.bind(this);
  }

  handleVoteUp() {
    let post = this.props.data;
    post.Vote++
    putVote(post, function(res) {
      console.log(res);
      this.setState({
        Vote: this.state.Vote + 1
      })
      console.log("upvote")
      console.dir(this.state.Vote)

    }.bind(this))
  }
  handleVoteDown() {
    let post = this.props.data;
    post.Vote--
    putVote(post, function(res) {
      console.log(res);
      this.setState({
        Vote: this.state.Vote -1
      })
      console.log("downvote")
      console.dir(this.state.Vote)
    }.bind(this))
  }
  render() {
    return(
      <div className="card text-right">
      <div className="card-body">
      <h5 className="card-title"> {this.props.data.Emoijtag} </h5> 
        <p className="card-text">{this.state.Message}</p>
        <Vote handleVoteUp={this.handleVoteUp} handleVoteDown={this.handleVoteDown}/>
        <p className="card-text" id="tykkaykset" >  {this.state.Vote} </p>
        </div>
      </div>
    );
  }
}

export default Post;
<div class="card text-right" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
