export interface Apartment {
    _id: string;
    number: number;
    name: string;
    description: string;
    price: number;
    location: string;
    project: {
        id: string;
        name: string;
      };
  }
  