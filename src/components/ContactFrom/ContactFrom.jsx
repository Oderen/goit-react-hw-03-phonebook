import { Component } from 'react';
import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, number } = e.currentTarget.elements;

    const contact = {
      id: nanoid(),
      name: name.value,
      number: number.value,
    };

    if (this.onDuplicateCheck(contact.name)) {
      e.currentTarget.reset();
      // name.focus() || number.focus()
      Notiflix.Notify.failure(`${contact.name} is already in contacts`);
      return;
    }

    this.props.sendDataToApp(this.state, JSON.stringify(contact));
    this.reset();
  };

  onDuplicateCheck = identificator => {
    const { contacts } = this.props;
    const normalizedIdentificator = identificator.toLowerCase();

    return contacts.some(contact =>
      contact.name.toLowerCase().includes(normalizedIdentificator)
    );
  };

  reset() {
    this.setState({ name: '', number: '' });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={this.handleInputChange}
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  sendDataToApp: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};
