import React, { Component } from 'react';
import { getMessagesWithEmoijtag, addNewMessage } from '../ServiceDesk';
import './Message.css';

class Message extends Component {
  state = {
    Message: '',
    activeUser: '',
    activeMood: ''
  };

  constructor(props) {
    super(props);
    this.addMessage = this.addMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  componentWillReceiveProps(props){
    this.setState({activeUser:props.activeUser});
    this.setState({activeMood: props.activeMood});
  }

  messageCreated = (e) => {
    this.setState({ Message: e.target.value });
  }

  componentDidMount() {
    this.props.updateMessages(this.props.data);
  }

  getMessagesAndUpdate = () => {
    getMessagesWithEmoijtag(this.props.activeMood, function (list) {
      this.props.updateMessages(list)
    }.bind(this));
  } //tämäkin on joku Annin hämärä funktio

  addMessage = (msg) => {
    msg.User_Id = this.state.activeUser.Id;
    msg.Emoijtag = this.state.activeMood;
    addNewMessage(msg, function () {
      this.getMessagesAndUpdate();
    }.bind(this));
  }
  sendMessage = (e) => {
    e.preventDefault();
    this.addMessage(this.state); //tässä on iso onglema
    this.setState({ Message: '' });

  }
  render() {
    return (

            <footer className="pohja">
              <div className="msggroup">
                  <textarea className="tekstibox" rows="1" cols="35" wrap="soft" placeholder="Write your message here!" value={this.state.Message} onChange={this.messageCreated} minLength="5" maxLength="160" />
                  <input className="submitMessage" type="submit" value="💌" onClick={this.sendMessage} />
              </div>
            </footer>
        )

  }
}
export default Message;
