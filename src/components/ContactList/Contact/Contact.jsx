import PropTypes from 'prop-types';

export default function Contact({ contacts, onDelete }) {
  return contacts.map(({ id, name, number }) => (
    <li key={id}>
      <p>
        <span>{name}: </span>
        <span>{number}</span>
      </p>
      <button type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  ));
}

Contact.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
