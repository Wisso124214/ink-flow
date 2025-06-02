import React from 'react';
import './PopUpNote.css';

export default function PopUpNote({ showPopUp, setShowPopUp, selectedNote, hyphenText }) {
  
  const maxCharacters = 1000;
  const charsToHypenTitle = 13;
  const charsToHypenText = 29;

  const [characterCount, setCharacterCount] = React.useState(0);
  const [isEditing, setIsEditing] = React.useState(false);
  const [focus, setFocus] = React.useState('content-text-textarea');
  const scrollYContent = React.useRef(0);

  const handleCloseNote = () => {
    setShowPopUp(false);
    setIsEditing(false);
  }

  const handleClickPopUp = (e) => {
    e.stopPropagation();
    
    const editButtons = document.getElementById('edit-text-buttons');

    if (editButtons) {
      if (e.target.classList.contains('content-title') && isEditing) {
        for (let children of editButtons.children) {
          children.classList.add('disabled');
        }
      } else {
        for (let children of editButtons.children) {
          children.classList.remove('disabled');
        }
      }
    }
  };

  const handleClickEditButton = (e) => {
    e.stopPropagation();
    
  }

  React.useEffect(() => {
    if (isEditing) {
      document.getElementById(focus).focus();
    }

    const textAreaContent = document.getElementById('content-text-textarea');
    const divContent = document.getElementById('content-text-div');
    if (textAreaContent)
      textAreaContent.scrollTop = scrollYContent.current;

    if (divContent)
    divContent.scrollTop = scrollYContent.current;
  }, [isEditing, focus]);

  React.useEffect(() => {
    setCharacterCount(selectedNote ? selectedNote.content.length : 0);
  }, [selectedNote]);

  return (
    showPopUp && selectedNote && (
      <div className="pop-up-overlay" onClick={handleCloseNote}>
        <div className="pop-up-content" onClick={handleClickPopUp}>
          
          { isEditing ? 
            <>
              <textarea 
              id='content-title-textarea'
              className='content-title'
              placeholder='Title of your note...'
              defaultValue={selectedNote.title}
              maxLength={100}
              onChange={(e)=>{
                selectedNote.title = e.target.value;
              }} 
              />
            <textarea
              id='content-text-textarea'
              className='content-text' 
              placeholder='Write your note here...'
              defaultValue={selectedNote.content}
              onChange={(e)=>{
                setCharacterCount(e.target.value.length);
                selectedNote.content = e.target.value;
              }} 
              onScroll={(e) => {
                if (e.target.scrollTop !== scrollYContent.current) {
                  scrollYContent.current = e.target.scrollTop;
                }
              }}
              maxLength={maxCharacters}
              />

              <div id='edit-text-buttons' className='edit-text-buttons'>
                <svg onClick={handleClickEditButton} className='bold' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.10505 12C4.70805 12 4.4236 11.912 4.25171 11.736C4.0839 11.5559 4 11.2715 4 10.8827V4.11733C4 3.72033 4.08595 3.43588 4.25784 3.26398C4.43383 3.08799 4.71623 3 5.10505 3C6.42741 3 8.25591 3 9.02852 3C10.1373 3 11.0539 3.98153 11.0539 5.1846C11.0539 6.08501 10.6037 6.81855 9.70327 7.23602C10.8657 7.44851 11.5176 8.62787 11.5176 9.48128C11.5176 10.5125 10.9902 12 9.27734 12C8.77742 12 6.42626 12 5.10505 12ZM8.37891 8.00341H5.8V10.631H8.37891C8.9 10.631 9.6296 10.1211 9.6296 9.29877C9.6296 8.47643 8.9 8.00341 8.37891 8.00341ZM5.8 4.36903V6.69577H8.17969C8.53906 6.69577 9.27734 6.35939 9.27734 5.50002C9.27734 4.64064 8.48047 4.36903 8.17969 4.36903H5.8Z" fill="currentColor"></path></svg>
                <svg onClick={handleClickEditButton} className='italic' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.67494 3.50017C5.67494 3.25164 5.87641 3.05017 6.12494 3.05017H10.6249C10.8735 3.05017 11.0749 3.25164 11.0749 3.50017C11.0749 3.7487 10.8735 3.95017 10.6249 3.95017H9.00587L7.2309 11.05H8.87493C9.12345 11.05 9.32493 11.2515 9.32493 11.5C9.32493 11.7486 9.12345 11.95 8.87493 11.95H4.37493C4.1264 11.95 3.92493 11.7486 3.92493 11.5C3.92493 11.2515 4.1264 11.05 4.37493 11.05H5.99397L7.76894 3.95017H6.12494C5.87641 3.95017 5.67494 3.7487 5.67494 3.50017Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                <svg onClick={handleClickEditButton} className='underscore' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.00001 2.75C5.00001 2.47386 4.77615 2.25 4.50001 2.25C4.22387 2.25 4.00001 2.47386 4.00001 2.75V8.05C4.00001 9.983 5.56702 11.55 7.50001 11.55C9.43301 11.55 11 9.983 11 8.05V2.75C11 2.47386 10.7762 2.25 10.5 2.25C10.2239 2.25 10 2.47386 10 2.75V8.05C10 9.43071 8.88072 10.55 7.50001 10.55C6.1193 10.55 5.00001 9.43071 5.00001 8.05V2.75ZM3.49998 13.1001C3.27906 13.1001 3.09998 13.2791 3.09998 13.5001C3.09998 13.721 3.27906 13.9001 3.49998 13.9001H11.5C11.7209 13.9001 11.9 13.721 11.9 13.5001C11.9 13.2791 11.7209 13.1001 11.5 13.1001H3.49998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                <svg onClick={handleClickEditButton} className='strikethrough' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.00003 3.25C5.00003 2.97386 4.77617 2.75 4.50003 2.75C4.22389 2.75 4.00003 2.97386 4.00003 3.25V7.10003H2.49998C2.27906 7.10003 2.09998 7.27912 2.09998 7.50003C2.09998 7.72094 2.27906 7.90003 2.49998 7.90003H4.00003V8.55C4.00003 10.483 5.56703 12.05 7.50003 12.05C9.43303 12.05 11 10.483 11 8.55V7.90003H12.5C12.7209 7.90003 12.9 7.72094 12.9 7.50003C12.9 7.27912 12.7209 7.10003 12.5 7.10003H11V3.25C11 2.97386 10.7762 2.75 10.5 2.75C10.2239 2.75 10 2.97386 10 3.25V7.10003H5.00003V3.25ZM5.00003 7.90003V8.55C5.00003 9.93071 6.11932 11.05 7.50003 11.05C8.88074 11.05 10 9.93071 10 8.55V7.90003H5.00003Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                <svg onClick={handleClickEditButton} className='overline' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.49985 1.10001C3.27894 1.10001 3.09985 1.27909 3.09985 1.50001C3.09985 1.72092 3.27894 1.90001 3.49985 1.90001H11.4999C11.7208 1.90001 11.8999 1.72092 11.8999 1.50001C11.8999 1.27909 11.7208 1.10001 11.4999 1.10001H3.49985ZM4.99995 4.25001C4.99995 3.97387 4.77609 3.75001 4.49995 3.75001C4.22381 3.75001 3.99995 3.97387 3.99995 4.25001V9.55001C3.99995 11.483 5.56695 13.05 7.49995 13.05C9.43295 13.05 11 11.483 11 9.55001V4.25001C11 3.97387 10.7761 3.75001 10.5 3.75001C10.2238 3.75001 9.99995 3.97387 9.99995 4.25001V9.55001C9.99995 10.9307 8.88066 12.05 7.49995 12.05C6.11924 12.05 4.99995 10.9307 4.99995 9.55001V4.25001Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                <svg onClick={handleClickEditButton} className='tabulation' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.95 1.50005C12.95 1.25152 12.7485 1.05005 12.5 1.05005C12.2514 1.05005 12.05 1.25152 12.05 1.50005L12.05 13.5C12.05 13.7486 12.2514 13.95 12.5 13.95C12.7485 13.95 12.95 13.7486 12.95 13.5L12.95 1.50005ZM6.5683 3.93188C6.39257 3.75614 6.10764 3.75614 5.93191 3.93188C5.75617 4.10761 5.75617 4.39254 5.93191 4.56827L8.41371 7.05007L0.499984 7.05007C0.251456 7.05007 0.0499847 7.25155 0.0499847 7.50007C0.0499846 7.7486 0.251457 7.95007 0.499984 7.95007L8.41371 7.95007L5.93191 10.4319C5.75617 10.6076 5.75617 10.8925 5.93191 11.0683C6.10764 11.244 6.39257 11.244 6.56831 11.0683L9.8183 7.81827C9.99404 7.64254 9.99404 7.35761 9.8183 7.18188L6.5683 3.93188Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                {/* <svg onClick={handleClickEditButton} className='linebreak' fill="currentColor" width="15" height="15" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" > <path d="M20.586 14.414L24.172 18H6V8H4v10a2.002 2.002 0 002 2h18.172l-3.586 3.586L22 25l6-6-6-6z" /> <path data-name="&lt;Transparent Rectangle&gt;" fill="none" d="M0 0H32V32H0z" /></svg> */}
              </div>
            </>
           : <>
            <div 
              id='content-title-div'
              className='content-title'
              onDoubleClick={() => {
                setIsEditing(true);
                setFocus('content-title-textarea');
              }}
              dangerouslySetInnerHTML={{ __html: hyphenText(selectedNote.title, charsToHypenTitle) }} />
            <div 
              id='content-text-div'
              className='content-text'
              onScroll={(e) => {
                if (e.target.scrollTop !== scrollYContent.current) {
                  scrollYContent.current = e.target.scrollTop;
                }
              }}
              onDoubleClick={() => {
                setIsEditing(true);
                setFocus('content-text-textarea');
              }} 
              // dangerouslySetInnerHTML={{ __html: hyphenText(selectedNote.content.replace(/\n/g, '<br/>'), charsToHypenText).replace(' ', '&nbsp; ') }} />
              dangerouslySetInnerHTML={{ __html: hyphenText(selectedNote.content.replace(/\n/g, '<br/>'), charsToHypenText) }} />
           </>}

          <div className='character-count'>{characterCount} / {maxCharacters}</div>
          <div className='note-details'>
            <span>{selectedNote.date}</span>
            <span>{selectedNote.content.length} characters</span>
          </div>

          <svg 
            className='close-button'
            onClick={handleCloseNote} 
            width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>

          <div 
            className='enable-edit-button'
            onClick={() => setIsEditing(!isEditing)} >
            {
              isEditing ? 
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              : <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            }
          </div>
        </div>
      </div>
    )
  );
}