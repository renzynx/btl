export interface Product {
  id: string;
  productName: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface AuthResponse {
  email: string;
  token: string;
  role: number;
  id: string;
}
