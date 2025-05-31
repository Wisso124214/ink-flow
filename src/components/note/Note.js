import './Note.css';

export default function Note({ data, type }) {
  return (
    <div className={`note note-${type}`}>
      <div className={`note-title note-title-${type}`}> {data.title} </div>
      {type !== 'titles' ? (<div className={`note-content note-content-${type}`}> {data.content} </div>) : null}

      {type === 'titles' ? (
        <div className="note-details">
          <div className={`note-date-${type}`}> {data.date} </div>
          <div className={`note-chars-${type}`}>{data.content.length} characters</div>
        </div>
      ) : null}
    </div>
  );
}