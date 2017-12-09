import React, { Component } from "react";
import "../Form/DataForm.css";
import DeleteBtn from "../../components/DeleteBtn";		
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";		
import API from "../../utils/calAPI.js";
import PubSub from 'pubsub-js';


class CalForm extends Component {
  state = {
    events: [],
    event_title: '',
    start_time: '',
    end_time: '', 
    note: ''
  };

  handleInputChange = event => {
    const {name, value } = event.target;
    this.setState({
      [name] : value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.event_title && this.state.start_time) {
      API.saveEvent({
        event_title: this.state.event_title,
        start_time: this.state.start_time,
        end_time: this.state.end_time, 
        note: this.state.note,
        repRepId: localStorage.getItem('rep_id')
      })
      .then(res => {
          console.log("res from post..CalForm", res)
          PubSub.publish('UPDATE_LIST', 'update Now!');
        })
      .catch(err => console.log(err));
    }
    
  };
  
  render () {
    return (
      <Row>
        <Col size="md-12 sm-12">
          <form className="form-form-horizontal DataForm">
            <h2>Enter event information below:</h2>
            <Col size="md-6 sm-6">
              <Input
                value={this.state.event_title}
                onChange={this.handleInputChange}
                name="event title"
                placeholder="Event Title *"
                required
              />
            </Col>
            <Col size="md-6 sm-6">
              <Input
                value={this.state.start_time}
                onChange={this.handleInputChange}
                name="start time"
                placeholder="Start Time*"
                required
              />
            </Col>
            <Col size="md-6 sm-6">
              <Input
                value={this.state.end_time}
                onChange={this.handleInputChange}
                name="end time"
                placeholder="End Time *"
              />
            </Col>
            <Col size="md-6 sm-6">
              <Input
                value={this.state.note}
                onChange={this.handleInputChange}
                name="note"
                placeholder="Note *"
              />
            </Col>
            <FormBtn
              disabled={!(this.state.event_title && this.state.start_time)}
              onClick={this.handleFormSubmit}
            >
              Add to Database
            </FormBtn>
          </form>
        </Col>
      </Row>
  );
}
}

export default CalForm;
