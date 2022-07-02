import { Component } from 'react';

class ContactForm extends Component {
  state = {
    name: '',
    number: ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({ 
        name: '',
        number: ''
    });
    // e.target.reset()
  };

  handleChange = ({target}) => {
    const { name, value } = target;
    this.setState({ 
      [name]: value,
    });
  };

  render() {
    const { handleChange, handleSubmit } = this
    const { name, number } = this.state;

    return (
          <form onSubmit={handleSubmit} className="contactForm">
            <h3>Name</h3>
            <input
              type="text"
              name="name"
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleChange}
            />
            <h3>Number</h3>
            <input
              type="tel"
              name="number"
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleChange}
            />
            <button type="submit" className='addBtn'>add contact</button>
          </form>
    );
  }
}

export default ContactForm;


