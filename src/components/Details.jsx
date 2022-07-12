import React from 'react'
import './Details.css'

function Details({show, hideModal, result, song}) {
    

  const timeConverter = (seconds) => {
    var date = new Date(0);
    date.setSeconds(seconds); // specify value for SECONDS here
    var timeString = date.toISOString().substr(14, 5);
    return timeString;
  }


  const showHideClassName = show ? "modal display-block" : "modal display-none";
  if(result){
    return (
      <div className={showHideClassName}>
          <div className='modal-main'>
              <div onClick={() => hideModal()}  className='close' >&times;</div>
              {
                <table>
                  <thead>
                    <tr>
                      <th>Redni broj</th>
                      <th>Naziv pjesme</th>
                      <th>Ime autora</th>
                      <th>Duljina pjesme</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((el) => {
                      if(el.title === song){
                        return(
                          <tr key={el.id}>
                            <td>{el.position}</td>
                            <td>{el.title}</td>
                            <td>{el.artist.name}</td>
                            <td>{timeConverter(el.duration)}</td>
                          </tr>
                        )
                      }
                    })}
                </tbody>
                </table>
                
              }
          </div>
      </div>
    )
  }
  else{
    return null;
  }
 
}

export default Details