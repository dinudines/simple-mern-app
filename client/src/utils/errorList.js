import React from 'react';

const ErrorList = ({ errors }) => {
    return errors.map((error, index) => {
        return <li key={index}> {error} </li>
    });
}

export default ErrorList;