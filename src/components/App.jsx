import { Component } from 'react';

import ContactList from './ContactList/ContactList';
import ContactForm from './ContactFrom/ContactFrom';
import Filter from './Filter/Filter';

import initialContacts from './data/contacts.json';

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  formOnSubmit = (data, newContact) => {
    console.log('Form data >>> ', data);

    this.setState(({ contacts }) => ({
      contacts: [JSON.parse(newContact), ...contacts],
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          sendDataToApp={this.formOnSubmit}
          contacts={this.state.contacts}
        />

        <div>
          <h2>Contacts</h2>
          <Filter
            filterValue={this.state.filter}
            changeFilter={this.changeFilter}
          />
          <ContactList
            contacts={filteredContacts}
            onDelete={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}
