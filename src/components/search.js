
import React from 'react';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function SearchResult({ searchResults }) {
    return (

        <Container>
            <h1>Search Results</h1>
            <div className="row">
                {searchResults.map((result) => (
                    <div className="col-md-4 mb-3" key={result.id}>
                        <Link href={"/movies/" + result.id}>
                            <Card>
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} />
                                <Card.Body>
                                    <Card.Title>{result.title}</Card.Title>
                                    <Card.Text>Release Date: {result.release_date}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </Container>

    );
}
