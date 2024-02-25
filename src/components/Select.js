const Select = (props) => {
  const { countriesOptions, selected, setSelected } = props;

  const handleItem = (id) => {
    setSelected((oldArray) => {
      if (oldArray.includes(id)) {
        return oldArray.filter((el) => el !== id);
      } else {
        return [...oldArray, id];
      }
    });
  };

  return (
    <>
      <div className="select-label">CHOOSE COUNTRY</div>
      <div className="select-container">
        {countriesOptions.data.map((option, index) => (
          <div
            key={`item-${index}`}
            className={`select-item ${
              selected.includes(index + 1) ? "active" : null
            }`}
            data-testid="selection-button"
            onClick={() => handleItem(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </>
  );
};

export default Select;
