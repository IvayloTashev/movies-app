export interface MovieInteface {
    title: string
    genre: string[],
    director: string,
    rating: string,
    description: string,
    comments: string[],
    image: string,
    id:string,
    trailer: string,
}

export interface Movie {
    _ownerId: string,
    title: string,
    description: string,
    img: string,
    trailer: string,
    rating: string,
    genre:  string[],
    director: string,
    comments: [],
    _createdOn: string,
    _id: string,
}





