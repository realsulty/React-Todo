const Tags = ({ handleChange, tags, tagValue }) => {
  return (
    <>
      <h4>Add Tags</h4>

      <div>
        <input
          type="text"
          value={tagValue}
          onChange={handleChange}
          placeholder="Type words separated by commas"
        />

        <div>
          {tags && tags.length >= 1
            ? tags.map((word) => <span className="tag">#{word}</span>)
            : null}
        </div>
      </div>
    </>
  );
};

export default Tags;
