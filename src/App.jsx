import { Component } from 'react';
import { nanoid } from 'nanoid'
import initialContacts from "./initialContacts.json";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";

class App extends Component {
  state = {
    contacts: initialContacts,
    filter: ''
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }



  addContact = ( {name, number} ) => {
    const { contacts } = this.state;

    const isMached = contacts.find(item =>
      item.name.toLowerCase() === name.toLowerCase());
    
    isMached ? alert(`${name} is already in contacts`) : 
    this.setState(({ contacts }) => {
      const newContact = {
        name,
        number,
        id: nanoid(),
      };
      return {
        contacts: [...contacts, newContact],
      };
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    if (!filter) {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const {addContact, changeFilter, deleteContact} = this;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact}/>
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={changeFilter}/>
        <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      </div>
    );
  }
}

export default App;