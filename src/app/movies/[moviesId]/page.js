import React from 'react';

export default function MoviesDetails(props) {
    const { title } = props;

    return (
        <div>
            <h2>Title : {title}</h2>
        </div>
    );
}