import PropTypes from 'prop-types';

const Filter = ({ filterValue, changeFilter }) => {
  return (
    <>
      <label>
        Find contacts by name
        <input
          type="text"
          name="filter"
          value={filterValue}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={changeFilter}
          required
        />
      </label>
    </>
  );
};

export default Filter;

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};
