import Contact from './Contact/Contact';
import PropTypes from 'prop-types';

export default function ContactList({ contacts, onDelete }) {
  return (
    <ul>
      <Contact key={contacts.id} contacts={contacts} onDelete={onDelete} />
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
