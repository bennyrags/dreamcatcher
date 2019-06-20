import React, { useEffect, useState, useRef} from 'react';
import { connect } from 'react-redux';

function registerAlert(props, onChange) {

console.log(`this props error registraiton message`, props.errors)

const node = useRef();
console.log(`this is node:`, node);

const [display, setDisplay] = useState(false);

const handleClick = e => {
    if (node.current.contains(e.target)) {
        console.log(`in the e target!`);
        
        return;
    };
    console.log(`click outside firing`)
    setDisplay(false);
}

useEffect(()=>{
    document.addEventListener('mousedown', handleClick);
    
    return () => {
        document.removeEventListener('mousedown', handleClick);
    }
}, []);

return (
    <div ref={node}>
        {display &&
    <h2
    id="alert"
    className="alert"
    role="alert"
    >
        {props.errors.registrationMessage}
    </h2>
    }
    </div>
    
)
}


const mapStateToProps = state => ({
    errors: state.errors,
  });
  
  export default connect(mapStateToProps)(registerAlert);
  